package com.tech.EPL.metro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl")
public class metroController {

	@GetMapping("/metro")
	public String metroMain() {
		return "epl/metro";
	}	
	
}
