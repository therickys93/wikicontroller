FROM alpine
RUN apk update && apk upgrade
RUN apk add python py-pip
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD python app.py