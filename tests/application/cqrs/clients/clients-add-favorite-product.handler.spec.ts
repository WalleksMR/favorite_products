import { ClientsAddFavoriteProductCommand } from '@/application/cqrs/clients/commands';
import { ClientsAddFavoriteProductCommandHandler } from '@/application/cqrs/clients/handlers';

describe(ClientsAddFavoriteProductCommandHandler.name, () => {
  let handler: ClientsAddFavoriteProductCommandHandler;
  let uow: any;
  let fakeStoreAPI: any;
  let clientRepo: any;
  let productRepo: any;

  const mockClient = { id: 'client-uuid', favoriteProducts: [] };
  const mockProduct = { id: 'product-uuid', id_external: 'external-1' };
  const mockProduct2 = { id: 'product-uuid-2', id_external: 'external-2' };

  beforeEach(() => {
    clientRepo = {
      createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockClient),
      }),
    };

    productRepo = {
      createQueryBuilder: jest.fn().mockReturnValue({
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      }),
      find: jest.fn().mockResolvedValue([mockProduct]),
      save: jest.fn().mockResolvedValue([mockProduct2]),
    };

    uow = {
      getRepository: jest.fn((entity) => {
        if (entity.name === 'PgClient') return clientRepo;
        if (entity.name === 'PgProduct') return productRepo;
        return null;
      }),
      query: jest.fn().mockResolvedValue(undefined),
    };

    fakeStoreAPI = {
      getProductById: jest.fn().mockResolvedValue({
        id: 'external-1',
        image: 'img',
        title: 'title',
        price: 10,
      }),
    };

    handler = new ClientsAddFavoriteProductCommandHandler(uow, fakeStoreAPI);
    jest.mock('@/main/config/environment', () => ({
      env: {
        app: { maxFavoriteProducts: 10 },
        database: { schema: 'public' },
      },
    }));

    jest.mock('@/infrastructure/database/utils', () => ({
      TableName: {
        FavoriteProducts: 'favorite_products',
      },
    }));
  });

  it('should be able add product in favorite sending ids_external', async () => {
    const ids_external = ['external-1'];
    const command = new ClientsAddFavoriteProductCommand('019704cc-11ec-766e-b002-78a6ea0cbedf', [], ids_external);

    productRepo.find.mockResolvedValueOnce([]);
    fakeStoreAPI.getProductById.mockResolvedValueOnce({
      id: 'external-1',
      image: 'img',
      title: 'title',
      price: 10,
    });
    productRepo.save.mockResolvedValueOnce([{ id: 'product-uuid-2', id_external: 'external-1' }]);

    await handler.execute(command);

    expect(productRepo.save).toHaveBeenCalled();
    expect(productRepo.save).toHaveBeenCalledWith([expect.objectContaining({ id_external: 'external-1' })]);
    expect(uow.query).toHaveBeenCalled();
  });
});
