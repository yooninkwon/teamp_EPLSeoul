package com.tech.EPL.metro.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class CacheRefreshService {

	private final CacheService cacheService;
	
	@Scheduled(cron = "55 59 2 * * *")  // 2시 59분 55초 메소드 실행
	@CacheEvict(value = "stationInfo", allEntries = true)  // 기존 캐시 삭제
	public void removeCache() {

	}
	
	@Scheduled(cron = "0 0 3 * * *")  // 3시 메소드 실행
	public void refreshCache() {
		cacheService.getAllStationInfo();// 새로운 데이터를 가져오고 캐시 갱신
		
	}
}
