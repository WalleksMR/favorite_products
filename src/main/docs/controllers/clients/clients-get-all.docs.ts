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
      {
        id: '019704cc-11ec-766e-b002-85268db7bf00',
        title: 'Handmade Steel Towels',
        image: 'https://loremflickr.com/640/480',
        price: 212,
        review: 2,
        createdAt: '2025-05-25T00:16:12.268Z',
        updatedAt: '2025-05-25T00:16:12.268Z',
      },
      {
        id: '019704cc-11ec-766e-b002-88ff56b7d725',
        title: 'Luxurious Plastic Bike',
        image: 'https://loremflickr.com/640/480',
        price: 18,
        review: 4,
        createdAt: '2025-05-25T00:16:12.268Z',
        updatedAt: '2025-05-25T00:16:12.268Z',
      },
      {
        id: '019704cc-11ec-766e-b002-979b3e6c4f6b',
        title: 'Bespoke Metal Soap',
        image: 'https://loremflickr.com/640/480',
        price: 834,
        review: 3,
        createdAt: '2025-05-25T00:16:12.268Z',
        updatedAt: '2025-05-25T00:16:12.268Z',
      },
      {
        id: '019704cc-11ec-766e-b002-9a5d784dc079',
        title: 'Small Frozen Soap',
        image: 'https://loremflickr.com/640/480',
        price: 278,
        review: 2,
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
