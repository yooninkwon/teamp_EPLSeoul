package com.tech.EPL.metro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl")
public class MetroController {

	@GetMapping("/metro1")
	public String metro1() {
		
		
		return "epl/metro1";
	}
			
	@GetMapping("/metro2")
	public String metro2() {
		
		
		return "epl/metro2";
	}	
	
	@GetMapping("/metro3")
	public String metro3() {
		
		
		return "epl/metro3";
	}	
	
	@GetMapping("/metro4")
	public String metro4() {
		
		
		return "epl/metro4";
	}	
	
}
