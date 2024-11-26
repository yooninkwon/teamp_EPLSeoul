package com.tech.EPL.realty.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@Controller
@RequestMapping("/realty") // 추후 변경
public class ELPRealtyController {
	
	private final RealtyServiceGroup serviceGroup;
	
	public ELPRealtyController(RealtyServiceGroup serviceGroup) {
		this.serviceGroup = serviceGroup;
	}
	
	@GetMapping("/main")
	public void realtyMain(Model model) {
		serviceGroup.testMethod(model);
	}
}


