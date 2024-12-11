package com.tech.EPL.config;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EPLSchedulerComponent {
	
	@CacheEvict(value = "parkingKickboard", allEntries = true) // 캐시 삭제
    @Scheduled(fixedRate = 3600000) // 1시간마다 실행
    public void clearKickboardCache() {
        System.out.println("'parkingKickboard'캐시를 갱신합니다.");
    }
	
	@CacheEvict(value = "bikeList", allEntries = true)
	@Scheduled(fixedRate = 3600000)
	public void clearBikeCache() {
		System.out.println("'bikeList'캐시를 갱신합니다.");
	}
}
