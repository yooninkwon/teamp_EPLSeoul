package com.tech.EPL.date.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.config.ApiKeyConfig;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class DateController {
	
	private final ApiKeyConfig apiKeyConfig;

	@GetMapping("/date")
	public String dateMain(Model model) {
		model.addAttribute("dateGoogle", apiKeyConfig.getGoogleDateKey());
		return "epl/date";
	}	
	

}
