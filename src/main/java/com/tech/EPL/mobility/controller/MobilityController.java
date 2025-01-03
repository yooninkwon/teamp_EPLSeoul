package com.tech.EPL.mobility.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.config.ApiKeyConfig;

@Controller
@RequestMapping("/epl/mobility")
public class MobilityController {
	
	// 필드 선언
	private final String kakaoApiJsKey;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityController(ApiKeyConfig apiKeyConfig) {
        this.kakaoApiJsKey = apiKeyConfig.getKakaoMobilityJsKey();
    }
    
	@GetMapping("info")
	public String mobilityInfo(Model model) {
		model.addAttribute("kakaoApiJsKey", kakaoApiJsKey);
		return "epl/mobility/info";
	}
	
	@GetMapping("cluster")
	public String mobilityCluster(Model model) {
		model.addAttribute("kakaoApiJsKey", kakaoApiJsKey);
		return "epl/mobility/cluster";
	}
	
	@GetMapping("chart")
	public String mobilityChart() {
		return "epl/mobility/chart";
	}
}
