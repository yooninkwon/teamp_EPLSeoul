package com.tech.EPL.realty.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@Controller
@RequestMapping("/epl") // 추후 변경
public class ELPRealtyController {
	
//	private final ApiKeyConfig apiKeyConfig;
	private final RealtyServiceGroup serviceGroup;
	
	public ELPRealtyController(RealtyServiceGroup serviceGroup /* , ApiKeyConfig apiKeyConfig */ ) {
		this.serviceGroup = serviceGroup;
//		this.apiKeyConfig = apiKeyConfig;
	}
	
	@GetMapping("/realty1")
	public String realty1() {
		serviceGroup.testMethod();
		return "epl/realty1";
	}
		
	@GetMapping("/realty2")
	public String realty2(Model model) {
		return "epl/realty2";
	}

	@PostMapping("/realty2")
	public String realty2Post(Model model) {
//		System.out.println("데이터베이스 평균값 Insert 작동");
//		serviceGroup.insertAVG(model);
		
		return "epl/realty2";
	}
	
	@GetMapping("/realty3")
	public String realty3(Model model) {
//		String fileName = "C:\\team Albamon\\EPL_Seoul 자료\\부동산 실거래가 정보 모음\\월세_실거래가_년도별_엑셀\\파이썬작업끝난곳\\월세_실거래가_종합_문자_py.csv";
//		String type = "전월세";
//		serviceGroup.rentFileDBInsert(fileName, type);
		return "epl/realty3";
	}
	
	@GetMapping("/realty4")
	public String realty4(Model model) {
		return "epl/realty4";
	}
	
	@GetMapping("/realty5")
	public String realty5(Model model) {
		return "epl/realty5";
	}
	
	@GetMapping("/realty6")
	public String realty6(Model model) {
		return "epl/realty6";
	}

	// 파일업로드
	@PostMapping("/rent-file")
	public String rentFileData(@RequestParam String fileName,
			@RequestParam String type) {
//		serviceGroup.rentFileDBInsert(fileName, type);
		
		return "epl/realty";
	}

	// 파일업로드
	@PostMapping("/buy-file")
	public String buyFileData(@RequestParam String fileName,
			@RequestParam String type) {
//		serviceGroup.buyFileDBInsert(fileName, type);
		
		return "epl/realty";
	}
	
	
}


