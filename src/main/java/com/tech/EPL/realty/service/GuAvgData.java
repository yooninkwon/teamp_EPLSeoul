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
	
	private Map<String, Object> dataMap = new HashMap<>();
	
	@Setter
	private String type = "";
	
	@Override
	public ResponseEntity<Map<String, Object>> execution() {
		
		if (type.equals("apt")) {
		    putMapMethod("guAvgBuying", realtyMapper.getGuAvgBuyingApt());
		    putMapMethod("guAvgRent", realtyMapper.getGuAvgRentApt());
		    putMapMethod("guAvgJeonse", realtyMapper.getGuAvgJeonseApt());
		} else if (type.equals("single")) {
		    putMapMethod("guAvgBuying", realtyMapper.getGuAvgBuyingSingle());
		    putMapMethod("guAvgRent", realtyMapper.getGuAvgRentSingle());
		    putMapMethod("guAvgJeonse", realtyMapper.getGuAvgJeonseSingle());
		} else if (type.equals("multi")) {
		    putMapMethod("guAvgBuying", realtyMapper.getGuAvgBuyingMulti());
		    putMapMethod("guAvgRent", realtyMapper.getGuAvgRentMulti());
		    putMapMethod("guAvgJeonse", realtyMapper.getGuAvgJeonseMulti());
		} else { // office
		    putMapMethod("guAvgBuying", realtyMapper.getGuAvgBuyingOffice());
		    putMapMethod("guAvgRent", realtyMapper.getGuAvgRentOffice());
		    putMapMethod("guAvgJeonse", realtyMapper.getGuAvgJeonseOffice());	
		}
		
	    return ResponseEntity.ok(dataMap);
	}	
	
	private <T> void putMapMethod(String keyName, ArrayList<T> list) {
		dataMap.put(keyName, list);
	}
	
}