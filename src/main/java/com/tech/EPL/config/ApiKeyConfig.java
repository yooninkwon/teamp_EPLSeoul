package com.tech.EPL.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;

@Configuration
@PropertySource("classpath:com/properties/application-API-KEY.properties")
@Getter
public class ApiKeyConfig {
	
	@Value("${seoul.metro}")
	private String seoulMetroKey;

	@Value("${open.realty}")
	private String openRealtyKey;
	
	@Value("${seoul.mobility}")
	private String seoulMobilityKey;
	
	@Value("${kakao.monility}")
	private String kakaoMobilityKey;
}
