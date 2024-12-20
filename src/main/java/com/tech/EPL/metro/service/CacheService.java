package com.tech.EPL.metro.service;

import java.util.List;
import java.util.Map;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.tech.EPL.config.ApiKeyConfig;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@EnableCaching
public class CacheService {
	
	private final ReturnApiDataService returnApiDataService;
	private final ApiKeyConfig apiKeyConfig;
	
	
	//모든 지하철역 정보 불러오기
	//캐시에 모든 데이터 저장
	@Cacheable(value = "stationInfo")
	public List<Map> getAllStationInfo(){
		
		String searchUrl = "http://openapi.seoul.go.kr:8088/" + apiKeyConfig.getSeoulMetroKey()
		+ "/json/subwayStationMaster/1/1000/";
		
		
		System.out.println("캐시가 없으므로 호출함");
	
		
		Map resultData = returnApiDataService.api(searchUrl).block();
		
		Map items = (Map) resultData.get("subwayStationMaster");
		
		List<Map> rows = (List<Map>) items.get("row");
		
		return rows;
	}
	
	
	
	
	
}
