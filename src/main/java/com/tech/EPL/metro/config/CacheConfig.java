package com.tech.EPL.metro.config;

import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.tech.EPL.metro.service.CacheService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableCaching
@RequiredArgsConstructor
public class CacheConfig {
	
	private final CacheService cacheService;
	
	@Bean
	public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .maximumSize(10000)  // 최대 1000개 항목만 저장
        );
        return cacheManager;
	}
	
    @Scheduled(fixedRate = 3600000)  // 1시간마다 갱신
    public void refreshCache() {
    	cacheService.getAllStaionInfo();

        System.out.println("캐시 갱신 중");
    }
}


