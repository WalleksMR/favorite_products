const Client = {
  Commands: [],
  Queries: [],
  Handlers: [],
};

const Product = {
  Commands: [],
  Queries: [],
  Handlers: [],
};

// Register all commands in CQRS module here
const Commands = [...Product.Commands, ...Client.Commands];
// Register all queries in CQRS module here
const Queries = [...Product.Queries, ...Client.Queries];
// Register all handlers in CQRS module here
const Handlers = [...Product.Handlers, ...Client.Handlers];

export { Commands, Handlers, Queries };
