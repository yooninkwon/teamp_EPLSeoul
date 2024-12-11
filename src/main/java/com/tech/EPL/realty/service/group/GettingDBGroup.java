package com.tech.EPL.realty.service.group;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.service.GuAvgData;
import com.tech.EPL.realty.service.JuminDataService;
import com.tech.EPL.realty.service.RankingData;
import com.tech.EPL.realty.service.RealtyYearsAvgData;
import com.tech.EPL.realty.service.YearsGuUpDownData;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GettingDBGroup {
	private final RealtyYearsAvgData realtyYearsAvgData;
	private final GuAvgData guAvgData;
	private final RankingData rankingData;	
	private final YearsGuUpDownData yearsGuUpDownData;
	private final JuminDataService juminDataService;
	
	public ResponseEntity<Map<String, Object>> getYearsAvgData() {
		return realtyYearsAvgData.execution();
	}

	public ResponseEntity<Map<String, Object>> getGuData(String type) {
		guAvgData.setType(type);
		return guAvgData.execution();
	}

	public ResponseEntity<Map<String, Object>> getRankingData() {
		return rankingData.execution();
	}

	public ResponseEntity<Map<String, Object>> getYearsGuUpDownData() {
		return yearsGuUpDownData.execution();
	}

	public ResponseEntity<ArrayList<RealtyJuminData>> getJuminData() {
		return juminDataService.execution();
	}
}
