package com.tech.EPL.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:com/properties/application-API-KEY.properties")
public class ApiKeyConfig {
	
	@Value("${seoul.metro}")
	private String seoulMetro;

	public String getSeoulMetroKey() {
		return seoulMetro;
	}

	@Value("${open.realty}")
	private String openRealty;
	
	public String getOpenRealtyKey() {
		return openRealty;
	}
		
	@Value("${kakao.bus}")
	private String kakaoBus;
	
	public String getKakaoBusKey() {
		return kakaoBus;
	}

	@Value("${open.bus}")
	private String openBus;
	
	public String getOpenBusKey() {
		return openBus;
	}

}
