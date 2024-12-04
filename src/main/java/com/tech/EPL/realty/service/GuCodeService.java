package com.tech.EPL.realty.service;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.tech.EPL.realty.enums.GuName;

@Service
public class GuCodeService {
	
	public GuName findByGuName(String name) {
		return Arrays.stream(GuName.values())
				.filter(gu -> gu.getGuName().equals(name))
				.findFirst()
				.orElse(null);		
	}

	public GuName findByGuCode(int code) {
		return Arrays.stream(GuName.values())
				.filter(gu -> gu.getGuCode() == code)
				.findFirst()
				.orElse(null);		
	}
	
}
