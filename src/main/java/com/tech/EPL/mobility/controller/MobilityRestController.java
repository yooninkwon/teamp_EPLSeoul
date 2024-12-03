package com.tech.EPL.mobility.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.cache.CacheManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.mobility.service.MobilitySeoulAPIService;

@RestController
@RequestMapping("/epl/mobility/data")
public class MobilityRestController {
	
	// 필드 선언
	private final CacheManager cacheManager;
	private final String seoulApiKey;
    private final MobilitySeoulAPIService mobilitySeoulAPIService;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityRestController(CacheManager cacheManager,
    		ApiKeyConfig apiKeyConfig,
    		MobilitySeoulAPIService mobilitySeoulAPIService) {
    	this.cacheManager = cacheManager;
        this.seoulApiKey = apiKeyConfig.getSeoulMobilityKey();
        this.mobilitySeoulAPIService = mobilitySeoulAPIService;
    }
    
    @GetMapping("/clear/{cacheVal}")
    public void clearCache(@PathVariable String cacheVal) {
    	cacheManager.getCache(cacheVal).clear();
    	System.out.println("캐시를 비웠습니다.");
    }
    
    // 서울 열린데이터광장 API 데이터를 반환하는 매서드 
    @GetMapping("apiSeoul")
    public List<String> getSeoulAPIData(@RequestParam String service) throws IOException {
    	List<String> response = mobilitySeoulAPIService.fetchSeoulAPIData(seoulApiKey, service);
        return response;
    }
}
