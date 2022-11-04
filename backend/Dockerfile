FROM openjdk:11
ARG JAR_FILE=/build/libs/api-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ARG YML_FILE=/src/main/resources/application.yml
COPY ${YML_FILE} application.yml
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=prod", "-Dspring.config.location=/application.yml,/home/ubuntu/properties/application-db.yml,/home/ubuntu/properties/application-secret.yml,/home/ubuntu/properties/application-aws.yml", "app.jar"]
