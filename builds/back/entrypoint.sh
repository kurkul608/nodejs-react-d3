#!/bin/ash
cd /var/www/back  && yarn install &&  yarn start
exec "$@"