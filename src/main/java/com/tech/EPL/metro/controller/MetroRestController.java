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
import com.tech.EPL.metro.service.LostFoundService;
import com.tech.EPL.metro.service.SearchStationNameService;
import com.tech.EPL.metro.service.StationDirectionService;
import com.tech.EPL.metro.service.StationInfoService;
import com.tech.EPL.metro.service.StationPassDataService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("epl/metro")
@RequiredArgsConstructor
public class MetroRestController {

	private final ApiKeyConfig apiKeyConfig;
	
	private final SearchStationNameService searchStationNameService;
	private final StationInfoService stationInfoService;
	private final LostFoundService lostFoundService;
	private final StationPassDataService stationPassDataService;
	private final StationDirectionService stationDirectionService;
	
	//metro1 지하철역 검색 리스트나오기(api url연결)
	@GetMapping("/searchStationName")
	public List<Map> searchStationName(@RequestParam String searchValue, Model model) {
		
		
		model.addAttribute("searchValue",searchValue);
		
		searchStationNameService.execution(model);
		List<Map> list = (List<Map>) model.getAttribute("list");
		
		return list;
	}
	 
	//metro1 지하철역 정보(기본정보,이름유래,편의시설현황,대피안내도 가져오기(db연결)
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
	
	//metro2 지하철 길안내 경로찾기 (api url연결)
	@GetMapping("/direction")
	public Map<String, Object> direction(@RequestParam String departure, 
			@RequestParam String destination, Model model) {
		model.addAttribute("apiKeyConfig", apiKeyConfig);
		model.addAttribute("departure",departure);
		model.addAttribute("destination",destination);
		
		stationDirectionService.execution(model);
		
		return (Map<String, Object>) model.getAttribute("data");
	}
	
	
	//metro3 분실물 습득물 정보 가져오기 (api url연결)
	@GetMapping("/lostFound")
	public List<Map> lostFound(@RequestParam String stationValue,
			@RequestParam String lostItemValue,  Model model){
		
		model.addAttribute("stationValue",stationValue);
		model.addAttribute("lostItemValue",lostItemValue);
		model.addAttribute("apiKeyConfig", apiKeyConfig);
		lostFoundService.execution(model);
		
		List<Map> data = (List<Map>) model.getAttribute("data");
		
		return data;
	}
	
	//metro4 지하철역 통계 정보
	@GetMapping("/stationPassData")
	public Map<String, Object> stationPassData(@RequestParam String stationName,
			@RequestParam String stationRoute, @RequestParam String dateValue, Model model) {

		model.addAttribute("apiKeyConfig", apiKeyConfig);
		model.addAttribute("stationName",stationName);
		model.addAttribute("stationRoute",stationRoute);
		model.addAttribute("dateValue",dateValue);
		stationPassDataService.execution(model);
		Map<String, Object> data = (Map<String, Object>) model.getAttribute("data");
		
		return data;
	}
	
	
}
