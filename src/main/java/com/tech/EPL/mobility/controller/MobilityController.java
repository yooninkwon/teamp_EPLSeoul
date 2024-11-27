package com.tech.EPL.mobility.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.mobility.service.MobilityService;

@Controller
@RequestMapping("/epl/mobility")
public class MobilityController {
	
	// 필드 선언
	private final String apiKey;
    private final MobilityService mobilityService;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityController(ApiKeyConfig apiKeyConfig,
    		MobilityService mobilityService) {
        this.apiKey = apiKeyConfig.getOpenMobilityKey();
        this.mobilityService = mobilityService;
    }

	@GetMapping("")
	public String mobilityMain() {
		return "epl/mobility";
	}
	
	@GetMapping("1")
	public String mobility1(Model model) throws IOException {
		
		String response = mobilityService.fetchBikeStationData(apiKey);
		
		model.addAttribute("bikeStations", response);
		
		return "epl/mobility/1";
	}
	
	@GetMapping("2")
	public String mobility2() {
		return "epl/mobility/2";
	}
	
	@GetMapping("3")
	public String mobility3() {
		return "epl/mobility/3";
	}
	
	@GetMapping("4")
	public String mobility4() {
		return "epl/mobility/4";
	}
	
}
