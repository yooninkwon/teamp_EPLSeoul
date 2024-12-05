package com.tech.EPL.realty.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.interfaces.ExecutionEntity;
import com.tech.EPL.realty.mapper.RealtyYearsMapper;

import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@RequiredArgsConstructor
public class YearsGuData implements ExecutionEntity<Map<String, Object>> {
	
	private final RealtyYearsMapper yearsMapper;
	
	@Setter
	private String type;
	
	@Override
	public ResponseEntity<Map<String, Object>> execution() {
		
		Map<String, Object> dataMap = new HashMap<>();
		
		if(type.equals("buying")) {
			putMapMethod(dataMap, "buyingApt", yearsMapper.getYearsBuyingApt());
			putMapMethod(dataMap, "buyingSingle", yearsMapper.getYearsBuyingSingle());
			putMapMethod(dataMap, "buyingMulti", yearsMapper.getYearsBuyingMulti());
			putMapMethod(dataMap, "buyingOffice", yearsMapper.getYearsBuyingOffice());
		} else if(type.equals("rent")) {
			putMapMethod(dataMap, "rentApt", yearsMapper.getYearsRentApt());
			putMapMethod(dataMap, "rentSingle", yearsMapper.getYearsRentSingle());
			putMapMethod(dataMap, "rentMulti", yearsMapper.getYearsRentMulti());
			putMapMethod(dataMap, "rentOffice", yearsMapper.getYearsRentOffice());
		} else {
			putMapMethod(dataMap, "jeonseApt", yearsMapper.getYearsJeonseApt());
			putMapMethod(dataMap, "jeonseSingle", yearsMapper.getYearsJeonseSingle());
			putMapMethod(dataMap, "jeonseMulti", yearsMapper.getYearsJeonseMulti());
			putMapMethod(dataMap, "jeonseOffice", yearsMapper.getYearsJeonseOffice());
		}
		
		return ResponseEntity.ok(dataMap);
	}
	
	private <T> void putMapMethod(Map<String, Object> dataMap, String keyName, ArrayList<T> list) {
		dataMap.put(keyName, list);
	}

}
