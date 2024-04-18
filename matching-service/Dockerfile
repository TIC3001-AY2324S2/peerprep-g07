FROM node:20-alpine

WORKDIR /matching-service-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "index.js"]