package com.tech.EPL.realty.service.group;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.realty.enums.DongName;
import com.tech.EPL.realty.enums.GuName;
import com.tech.EPL.realty.service.DongCodeService;
import com.tech.EPL.realty.service.FileDBInsertService;
import com.tech.EPL.realty.service.GuCodeService;
import com.tech.EPL.realty.service.InsertDataAVG;
import com.tech.EPL.realty.service.TestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealtyServiceGroup {
	private final TestService testService;
	private final DongCodeService dongCodeService;
	private final GuCodeService guCodeService;
	private final FileDBInsertService fileDBInsertService; 
	private final InsertDataAVG insertDataAVG;
	
	public void testMethod() {
		testService.execution();
	}
	
	public DongName searchDongCode(int code) {
		return dongCodeService.findByDongCode(code);
	}
	
	public DongName searchDongName(String name) {
		return dongCodeService.findByDongName(name);
	}
	
	public GuName searchGuCode(int code) {
		return guCodeService.findByGuCode(code);
	}
	
	public GuName searchGuName(String name) {
		return guCodeService.findByGuName(name);
	}
	
	public void rentFileDBInsert(String fileName, String type) {
		fileDBInsertService.insertFileData(fileName, type);
	}

	public void buyFileDBInsert(String fileName, String type) {
		fileDBInsertService.insertFileData(fileName, type);
	}

	public void insertAVG(Model model) {
		insertDataAVG.execution(model);
	}
	
}