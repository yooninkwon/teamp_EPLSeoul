package com.tech.EPL.mobility.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.batch.core.JobExecution;
import org.springframework.cache.CacheManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.mobility.service.MobilityBatchService;
import com.tech.EPL.mobility.service.MobilitySeoulAPIService;

@RestController
@RequestMapping("/epl/mobility/data")
public class MobilityRestController {
	
	// 필드 선언
	private final MobilityBatchService mobilityBatchService;
	private final CacheManager cacheManager;
	private final String seoulApiKey;
    private final MobilitySeoulAPIService mobilitySeoulAPIService;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityRestController(MobilityBatchService mobilityBatchService,
    		CacheManager cacheManager,
    		ApiKeyConfig apiKeyConfig,
    		MobilitySeoulAPIService mobilitySeoulAPIService) {
    	this.mobilityBatchService = mobilityBatchService;
    	this.cacheManager = cacheManager;
        this.seoulApiKey = apiKeyConfig.getSeoulMobilityKey();
        this.mobilitySeoulAPIService = mobilitySeoulAPIService;
    }
    
    
    
    
    // REST API 트리거
    // Batch Job : 데이터 가공 및 저장
    @GetMapping("/runBatch/{fileType}")
    public void runBatch(@PathVariable String fileType) throws Exception {
        JobExecution execution = mobilityBatchService.run(fileType);
        System.out.println("데이터 저장 결과 : " + execution.getStatus());
        if (execution.getStatus().isUnsuccessful()) {
            System.out.println("실패 이유 : " + execution.getAllFailureExceptions());
        }
    }
    
    // 특정 캐시 비우기
    @GetMapping("/clear/{cacheVal}")
    public void clearCache(@PathVariable String cacheVal) {
    	cacheManager.getCache(cacheVal).clear();
    	System.out.println("캐시를 비웠습니다.");
    }
    
    
    
    
    // 데이터 호출 매서드
    // 서울 열린데이터광장 API
    @GetMapping("apiSeoul")
    public List<String> getSeoulAPIData(@RequestParam String service) throws IOException {
    	List<String> response = mobilitySeoulAPIService.fetchSeoulAPIData(seoulApiKey, service);
        return response;
    }
}
