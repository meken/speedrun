FROM node:19.7-alpine3.17
WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . /app

ENV NODE_ENV=production
ENTRYPOINT [ "npm", "run", "start" ]

