package com.tech.EPL.metro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.config.ApiKeyConfig;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class MetroController {

	private final ApiKeyConfig apiKeyConfig;
	
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
	
}
