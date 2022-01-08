FROM node:lts-alpine as builer

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
# RUN apk update

RUN yarn config set registry https://repo.huaweicloud.com/repository/npm/
ENV NODE_ENV=product

WORKDIR /equipment-front
COPY ./ /equipment-front

RUN yarn && yarn build
RUN yarn cache clean


FROM nginx:stable-alpine
LABEL maintainer="ablocker ablocker@163.com"

COPY --from=builer /equipment-front/dist /usr/share/nginx/html
