FROM openjdk:11
COPY /build/libs/api-0.0.1-SNAPSHOT.jar app.jar
COPY /src/main/resources/application.yml application.yml
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=prod", "-Dspring.config.location=/application.yml,/home/ubuntu/properties/application-db.yml", "app.jar"]
