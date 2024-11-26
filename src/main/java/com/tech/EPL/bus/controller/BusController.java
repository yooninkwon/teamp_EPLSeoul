package com.tech.EPL.bus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.bus.dto.BusDto;
import com.tech.EPL.bus.service.BusService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class BusController {
	
	private final BusService busService;

	
	@GetMapping("/bus")
    public String busTracking(Model model)  {                    


        return "epl/bus";
    }
	
	
	
	@GetMapping("/bus2")
	public String bus2Main() {
		return "epl/bus2";
	}	
	
}
