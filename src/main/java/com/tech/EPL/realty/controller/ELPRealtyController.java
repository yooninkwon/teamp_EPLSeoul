package com.tech.EPL.realty.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@Controller
@RequestMapping("/epl") // 추후 변경
public class ELPRealtyController {
	
	private final ApiKeyConfig apiKeyConfig;
	private final RealtyServiceGroup serviceGroup;
	
	public ELPRealtyController(RealtyServiceGroup serviceGroup, ApiKeyConfig apiKeyConfig) {
		this.serviceGroup = serviceGroup;
		this.apiKeyConfig = apiKeyConfig;
	}
	
	@GetMapping("/realty")
	public String realtyMain(Model model) {
		serviceGroup.testMethod(model);
		apiKeyConfig.getOpenRealtyKey();
//		String aa = apiKeyConfig.getSeoulMetroKey();
//		System.out.println(aa);
		return "epl/realty";
	}
	
	@PostMapping("/rent-file")
	public String rentFileData(@RequestParam String fileName,
			@RequestParam String type) {
		serviceGroup.rentFileDBInsert(fileName, type);
		
		return "epl/realty";
	}

	@PostMapping("/buy-file")
	public String buyFileData(@RequestParam String fileName,
			@RequestParam String type) {
		serviceGroup.buyFileDBInsert(fileName, type);
		
		return "epl/realty";
	}
}


