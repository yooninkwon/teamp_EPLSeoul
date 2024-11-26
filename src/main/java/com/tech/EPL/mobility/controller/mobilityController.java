package com.tech.EPL.mobility.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl")
public class mobilityController {

	@GetMapping("/mobility")
	public String mobilityMain() {
		return "epl/mobility";
	}	
	

}
