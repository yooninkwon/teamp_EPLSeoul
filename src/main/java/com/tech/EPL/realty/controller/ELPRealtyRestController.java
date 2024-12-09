package com.tech.EPL.realty.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@RestController
@RequestMapping("/epl") 
public class ELPRealtyRestController {
	
	private final RealtyServiceGroup serviceGroup;
	
	public ELPRealtyRestController(RealtyServiceGroup serviceGroup) {
		this.serviceGroup = serviceGroup;
	}
	
	@GetMapping("years-data")
	public ResponseEntity<Map<String, Object>> getYearsData() {
		return serviceGroup.getYearsAvgData();
	}
	
	@GetMapping("/gu-data")
	public ResponseEntity<Map<String, Object>> getGuData(@RequestParam String type) {
		return serviceGroup.getGuData(type);
	}
	
	@GetMapping("/rank-data")
	public ResponseEntity<Map<String, Object>> getRankingData() {
		return serviceGroup.getRankingData();	
	}
	
	@GetMapping("/years-gu-data")
	public ResponseEntity<Map<String, Object>> getYearsGuData() {
		return serviceGroup.getYearsGuData();
	}
	
	@GetMapping("/jumin-data")
	public ResponseEntity<ArrayList<RealtyJuminData>> getJuminData() {
		return serviceGroup.getJuminData();
	}
	
	// 파일업로드
	@GetMapping("/rent-file")
	public void rentFileData( // @RequestParam String fileName,
			@RequestParam String type) {
		String fileName = "C:\\team Albamon\\EPL_Seoul 자료\\인구밀도자료\\연도별 자치구 인구수_py.csv";
//		String type = "전월세";
//		serviceGroup.rentFileDBInsert(fileName, type);
		serviceGroup.rentFileDBInsert(fileName, type);
	}
	
	// 파일업로드
	@PostMapping("/buy-file")
	public void buyFileData(@RequestParam String fileName,
			@RequestParam String type) {
		serviceGroup.buyFileDBInsert(fileName, type);
	}
}
