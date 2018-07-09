FROM node:10.5.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app
RUN yarn build
EXPOSE 3000

CMD ["yarn", "prod"]