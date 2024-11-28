package com.tech.EPL.date.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.date.dto.DateDistDto;
import com.tech.EPL.date.mapper.DateMapper;

@RestController
@RequestMapping("/epl/date")
public class DateRestController {
	
	
	@Autowired
	private DateMapper dateMapper;
	
	@GetMapping("/dist_info")
	public ResponseEntity<DateDistDto> getDistrictInfo(@RequestParam String distname) {
		String name = "";
		System.out.println(distname);
		if (distname.equals("Gangnam-gu")) {
			name = "강남구";
		}
		DateDistDto dist = dateMapper.getDistrictInfo(name);
		return ResponseEntity.ok(dist);
	}
	
	
}
