package com.tech.EPL.controller;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EPLSchedulerComponent {
	
	@CacheEvict(value = "bikeStationData", allEntries = true) // 캐시 삭제
    @Scheduled(fixedRate = 3600000) // 1시간마다 실행
    public void clearCache() {
        System.out.println("'bikeStationData'캐시를 갱신합니다.");
    }
}
