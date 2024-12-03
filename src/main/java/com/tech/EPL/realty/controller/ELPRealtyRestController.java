package com.tech.EPL.realty.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@RestController
@RequestMapping("/epl") 
public class ELPRealtyRestController {
	
	private final RealtyServiceGroup serviceGroup;
	
	public ELPRealtyRestController(RealtyServiceGroup serviceGroup) {
		this.serviceGroup = serviceGroup;
	}
	
	@GetMapping("/gu-data")
	public ResponseEntity<Map<String, Object>> fetchGuData(@RequestParam String type) {
		return serviceGroup.getGuData(type);
	}
	

	
	// 파일업로드
	@PostMapping("/rent-file")
	public void rentFileData(@RequestParam String fileName,
			@RequestParam String type) {
//		String fileName = "C:\\team Albamon\\EPL_Seoul 자료\\부동산 실거래가 정보 모음\\월세_실거래가_년도별_엑셀\\파이썬작업끝난곳\\월세_실거래가_종합_문자_py.csv";
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
