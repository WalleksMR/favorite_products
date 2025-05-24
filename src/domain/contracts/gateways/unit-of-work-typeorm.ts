import { ObjectType, Repository } from 'typeorm';

export interface IUnitOfWorkTypeORM {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  transaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  query<T = any>(query: string, params: any[], options?: { outOfTransaction?: boolean }): Promise<T>;
  getRepositoryAsync<T>(entity: ObjectType<T>): Promise<Repository<T>>;
  getRepository<T>(entity: ObjectType<T>): Repository<T>;
}
