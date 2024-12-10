package com.tech.EPL.realty.service.group;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.enums.DongName;
import com.tech.EPL.realty.enums.GuName;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealtyServiceGroupMain {
	
	private final RealtyDBInsertGroup dbInsertGroup;
	private final UsingEnumGroup usingEnumGroup;
	private final GettingDBGroup getDatabaseGroup;
	
	public ResponseEntity<Map<String, Object>> getYearsAvgData() {
		return getDatabaseGroup.getYearsAvgData();
	}
	
	public ResponseEntity<Map<String, Object>> getGuData(String type) {
		return getDatabaseGroup.getGuData(type);
	}
	
	public ResponseEntity<Map<String, Object>> getRankingData() {
		return getDatabaseGroup.getRankingData();
	}
	
	public ResponseEntity<Map<String, Object>> getYearsGuUpDownData() {
		return getDatabaseGroup.getYearsGuUpDownData();
	}

	public ResponseEntity<ArrayList<RealtyJuminData>> getJuminData() {
		return getDatabaseGroup.getJuminData();
	}	
	
	public void rentFileDBInsert(String fileName, String type) {
		dbInsertGroup.fileDBinsert(fileName, type);
	}

	public void buyFileDBInsert(String fileName, String type) {
		dbInsertGroup.fileDBinsert(fileName, type);
	}

	public void insertAVG() {
		dbInsertGroup.insertAVG();
	}
	public DongName searchDongCode(int code) {
		return usingEnumGroup.findByDongCode(code);
	}
	
	public DongName searchDongName(String name) {
		return usingEnumGroup.findByDongName(name);
	}
	
	public GuName searchGuCode(int code) {
		return usingEnumGroup.findByGuCode(code);
	}
	
	public GuName searchGuName(String name) {
		return usingEnumGroup.findByGuName(name);
	}
}