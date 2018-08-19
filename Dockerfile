FROM node
MAINTAINER Drew Parker

ARG VCS_REF
ARG BUILD_DATE

RUN npm install http-server -g
RUN npm install node-git-server
RUN npm install node-cmd

RUN mkdir /public
WORKDIR /public
COPY ./config/index.html .
COPY ./config/key.pem .
COPY ./config/cert.pem .


RUN mkdir /gitserver
WORKDIR /gitserver
RUN mkdir ./tmp
COPY ./config/server.js .

COPY ./config/services.sh /
COPY ./config/runner.py /

WORKDIR /public

EXPOSE 443
EXPOSE 4443

CMD ["sh", "/services.sh"]
