package com.tech.EPL.bus.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.EPL.bus.dto.BlogPost;
import com.tech.EPL.bus.service.BusArrivalService;
import com.tech.EPL.bus.service.BusStationService;
import com.tech.EPL.bus.service.NaverBlogService;
import com.tech.EPL.config.ApiKeyConfig;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class BusController {
	

	private final BusStationService busStationService;
	
	private final BusArrivalService busArrivalService;

	private final ApiKeyConfig apiKeyConfig;

	private final NaverBlogService naverBlogService;

	@GetMapping("/bus")
	public String busTracking(Model model) {

		model.addAttribute("kakaoBus", apiKeyConfig.getKakaoBusKey());
		model.addAttribute("tmapBusKey", apiKeyConfig.getTmapBusKey());
		model.addAttribute("OpenBus", apiKeyConfig.getOpenBus());

		busStationService.execution(model);

		return "epl/bus";
	}

	
	 // 버스 도착 정보 요청
	@RequestMapping("/getBusArrivalInfo")
	@ResponseBody
	public List<Map<String, String>> getBusArrivalInfo(@RequestParam("stationId") String stationId) {
	   System.out.println("stationId:"+stationId);
		try {
	        // 서비스 호출하여 버스 도착 정보 가져오기
	        List<Map<String, String>> busList = busArrivalService.getBusArrivalInfo(stationId);
	        System.out.println("busList:"+busList);
	      
	        return busList;
	    } catch (Exception e) {
	        // 예외 처리 (API 호출 실패 등)
	        Map<String, String> error = new HashMap<>();
	        error.put("errorMessage", "버스 정보를 가져오는 데 실패했습니다.");
	        return List.of(error);
	    }
	}
	
	
	
	@GetMapping("/busNearby")
	public String getNearbyPlaces(Model model) throws IOException {
		// 기존 API 키 및 기타 서비스 호출
		model.addAttribute("kakaoBus", apiKeyConfig.getKakaoBusKey());
		model.addAttribute("googleBusKey", apiKeyConfig.getGoogleBusKey());
		model.addAttribute("tmapBusKey", apiKeyConfig.getTmapBusKey());
		
		busStationService.execution(model);

		return "epl/busNearby";
	}

	@GetMapping("/getBlogPostsByPlace")
	@ResponseBody
	public List<BlogPost> getBlogPostsByPlace(@RequestParam String place, Model model) throws IOException {
		int display = 10; // 가져올 글의 개수
		
		return naverBlogService.getBlogPosts(place, display);
	}
	
	
	@GetMapping("/bus3")
	public String busBlogList(Model model) {
		
		model.addAttribute("tmapBusKey", apiKeyConfig.getTmapBusKey());
		model.addAttribute("kakaoBus", apiKeyConfig.getKakaoBusKey());
	


		return "epl/bus3";
	}



}
