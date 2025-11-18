FROM node:22-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8088

EXPOSE 8088

CMD [ "http-server", "dist" ]