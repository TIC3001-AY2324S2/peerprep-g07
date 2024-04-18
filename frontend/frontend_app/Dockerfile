FROM node:20-alpine

WORKDIR /frontend_app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]