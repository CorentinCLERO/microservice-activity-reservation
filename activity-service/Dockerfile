# Stage 1: Build avec Maven
FROM maven:3.9.5-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:21-jdk-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl
COPY --from=build /app/target/*.jar app.jar
EXPOSE 3002
ENTRYPOINT ["java", "-jar", "-Dserver.port=3002", "app.jar"]