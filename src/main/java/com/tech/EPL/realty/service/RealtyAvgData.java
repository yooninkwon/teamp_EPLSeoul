package com.tech.EPL.realty.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.interfaces.ExecutionEntity;
import com.tech.EPL.realty.mapper.RealtyMapper;

//@Slf4j
@Service
public class RealtyAvgData implements ExecutionEntity<Map<String, Object>> {
	
	private final RealtyMapper realtyMapper;
//	private final ObjectMapper mapper;
	
	public RealtyAvgData(RealtyMapper realtyMapper // ,
//			ObjectMapper mapper
			) {
		this.realtyMapper = realtyMapper;
//		this.mapper = mapper;
	}
	
	@Override
	public ResponseEntity<Map<String, Object>> execution() {
		
		Map<String, Object> dataMap = new HashMap<>();
		
		addModelMethod(dataMap, "buyingStat", realtyMapper.getYearsStatBuying());
		addModelMethod(dataMap, "rentStat", realtyMapper.getYearsStatRent());
		addModelMethod(dataMap, "jeonseStat", realtyMapper.getYearsStatJeonse());
		
		return ResponseEntity.ok(dataMap);
	}
	
	private <T> void addModelMethod(Map<String, Object> dataMap, String keyName, ArrayList<T> list) {
		dataMap.put(keyName, list);
//		try {
//			dataMap.put(keyName, mapper.writeValueAsString(list));
//		} catch (JsonProcessingException e) {
//			log.error("Json Processing Exception", e);
//		}
	}
	
}




