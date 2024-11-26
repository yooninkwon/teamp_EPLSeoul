package com.tech.EPL.realty.service;

import com.tech.EPL.realty.code.DongCode;
import java.util.Arrays;

import org.springframework.stereotype.Service;

@Service
public class DongCodeService {
	
	public DongCode findByDongName(String name) {
		return Arrays.stream(DongCode.values())
				.filter(dong -> dong.getDongName().equals(name))
				.findFirst()
				.orElse(null);		
	}

	public DongCode findByDongCode(int code) {
		return Arrays.stream(DongCode.values())
				.filter(dong -> dong.getDongCode() == code)
				.findFirst()
				.orElse(null);		
	}
}
