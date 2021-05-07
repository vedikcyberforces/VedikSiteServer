FROM node:14.15.1

# Create app directory

WORKDIR /usr/vedikserver/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
