package com.tech.EPL.metro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.metro.service.SearchStationNameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("epl/metro")
@RequiredArgsConstructor
public class MetroRestController {

	private final ApiKeyConfig apiKeyConfig;
	
	private final SearchStationNameService searchStationNameService;
	
	
	
	//metro1 지하철역 검색 리스트나오기
	@GetMapping("/searchStationName")
	public List<Map> searchStationName(@RequestParam String searchValue, Model model) {
		
		
		model.addAttribute("searchValue",searchValue);
		model.addAttribute("apiKeyConfig", apiKeyConfig);
		searchStationNameService.execution(model);
		List<Map> list = (List<Map>) model.getAttribute("list");
		
		return list;
	}
	
	
	
	
	
}
