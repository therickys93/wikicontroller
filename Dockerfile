FROM alpine
RUN apk update && apk upgrade
RUN apk add git nodejs nodejs-npm
ADD . /controller
WORKDIR /controller
RUN npm install
CMD node index.js