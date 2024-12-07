FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN ./dist ./dist

CMD ["yarn", "start:dev"]

