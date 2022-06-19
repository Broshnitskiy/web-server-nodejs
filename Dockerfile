FROM node

WORKDIR /web-server-nodejs

COPY . .

RUN npm install

EXPOSE 7777

CMD [ "cross-env", "NODE_ENV=production","node","./bin/server"]

