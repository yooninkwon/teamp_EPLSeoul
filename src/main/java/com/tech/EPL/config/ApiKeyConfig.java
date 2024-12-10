package com.tech.EPL.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;

@Configuration
@PropertySource("classpath:com/properties/application-API-KEY.properties")
@Getter
public class ApiKeyConfig {
	// bus
	@Value("${open.bus}")
	private String openBus;
	
	@Value("${kakao.bus}")
	private String kakaoBusKey;
	  
	@Value("${google.bus}")
	private String googleBusKey;

	@Value("${tmap.bus}")
	private String tmapBusKey;
	
	@Value("${naver.client.bus}")
	private String naverClientBus;
	
	@Value("${naver.secret.bus}")
	private String naverSecretBus;

	// metro
	@Value("${seoul.metro}")
	private String seoulMetroKey;
	
	@Value("${lostItem.metro}")
	private String lostItemMetroKey;
	
	// mobility
	@Value("${seoul.mobility}")
	private String seoulMobilityKey;

	@Value("${kakao.mobility.js}")
	private String kakaoMobilityJsKey;
	
	@Value("${kakao.mobility.rest}")
	private String kakaoMobilityRestKey;
  
	// date
	@Value("${google.date}")
	private String googleDateKey;
	
	// realty
	@Value("${open.realty}")
	private String openRealtyKey;
}
