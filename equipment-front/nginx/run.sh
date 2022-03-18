docker run \
    --name equipment-nginx \
    --network equipment-monitor \
    -d \
    -p 80:80 \
    -v ${pwd}/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
    -v ${pwd}/nginx/html:/usr/share/nginx/html:ro \
    nginx:stable-alpine
