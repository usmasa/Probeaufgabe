FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
