package com.tech.EPL.bus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public String busTracking(Model model)  {                    
	
		model.addAttribute("kakaoBus",apiKeyConfig.getKakaoBusKey());

		
		busStationService.execution(model);
	
		
        return "epl/bus";
    }
		

	
	@GetMapping("/busNearby")
	public String getNearbyPlaces(Model model) {
		model.addAttribute("kakaoBus",apiKeyConfig.getKakaoBusKey());
		model.addAttribute("googleBusKey",apiKeyConfig.getGoogleBusKey());
		System.out.println("googleBusKey:"+apiKeyConfig.getGoogleBusKey());
		
		busStationService.execution(model);
		
		
		return "epl/busNearby";
	}	
	
	
	@GetMapping("/bus3")
	public String bus3(Model model) {
	    model.addAttribute("kakaoBus", apiKeyConfig.getKakaoBusKey());
	    model.addAttribute("googleBusKey", apiKeyConfig.getGoogleBusKey());
	    model.addAttribute("tmapBusKey", apiKeyConfig.getTmapBusKey());

	    busStationService.execution(model);

	    try {
	        String query = "포비브라이트광화문점"; // 예: "네이버 블로그"
	        int display = 10; // 가져올 글의 개수

	        // 블로그 글 가져오기
	        List<BlogPost> blogPosts = naverBlogService.getBlogPosts(query, display);

	        // 블로그 글을 모델에 추가
	        model.addAttribute("blogPosts", blogPosts);
	    } catch (Exception e) {
	        e.printStackTrace();
	        model.addAttribute("error", "블로그 데이터를 가져오는 데 실패했습니다.");
	    }

	    return "epl/bus3";
	}
}
