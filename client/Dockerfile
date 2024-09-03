FROM node:16.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ENV GENERATE_SOURCEMAP=false

RUN yarn build

RUN yarn global add serve
