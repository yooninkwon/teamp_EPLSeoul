package com.tech.EPL.metro.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LostFoundService implements ExecutionModel{

	private final ReturnApiDataService returnApiDataService;
	
	@Override
	public void execution(Model model) {
		
		ApiKeyConfig key = (ApiKeyConfig) model.getAttribute("apiKeyConfig");
		
		String searchValue = (String) model.getAttribute("searchValue");
		String dateValue = (String) model.getAttribute("dateValue");
		System.out.println(searchValue + dateValue);
		
	}
	
}
