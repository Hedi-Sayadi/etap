FROM openjdk:17

ENV JAR_FILE=target/etap-backend.jar

ADD  $JAR_FILE app.jar

ENTRYPOINT ["java","-jar","/app.jar"]