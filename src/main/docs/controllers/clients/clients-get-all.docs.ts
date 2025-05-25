const clients = [
  {
    id: '019704cc-11eb-766e-b002-608cca1ebce8',
    email: 'johndoe@email.com',
    createdAt: '2025-05-25T00:16:12.267Z',
    updatedAt: '2025-05-25T00:16:12.267Z',
    favoriteProducts: [
      {
        id: '019704cc-11ec-766e-b002-78a6ea0cbedf',
        title: 'Electronic Steel Soap',
        image: 'https://loremflickr.com/640/480',
        price: 108,
        review: 3,
        createdAt: '2025-05-25T00:16:12.268Z',
        updatedAt: '2025-05-25T00:16:12.268Z',
      },
    ],
  },
];
export const ClientsGetOutputListExemple = clients;
export const ClientsGetOutputPaginationExemple = {
  items: clients,
  meta: {
    itemCount: 1,
    totalItems: 1,
    itemsPerPage: 1,
    totalPages: 1,
    currentPage: 1,
  },
};
