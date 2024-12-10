package com.tech.EPL.realty.service.group;

import org.springframework.stereotype.Service;

import com.tech.EPL.realty.service.FileDBInsertService;
import com.tech.EPL.realty.service.InsertDataAVG;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealtyDBInsertGroup {
	private final FileDBInsertService fileDBInsertService; 
	private final InsertDataAVG insertDataAVG;
	
	public void fileDBinsert(String fileName, String type) {
		fileDBInsertService.insertFileData(fileName, type);
	}

	public void insertAVG() {
		insertDataAVG.execution();
	}	
}
