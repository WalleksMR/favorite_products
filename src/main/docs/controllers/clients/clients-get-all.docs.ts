import { ClientsGetByIdOutputExemple } from './clients-get-by-id.docs';

const clients = [
  {
    id: ClientsGetByIdOutputExemple.id,
    name: ClientsGetByIdOutputExemple.name,
    email: ClientsGetByIdOutputExemple.email,
  },
];

export const ClientsGetOutputListOutputExemple = clients;
export const ClientsGetOutputPaginationOutputExemple = {
  items: clients,
  meta: {
    itemCount: 1,
    totalItems: 1,
    itemsPerPage: 1,
    totalPages: 1,
    currentPage: 1,
  },
};
