package com.tech.EPL.controller.bus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl")
public class busController {

	@GetMapping("/bus")
	public String eplMain() {
		return "epl/bus";
	}	
	
}
