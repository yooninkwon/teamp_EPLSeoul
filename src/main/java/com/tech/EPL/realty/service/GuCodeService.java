package com.tech.EPL.realty.service;

import com.tech.EPL.realty.code.GuCode;
import java.util.Arrays;

import org.springframework.stereotype.Service;

@Service
public class GuCodeService {
	
	public GuCode findByGuName(String name) {
		return Arrays.stream(GuCode.values())
				.filter(gu -> gu.getGuName().equals(name))
				.findFirst()
				.orElse(null);		
	}

	public GuCode findByGuCode(int code) {
		return Arrays.stream(GuCode.values())
				.filter(gu -> gu.getGuCode() == code)
				.findFirst()
				.orElse(null);		
	}
}
