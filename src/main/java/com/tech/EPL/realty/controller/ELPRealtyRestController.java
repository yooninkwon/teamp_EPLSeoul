package com.tech.EPL.realty.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
		System.out.println(type);
		return serviceGroup.getGuData(type);
	}
	
}
