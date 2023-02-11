FROM node:16.13.1

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g expo-cli

COPY . .

EXPOSE 8001

CMD expo start --tunnel