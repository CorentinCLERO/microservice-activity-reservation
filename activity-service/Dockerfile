FROM openjdk:21-jdk-slim

WORKDIR /usr/src/app

COPY target/activity-service.jar activity-service.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "activity-service.jar"]
