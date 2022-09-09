FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app/

RUN apk update && apk add bash

RUN npm ci

COPY src src

ARG _POLL_URL=https://google.com
ENV POLL_URL=${_POLL_URL}

ENTRYPOINT ["node", "src/polling-test.js"]