import { ClientsGetByIdOutputExemple } from './clients-get-by-id.docs';

const clients = [ClientsGetByIdOutputExemple];
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
