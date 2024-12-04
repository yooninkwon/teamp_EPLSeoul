package com.tech.EPL.realty.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.interfaces.ExecutionModelEntity;
import com.tech.EPL.realty.mapper.RealtyMapper;

import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@RequiredArgsConstructor
public class GuAvgData implements ExecutionModelEntity<Map<String, Object>> {
	
	private final RealtyMapper realtyMapper;
	
	@Setter
	private String type = "";
	
	@Override
	public ResponseEntity<Map<String, Object>> execution() {
		
		Map<String, Object> dataMap = new HashMap<>();
		
		if (type.equals("apt")) {
		    putMapMethod(dataMap, "guAvgBuying", realtyMapper.getGuAvgBuyingApt());
		    putMapMethod(dataMap, "guAvgRent", realtyMapper.getGuAvgRentApt());
		    putMapMethod(dataMap, "guAvgJeonse", realtyMapper.getGuAvgJeonseApt());
		} else if (type.equals("single")) {
		    putMapMethod(dataMap, "guAvgBuying", realtyMapper.getGuAvgBuyingSingle());
		    putMapMethod(dataMap, "guAvgRent", realtyMapper.getGuAvgRentSingle());
		    putMapMethod(dataMap, "guAvgJeonse", realtyMapper.getGuAvgJeonseSingle());
		} else if (type.equals("multi")) {
		    putMapMethod(dataMap, "guAvgBuying", realtyMapper.getGuAvgBuyingMulti());
		    putMapMethod(dataMap, "guAvgRent", realtyMapper.getGuAvgRentMulti());
		    putMapMethod(dataMap, "guAvgJeonse", realtyMapper.getGuAvgJeonseMulti());
		} else { // office
		    putMapMethod(dataMap, "guAvgBuying", realtyMapper.getGuAvgBuyingOffice());
		    putMapMethod(dataMap, "guAvgRent", realtyMapper.getGuAvgRentOffice());
		    putMapMethod(dataMap, "guAvgJeonse", realtyMapper.getGuAvgJeonseOffice());	
		}
		
	    return ResponseEntity.ok(dataMap);
	}	
	
	private <T> void putMapMethod(Map<String, Object> dataMap, String keyName, ArrayList<T> list) {
		dataMap.put(keyName, list);
	}
	
}