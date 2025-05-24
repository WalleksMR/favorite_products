FROM node:20-alpine AS build
WORKDIR /srv/api

COPY package.json .
RUN yarn

FROM alpine
WORKDIR /srv/api

RUN apk update
RUN apk add --no-cache nodejs yarn npm bash

COPY . .
COPY --from=build /srv/api/node_modules /srv/api/node_modules

ARG PORT=5018
ARG NODE_ENV=local

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}

EXPOSE $PORT
RUN yarn build

ENTRYPOINT ["/bin/bash", "-c", "if [ ${NODE_ENV} != 'production' ]; then yarn migration:run:local; fi &&\
  NODE_ENV=${NODE_ENV} \
  node dist/src/main/main.js"]