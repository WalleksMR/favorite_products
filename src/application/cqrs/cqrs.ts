import {
  ClientsCreateCommandHandler,
  ClientsDeleteCommandHandler,
  ClientsGetAllQueryHandler,
  ClientsUpdateCommandHandler,
} from './clients/handlers';

const Client = {
  Handlers: [
    ClientsGetAllQueryHandler,
    ClientsCreateCommandHandler,
    ClientsDeleteCommandHandler,
    ClientsUpdateCommandHandler,
  ],
};

const Product = {
  Handlers: [],
};

// Register all handlers in CQRS module here
const Handlers = [...Product.Handlers, ...Client.Handlers];

export { Handlers };
