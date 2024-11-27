package com.tech.EPL.realty.service.group;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.realty.code.DongCode;
import com.tech.EPL.realty.code.GuCode;
import com.tech.EPL.realty.service.DongCodeService;
import com.tech.EPL.realty.service.FileDBInsertService;
import com.tech.EPL.realty.service.GuCodeService;
import com.tech.EPL.realty.service.TestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealtyServiceGroup {
	private final TestService testService;
	private final DongCodeService dongCodeService;
	private final GuCodeService guCodeService;
	
	private final FileDBInsertService fileDBInsertService; 
	
	public void testMethod(Model model) {
		testService.execution(model);
	}
	
	public DongCode searchDongCode(int code) {
		return dongCodeService.findByDongCode(code);
	}
	
	public DongCode searchDongName(String name) {
		return dongCodeService.findByDongName(name);
	}
	
	public GuCode searchGuCode(int code) {
		return guCodeService.findByGuCode(code);
	}
	
	public GuCode searchGuName(String name) {
		return guCodeService.findByGuName(name);
	}
	
	public void rentFileDBInsert(String fileName, String type) {
		fileDBInsertService.insertFileData(fileName, type);
	}

	public void buyFileDBInsert(String fileName, String type) {
		fileDBInsertService.insertFileData(fileName, type);
	}
	
}