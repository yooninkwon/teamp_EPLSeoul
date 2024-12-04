package com.tech.EPL.bus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.bus.mapper.Idao;
import com.tech.EPL.bus.service.BusStationService;
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
		model.addAttribute("kakaoBus",apiKeyConfig.getKakaoBusKey());
		model.addAttribute("googleBusKey",apiKeyConfig.getGoogleBusKey());
	
		
		busStationService.execution(model);
		
		
		return "epl/bus3";
	}	
}
