#!/bin/ash
cd /var/www/client  && yarn install &&  yarn start
exec "$@"