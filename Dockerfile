FROM node as builder
WORKDIR /usr/src
COPY package.json package-lock.json /usr/src/
RUN npm install


FROM node:alpine
WORKDIR /usr/src
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
COPY --from=builder /usr/src/ .
COPY . .
RUN npm run build:qa:api
CMD npm run start:api
