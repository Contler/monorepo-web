FROM node:14-alpine

RUN mkdir /home/app
WORKDIR /home/app
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm i --silent

COPY . ./

EXPOSE 4200


