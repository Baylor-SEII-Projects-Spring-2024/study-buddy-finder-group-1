# Stage 1: Build stage
FROM gradle:8.5.0-jdk17 AS build
WORKDIR /build
COPY . .

# Run tests
RUN ./gradlew test --no-daemon -p study-buddy-api

# Stage 2: Package stage
FROM openjdk:17
WORKDIR /app
COPY --from=build /build/study-buddy-api/build/libs/study-buddy-api-1.0.0-SNAPSHOT.jar app.jar

# Run the app
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar