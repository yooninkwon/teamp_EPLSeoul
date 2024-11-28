package com.tech.EPL.mobility.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.mobility.service.MobilityService;

@RestController
@RequestMapping("/epl/mobility/data")
public class MobilityRestController {
	
	// 필드 선언
	private final String seoulApiKey;
    private final MobilityService mobilityService;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityRestController(ApiKeyConfig apiKeyConfig,
    		MobilityService mobilityService) {
        this.seoulApiKey = apiKeyConfig.getSeoulMobilityKey();
        this.mobilityService = mobilityService;
    }
    
    // 따릉이 데이터를 반환하는 API
    @GetMapping("bike")
    public String getBikeStationData() throws IOException {
    	// 서울시 따릉이대여소 마스터 정보 : 서울시 따릉이대여소에 대한 대여소 ID, 역 주소, 좌표 정보
        String response = mobilityService.fetchBikeStationData(seoulApiKey);
        return response; // JSON 형식으로 반환
    }
}
