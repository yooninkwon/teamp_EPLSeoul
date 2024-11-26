package com.tech.EPL.metro.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.metro.service.SearchStationNameService;

@RestController
@RequestMapping("epl/metro")
public class MetroRestController {

	ExecutionModel executionModel;
	
	
	//metro1 지하철역 검색 리스트나오기
	@GetMapping("/searchStationName")
	public void searchStationName(@RequestParam String searchValue, Model model) {
		System.out.println(searchValue);
		
		model.addAttribute("searchValue",searchValue);
		
		executionModel = new SearchStationNameService();
		executionModel.execution(model);
		
		
	}
	
	
	
	
	
}
