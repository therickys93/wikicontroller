FROM alpine
RUN apk update && apk upgrade
RUN apk add git nodejs nodejs-npm supervisor
ADD . /controller
WORKDIR /controller
ADD supervisord.conf /etc/
RUN npm install
CMD supervisord --nodaemon --configuration /etc/supervisord.conf
