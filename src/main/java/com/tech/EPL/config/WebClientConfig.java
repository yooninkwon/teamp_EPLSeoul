package com.tech.EPL.config;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.http.codec.xml.Jaxb2XmlDecoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;
import reactor.netty.resources.LoopResources;

@Configuration
public class WebClientConfig implements DisposableBean {
	
    private final LoopResources loopResources;
    private final ConnectionProvider connectionProvider;
	
    public WebClientConfig(LoopResources loopResources, ConnectionProvider connectionProvider) {
		this.loopResources = loopResources;
		this.connectionProvider = connectionProvider;
    }
    
	@Bean
    DefaultUriBuilderFactory builderFactory(){
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);
        return factory;
    }
	
    @Bean
    WebClient webClientForJson(LoopResources loopResources, ConnectionProvider connectionProvider) {
        return WebClient.builder()
                .uriBuilderFactory(builderFactory())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.CACHE_CONTROL, "max-age=3600")  // 1시간 동안 캐싱
                .clientConnector(new ReactorClientHttpConnector(
                		HttpClient.create(connectionProvider).runOn(loopResources)))
                .build();
    }
    
    @Bean
    WebClient webClientForXml(LoopResources loopResources, ConnectionProvider connectionProvider) {
    	ExchangeStrategies strategies = ExchangeStrategies.builder()
				.codecs(clientDefaultCodecsConfigurer -> {
					clientDefaultCodecsConfigurer.defaultCodecs().maxInMemorySize(1024 * 1024);
					clientDefaultCodecsConfigurer.defaultCodecs().jaxb2Decoder(new Jaxb2XmlDecoder());
				})
				.build();
    	
        return WebClient.builder()
                .uriBuilderFactory(builderFactory())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_XML_VALUE)
                .defaultHeader(HttpHeaders.CACHE_CONTROL, "max-age=3600")  // 1시간 동안 캐싱
                .clientConnector(new ReactorClientHttpConnector(
                		HttpClient.create(connectionProvider).runOn(loopResources)))
                .exchangeStrategies(strategies)
                .build();
    }

	@Override
	public void destroy() throws Exception {
        if (loopResources != null) {
            loopResources.disposeLater().block();
        }
        if (connectionProvider != null) {
            connectionProvider.disposeLater().block();
		}

	}
}
