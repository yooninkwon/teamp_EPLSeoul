package com.tech.EPL.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EPLMain {
	
	@GetMapping("/epl")
	public String mainPage() {
		return "epl";
	}
	
}
