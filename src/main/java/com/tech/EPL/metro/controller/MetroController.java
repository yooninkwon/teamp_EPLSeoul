package com.tech.EPL.metro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.metro.service.StationAccidentCrimeDataService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class MetroController {

	private final ApiKeyConfig apiKeyConfig;
	
	private final StationAccidentCrimeDataService stationAccidentCrimeDataService;
	
	@GetMapping("/metro1")
	public String metro1(Model model) {
		String kakao = apiKeyConfig.getKakaoBusKey();
		model.addAttribute("kakao",kakao);
		
		return "epl/metro1";
	}
			
	@GetMapping("/metro2")
	public String metro2() {
		
		
		return "epl/metro2";
	}	
	
	@GetMapping("/metro3")
	public String metro3() {
		
		
		return "epl/metro3";
	}	
	
	@GetMapping("/metro4")
	public String metro4() {
		
		
		return "epl/metro4";
	}
	
	//metro5 지하철 범죄 및 사고 통계
	@GetMapping("/metro5")
	public String metro5(Model model) {
		
		stationAccidentCrimeDataService.execution(model);
		
		return "epl/metro5";
	}	
	
}
