package com.tech.EPL.history.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.EPL.history.service.group.HistoryServiceGroup;

@Controller
@RequestMapping("/history") // 추후 변경
public class ELPHistoryController {
	
	private final HistoryServiceGroup serviceGroup;
	
	public ELPHistoryController(HistoryServiceGroup serviceGroup) {
		this.serviceGroup = serviceGroup;
	}
	
	@GetMapping("/main")
	public void historyMain(Model model) {
		serviceGroup.testMethod(model);
	}
}
