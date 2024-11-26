package com.tech.EPL.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class MetroWebClient {

	@Bean
	public WebClient.Builder builder() {
		
		return WebClient.builder();
	}
}
