import {
  ClientsAddFavoriteProductCommandHandler,
  ClientsCreateCommandHandler,
  ClientsDeleteCommandHandler,
  ClientsGetAllQueryHandler,
  ClientsGetByIdQueryHandler,
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
  ],
};

// Register all handlers in CQRS module here
const Handlers = [...Client.Handlers];

export { Handlers };
