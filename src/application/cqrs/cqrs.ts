import { AuthLoginQueryHandler } from './auth/handler';
import {
  ClientsAddFavoriteProductCommandHandler,
  ClientsCreateCommandHandler,
  ClientsDeleteCommandHandler,
  ClientsGetAllQueryHandler,
  ClientsGetByIdQueryHandler,
  ClientsGetFavoriteProductsQueryHandler,
  ClientsRemoveFavoriteProductCommandHandler,
  ClientsUpdateCommandHandler,
} from './clients/handlers';

const Client = {
  Handlers: [
    ClientsGetAllQueryHandler,
    ClientsCreateCommandHandler,
    ClientsDeleteCommandHandler,
    ClientsUpdateCommandHandler,
    ClientsGetByIdQueryHandler,
    ClientsAddFavoriteProductCommandHandler,
    ClientsRemoveFavoriteProductCommandHandler,
    ClientsGetFavoriteProductsQueryHandler,
  ],
};

const Auth = {
  Handlers: [AuthLoginQueryHandler],
};

// Register all handlers in CQRS module here
const Handlers = [...Client.Handlers, ...Auth.Handlers];

export { Handlers };
