package com.tech.EPL.realty.service.group;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.realty.enums.DongName;
import com.tech.EPL.realty.enums.GuName;
import com.tech.EPL.realty.service.DongCodeService;
import com.tech.EPL.realty.service.FileDBInsertService;
import com.tech.EPL.realty.service.GuAvgData;
import com.tech.EPL.realty.service.GuCodeService;
import com.tech.EPL.realty.service.InsertDataAVG;
import com.tech.EPL.realty.service.RealtyAvgData;
import com.tech.EPL.realty.service.RankingData;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealtyServiceGroup {
	private final RealtyAvgData realtyAvgData;
	private final GuAvgData guAvgData;
	private final RankingData rankingData;
	private final DongCodeService dongCodeService;
	private final GuCodeService guCodeService;
	private final FileDBInsertService fileDBInsertService; 
	private final InsertDataAVG insertDataAVG;
	
	public void getAvgData(Model model) {
		realtyAvgData.execution(model);
	}
	
	public ResponseEntity<Map<String, Object>> getGuData(String type) {
		guAvgData.setType(type);
		return guAvgData.execution();
	}
	
	public ResponseEntity<Map<String, Object>> getRankingData() {
		return rankingData.execution();
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
	
}