FROM maven:3-openjdk-8 as builder

WORKDIR /equipment-sensor
COPY ./ /equipment-sensor

RUN mkdir ~/.m2
RUN mv settings.xml ~/.m2/

RUN mvn package


FROM openjdk:8-jre-alpine
LABEL maintainer="ablocker ablocker@163.com"

WORKDIR /equipment-sensor

COPY --from=builder /equipment-sensor/target/equipment-sensor-1.0-SNAPSHOT.jar /equipment-sensor
RUN mkdir logs

ENTRYPOINT [ "java", "-jar", "equipment-sensor-1.0-SNAPSHOT.jar" ]
