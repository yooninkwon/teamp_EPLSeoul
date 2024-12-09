package com.tech.EPL.realty.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.interfaces.ExecutionEntity;
import com.tech.EPL.realty.mapper.RealtyYearsMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class YearsGuData implements ExecutionEntity<Map<String, Object>> {

	private final RealtyYearsMapper yearsMapper;

	@Override
	public ResponseEntity<Map<String, Object>> execution() {

		Map<String, Object> dataMap = new HashMap<>();

		putMapMethod(dataMap, "buying_apt", yearsMapper.getYearsBuyingApt());
		putMapMethod(dataMap, "buying_single", yearsMapper.getYearsBuyingSingle());
		putMapMethod(dataMap, "buying_multi", yearsMapper.getYearsBuyingMulti());
		putMapMethod(dataMap, "buying_office", yearsMapper.getYearsBuyingOffice());
		putMapMethod(dataMap, "rent_apt", yearsMapper.getYearsRentApt());
		putMapMethod(dataMap, "rent_single", yearsMapper.getYearsRentSingle());
		putMapMethod(dataMap, "rent_multi", yearsMapper.getYearsRentMulti());
		putMapMethod(dataMap, "rent_office", yearsMapper.getYearsRentOffice());
		putMapMethod(dataMap, "jeonse_apt", yearsMapper.getYearsJeonseApt());
		putMapMethod(dataMap, "jeonse_single", yearsMapper.getYearsJeonseSingle());
		putMapMethod(dataMap, "jeonse_multi", yearsMapper.getYearsJeonseMulti());
		putMapMethod(dataMap, "jeonse_office", yearsMapper.getYearsJeonseOffice());

		return ResponseEntity.ok(dataMap);
	}

	private <T> void putMapMethod(Map<String, Object> dataMap, String keyName, ArrayList<T> list) {
		dataMap.put(keyName, list);
	}

}
