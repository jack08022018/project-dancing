package static.scripts

plugins {
	java
	id("org.springframework.boot") version "2.7.7"
	id("io.spring.dependency-management") version "1.0.15.RELEASE"
	id("maven-publish")
}

group = "com"
version = "0.0.1"

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	maven { url = uri("https://repo.spring.io/release") }
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	runtimeOnly("mysql:mysql-connector-java")
//	implementation ("org.springframework.boot:spring-boot-starter-data-r2dbc:2.7.7")
//	implementation("org.mariadb:r2dbc-mariadb:1.1.2")

	implementation("org.apache.commons:commons-lang3:3.12.0")
	implementation("com.google.code.gson:gson:2.10.1")

	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	annotationProcessor("org.projectlombok:lombok")

	implementation("org.springframework.boot:spring-boot-starter-logging:2.7.3")
	implementation("org.springframework.boot:spring-boot-starter-log4j2:2.7.3")
}

configurations {
	all {
		exclude(group = "org.springframework.boot", module = "spring-boot-starter-logging")
	}
}