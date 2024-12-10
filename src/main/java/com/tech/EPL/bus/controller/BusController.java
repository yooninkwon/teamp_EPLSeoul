package com.tech.EPL.bus.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.EPL.bus.dto.BlogPost;
import com.tech.EPL.bus.mapper.Idao;
import com.tech.EPL.bus.service.BusStationService;
import com.tech.EPL.bus.service.NaverBlogService;
import com.tech.EPL.config.ApiKeyConfig;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class BusController {

	@Autowired
	private Idao iDao;

	private final BusStationService busStationService;

	private final ApiKeyConfig apiKeyConfig;

	private final NaverBlogService naverBlogService;

	@GetMapping("/bus")
	public String busTracking(Model model) {

		model.addAttribute("kakaoBus", apiKeyConfig.getKakaoBusKey());

		busStationService.execution(model);

		return "epl/bus";
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
