FROM adoptopenjdk/openjdk11:alpine-slim

WORKDIR /service-registry/

COPY ./target/service-discovery-0.0.1-SNAPSHOT.jar /api-gateway/service-discovery-0.0.1-SNAPSHOT.jar

EXPOSE 8761

CMD ["java", "-jar", "service-discovery-0.0.1-SNAPSHOT.jar"]
