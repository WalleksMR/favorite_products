import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, ObjectType, QueryRunner, Repository } from 'typeorm';

import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { AppDataSource } from '@/main/config/typeorm/typeorm.config';

@Injectable()
export class UnitOfWork implements IUnitOfWorkTypeORM {
  private static instance: UnitOfWork;
  private queryRunner: QueryRunner;
  readonly dataSource: DataSource;

  constructor(
    @InjectDataSource(AppDataSource)
    readonly _dataSource: DataSource,
  ) {
    this.dataSource = _dataSource;
  }

  static getInstance(): UnitOfWork {
    if (!UnitOfWork.instance) {
      UnitOfWork.instance = new UnitOfWork(AppDataSource);
    }
    return UnitOfWork.instance;
  }

  async connect(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
  }

  async disconnect() {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.queryRunner = undefined;
    }
  }

  async transaction() {
    if (!this.queryRunner || this.queryRunner.isReleased) this.queryRunner = this.dataSource.createQueryRunner();
    if (this.queryRunner.isTransactionActive) throw new Error('Transaction is already active');
    await this.queryRunner.startTransaction();
  }

  async commit() {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
    this.queryRunner = undefined;
  }

  async rollback() {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
    this.queryRunner = undefined;
  }

  getRepository<T>(entity: ObjectType<T>): Repository<T> {
    if (!this.dataSource.isInitialized) {
      throw new Error('connection is not initialized');
    }
    // When have a transaction is started
    if (this.queryRunner != undefined) return this.queryRunner.manager.getRepository<T>(entity);
    // When no transaction is started
    return this.dataSource.getRepository<T>(entity);
  }

  async getRepositoryAsync<T>(entity: ObjectType<T>): Promise<Repository<T>> {
    if (!this.dataSource.isInitialized) {
      await this.connect();
    }
    // When have a transaction is started
    if (this.queryRunner != undefined) return this.queryRunner.manager.getRepository<T>(entity);
    // When no transaction is started
    return this.dataSource.getRepository<T>(entity);
  }

  async query<T = any>(query: string, params: any[], options?: { outOfTransaction?: boolean }): Promise<T> {
    const outOfTransaction = options?.outOfTransaction ? options.outOfTransaction : false;
    if (this.queryRunner && !outOfTransaction) return this.queryRunner.query(query, params);
    return this.dataSource.query<T>(query, params);
  }
}
