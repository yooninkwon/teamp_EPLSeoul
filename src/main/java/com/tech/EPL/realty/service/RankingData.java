package com.tech.EPL.realty.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.interfaces.ExecutionModelEntity;
import com.tech.EPL.realty.mapper.RealtyRankingMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RankingData implements ExecutionModelEntity<Map<String, Object>> {
	
	private final RealtyRankingMapper rankMapper;
	
	@Override
	public ResponseEntity<Map<String, Object>> execution() {
		
		Map<String, Object> dataMap = new HashMap<>();
		
		putMapMethod(dataMap, "rank_buyMax", rankMapper.getBuyingRankingMax());
		putMapMethod(dataMap, "rank_buyMin", rankMapper.getBuyingRankingMin());
		
		putMapMethod(dataMap, "rank_rentGrfeMax", rankMapper.getRentRankingGrfeMax());
		putMapMethod(dataMap, "rank_rentGrfeMin", rankMapper.getRentRankingGrfeMin());
		
		putMapMethod(dataMap, "rank_rentRtfeMax", rankMapper.getRentRankingRtfeMax());
		putMapMethod(dataMap, "rank_rentRtfeMin", rankMapper.getRentRankingRtfeMin());
		
		putMapMethod(dataMap, "rank_jeonseMax", rankMapper.getJeonseRankingMax());
		putMapMethod(dataMap, "rank_jeonseMin", rankMapper.getJeonseRankingMin());
		
		return ResponseEntity.ok(dataMap);
	}
	
	private <T> void putMapMethod(Map<String, Object> dataMap, String keyName, ArrayList<T> list) {
		dataMap.put(keyName, list);
	}
	
}
