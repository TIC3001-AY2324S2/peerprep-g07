FROM node:20-alpine

WORKDIR /user-service-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["node", "server.js"]