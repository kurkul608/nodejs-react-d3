FROM node:14-alpine

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apk add --update \
              && rm -rf /var/cache/apk/*
RUN apk add --update yarn
ADD entrypoint.sh /var/www/entrypoint.sh

ENTRYPOINT ["/var/www/entrypoint.sh"]