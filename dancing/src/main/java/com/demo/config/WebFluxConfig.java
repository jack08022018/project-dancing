package com.demo.config;

import com.demo.config.properties.DatasourceProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Slf4j
@Configuration
//@EnableWebFlux
@EnableScheduling
@EnableConfigurationProperties({DatasourceProperties.class})
//public class WebFluxConfig implements WebFluxConfigurer {
public class WebFluxConfig {
//    @Bean("httpClient")
//    public HttpClient getHttpClient() {
//        return HttpClient.create()
//                .tcpConfiguration(client -> client
//                        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 30000)
//                        .doOnConnected(conn -> conn
//                                .addHandlerLast(new ReadTimeoutHandler(30))
//                                .addHandlerLast(new WriteTimeoutHandler(30)))
//                );
//    }
//
//    @Bean("orchesWebfluxClient")
//    public WebClient getWebClient(@Autowired HttpClient httpClient) {
//        var connector = new ReactorClientHttpConnector(httpClient.wiretap(true));
//        return WebClient.builder()
//                .baseUrl("http://localhost:9498/orches")
//                .clientConnector(connector)
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .build();
//    }

    @Bean(name = "customObjectMapper")
    public ObjectMapper getObjectMapper() {
        var mapper = new ObjectMapper()
                .configure(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT, true)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper;
    }
}