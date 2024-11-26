package com.tech.EPL.metro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;

import com.tech.EPL.config.MetroWebClient;
import com.tech.EPL.interfaces.ExecutionModel;

public class SearchStationNameService implements ExecutionModel{
	
	@Autowired
	private MetroWebClient metroWebClient;
	
	@Override
	public void execution(Model model) {
		System.out.println(model.getAttribute("searchValue"));
		String searchValue = (String) model.getAttribute("searchValue");
		
		String url = "http://openapi.seoul.go.kr:8088/(인증키)/xml/subwayStationMaster/1/5/";
		
		
	}
}
