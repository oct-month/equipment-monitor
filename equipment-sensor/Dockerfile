FROM maven:3-openjdk-8 as builder

WORKDIR /equipment-sensor
COPY ./ /equipment-sensor

RUN mkdir ~/.m2
RUN mv settings.xml ~/.m2/

RUN mvn package


FROM openjdk:8-jre-alpine
LABEL maintainer="ablocker ablocker@163.com"

RUN sed -i 's/dl-cdn.alpinelinux.org/mirror.nju.edu.cn/g' /etc/apk/repositories
RUN apk update
# 时区设置
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
RUN apk del tzdata

WORKDIR /equipment-sensor

COPY --from=builder /equipment-sensor/target/equipment-sensor-1.0-SNAPSHOT.jar /equipment-sensor
RUN mkdir logs

ENTRYPOINT [ "java", "-jar", "equipment-sensor-1.0-SNAPSHOT.jar" ]
