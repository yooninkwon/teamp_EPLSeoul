package com.tech.EPL.metro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.metro.dto.StationInfoDto;
import com.tech.EPL.metro.service.SearchStationNameService;
import com.tech.EPL.metro.service.StationInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("epl/metro")
@RequiredArgsConstructor
public class MetroRestController {

	private final ApiKeyConfig apiKeyConfig;
	
	private final SearchStationNameService searchStationNameService;
	private final StationInfoService stationInfoService;
	
	
	//metro1 지하철역 검색 리스트나오기(api url연결)
	@GetMapping("/searchStationName")
	public List<Map> searchStationName(@RequestParam String searchValue, Model model) {
		
		
		model.addAttribute("searchValue",searchValue);
		model.addAttribute("apiKeyConfig", apiKeyConfig);
		searchStationNameService.execution(model);
		List<Map> list = (List<Map>) model.getAttribute("list");
		
		return list;
	}
	 
	//metro1 지하철역 정보 가져오기(db연결)
	@GetMapping("/stationInfo")
	public Map<String, Object> stationInfo(@RequestParam String stationName, 
			@RequestParam String stationRoute, 
			@RequestParam String stationId, Model model) {
		
		model.addAttribute("stationName", stationName);
		model.addAttribute("stationRoute", stationRoute);
		model.addAttribute("stationId", stationId);
		
		stationInfoService.execution(model);
		Map<String, Object> info = (Map<String, Object>) model.getAttribute("info");
		
		return info;
	}
	
	
	
	
}
