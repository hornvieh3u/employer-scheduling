FROM node:16.18.0-alpine

RUN apk add libreoffice

RUN apk update

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .