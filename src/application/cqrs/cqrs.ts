import {
  ClientsAddFavoriteProductCommandHandler,
  ClientsCreateCommandHandler,
  ClientsDeleteCommandHandler,
  ClientsGetAllQueryHandler,
  ClientsGetByIdQueryHandler,
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
  ],
};

// Register all handlers in CQRS module here
const Handlers = [...Client.Handlers];

export { Handlers };
