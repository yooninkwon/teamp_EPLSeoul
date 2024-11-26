package com.tech.EPL.config;

import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import reactor.netty.resources.ConnectionProvider;
import reactor.netty.resources.LoopResources;

@Configuration
public class ConnectionConfig {
	
	@Bean
	LoopResources loopResources() {
		return LoopResources.create("webClient-loop", 2, true);
	}
	
	@Bean
	ConnectionProvider connectionProvider() {
	    return ConnectionProvider.builder("webClient-connection")
	            .maxConnections(50)
	            .pendingAcquireTimeout(Duration.ofSeconds(30))
	            .maxIdleTime(Duration.ofSeconds(20))
	            .build();
	}
}
