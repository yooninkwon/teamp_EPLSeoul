package com.tech.EPL.realty.service;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.tech.EPL.realty.enums.DongName;

@Service
public class DongCodeService {
	
	public DongName findByDongName(String name) {
		return Arrays.stream(DongName.values())
				.filter(dong -> dong.getDongName().equals(name))
				.findFirst()
				.orElse(null);		
	}

	public DongName findByDongCode(int code) {
		return Arrays.stream(DongName.values())
				.filter(dong -> dong.getDongCode() == code)
				.findFirst()
				.orElse(null);		
	}
}
