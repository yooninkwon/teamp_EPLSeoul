package com.tech.EPL.realty.service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.interfaces.ExecutionEntity;
import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.mapper.RealtyJuminMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JuminDataService implements ExecutionEntity<ArrayList<RealtyJuminData>> {
	
	private final RealtyJuminMapper juminMapper;
	
	@Override
	public ResponseEntity<ArrayList<RealtyJuminData>> execution() {
		
		return ResponseEntity.ok(juminMapper.getJuminData());
	}
	
}
