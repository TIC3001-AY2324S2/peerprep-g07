FROM node:20-alpine

WORKDIR /collaboration-service-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "server.js"]