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
import com.tech.EPL.mobility.dto.mobility_abd;
import com.tech.EPL.mobility.dto.mobility_sbd;
import com.tech.EPL.mobility.repository.MobilityAbdJpaRepository;
import com.tech.EPL.mobility.repository.MobilitySbdJpaRepository;
import com.tech.EPL.mobility.service.MobilityBatchService;
import com.tech.EPL.mobility.service.MobilitySeoulAPIService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor // Lombok : final 필드에 자동 생성자 주입
@RequestMapping("/epl/mobility/data")
public class MobilityRestController {
	
	// 필드 선언
	private final MobilityBatchService mobilityBatchService;
	private final CacheManager cacheManager;
	private final ApiKeyConfig apiKeyConfig;
    private final MobilitySeoulAPIService mobilitySeoulAPIService;
    private final MobilitySbdJpaRepository sbdJpaRepository;
    private final MobilityAbdJpaRepository abdJpaRepository;
    
    // Batch Job : 데이터 가공 및 저장
    @GetMapping("/runBatch/{workType}/{fileType}")
    public void runBatch(@PathVariable String workType, @PathVariable String fileType) throws Exception {
        JobExecution execution = mobilityBatchService.run(workType, fileType);
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
    
    // 서울 열린데이터광장 API
    @GetMapping("/apiSeoul")
    public List<String> getSeoulAPIData(@RequestParam String service, @RequestParam(required = false) String period) throws IOException {
    	String seoulApiKey = apiKeyConfig.getSeoulMobilityKey();
        return mobilitySeoulAPIService.fetchSeoulAPIData(seoulApiKey, service, period);
    }
    
    // MOBILITY_SBD 데이터
    @GetMapping("/sbdDatas")
    public List<mobility_sbd> getSbdData() {
    	return sbdJpaRepository.findAll();
    }
    
    // MOBILITY_ABD 데이터
    @GetMapping("/abdDatas")
    public List<mobility_abd> getAbdData() {
    	return abdJpaRepository.findAll();
    }
}
