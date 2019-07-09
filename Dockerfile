FROM alpine
RUN apk update && apk upgrade
RUN apk add git nodejs nodejs-npm supervisor
ADD . /controller
WORKDIR /controller
ADD supervisord.conf /etc/
RUN npm install
RUN git pull --tags
CMD supervisord --nodaemon --configuration /etc/supervisord.conf
