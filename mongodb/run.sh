#!/bin/sh

docker run \
    --name equipment-mongodb \
    -d \
    -p 27017:27017 \
    -v ${pwd}/config:/data/configdb \
    -v ${pwd}/data:/data/db \
    mongo:5
