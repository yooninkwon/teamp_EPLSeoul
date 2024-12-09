package com.tech.EPL.realty.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/epl") // 추후 변경
//@RequiredArgsConstructor
public class ELPRealtyController {
	
//	private final RealtyServiceGroup serviceGroup;
	
	@GetMapping("/realty0")
	public String realty0() {
		return "epl/realty0";
	}
		
	@GetMapping("/realty1")
	public String realty1() {
		return "epl/realty1";
	}
		
	@GetMapping("/realty2")
	public String realty2() {
		return "epl/realty2";
	}
	
	@GetMapping("/realty3")
	public String realty3() {
		return "epl/realty3";
	}
	
	@GetMapping("/realty4")
	public String realty4() {
		return "epl/realty4";
	}
	
	@GetMapping("/realty5")
	public String realty5() {
		return "epl/realty5";
	}
	
	@GetMapping("/realty6")
	public String realty6() {
		return "epl/realty6";
	}	
	
	@GetMapping("/realty7")
	public String realty7() {
		return "epl/realty7";
	}	
}


