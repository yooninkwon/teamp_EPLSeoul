package com.tech.EPL.realty.service.group;

import org.springframework.stereotype.Service;

import com.tech.EPL.realty.enums.DongName;
import com.tech.EPL.realty.enums.GuName;
import com.tech.EPL.realty.service.DongCodeService;
import com.tech.EPL.realty.service.GuCodeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsingEnumGroup {
	private final DongCodeService dongCodeService;
	private final GuCodeService guCodeService;

	public DongName findByDongCode(int code) {
		return dongCodeService.findByDongCode(code);
	}

	public DongName findByDongName(String name) {
		return dongCodeService.findByDongName(name);
	}

	public GuName findByGuCode(int code) {
		return guCodeService.findByGuCode(code);
	}

	public GuName findByGuName(String name) {
		return guCodeService.findByGuName(name);
	}

}
