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
	
	@Value("${open.bus}")
	private String openBus;

	@Value("${kakao.monility}")
	private String kakaoMobilityKey;
	
	@Value("${kakao.bus}")
	private String kakaoBusKey;
	
	@Value("${seoul.mobility}")
	private String seoulMobilityKey;
  
	@Value("${google.bus}")
	private String googleBusKey;

	@Value("${tmap.bus}")
	private String tmapBusKey;
	
	@Value("${naver.client.bus}")
	private String naverClientBus;
	
	@Value("${naver.secret.bus}")
	private String naverSecretBus;




}
