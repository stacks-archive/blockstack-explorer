FROM node:10.15.0-alpine as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn install
COPY . .
ENV API_URL aaronblankstein
RUN yarn build && \
    yarn --production

FROM node:10.15.0-alpine
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 3000
CMD ["node", "./server"]
