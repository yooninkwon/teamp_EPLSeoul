package com.tech.EPL.date.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl")
public class dateController {

	@GetMapping("/date")
	public String dateMain() {
		return "epl/date";
	}	
	

}
