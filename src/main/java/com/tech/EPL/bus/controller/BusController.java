package com.tech.EPL.bus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl")
public class BusController {

	@GetMapping("/bus")
	public String busMain() {
		return "epl/bus";
	}	
	
	@GetMapping("/bus2")
	public String bus2Main() {
		return "epl/bus2";
	}	
	
}
