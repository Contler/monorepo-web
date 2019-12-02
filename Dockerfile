FROM node:alpine

WORKDIR /usr/src

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

COPY package.json /usr/src/
RUN npm install
COPY . .
#RUN npm run build:qa:api
RUN  ls node_modules/.bin
CMD npm run start:api
