FROM adoptopenjdk/openjdk11:alpine-slim

WORKDIR /api-gateway/

COPY ./target/api-gateway-0.0.1-SNAPSHOT.jar /api-gateway/api-gateway-0.0.1-SNAPSHOT.jar

EXPOSE 8765

CMD ["java", "-jar", "api-gateway-application.jar"]
