FROM node:17-alpine3.12
# :lts-alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
#CMD ["npm", "run", "dev"]