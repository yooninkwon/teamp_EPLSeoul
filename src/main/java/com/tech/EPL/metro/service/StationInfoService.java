package com.tech.EPL.metro.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.metro.dto.StationAmenitiesDto;
import com.tech.EPL.metro.dto.StationHelpMapDto;
import com.tech.EPL.metro.dto.StationNameHistoryDto;
import com.tech.EPL.metro.mapper.MetroMapper;

@Service
public class StationInfoService implements ExecutionModel{

	MetroMapper metroMapper;
	
	public StationInfoService(MetroMapper metroMapper) {
		this.metroMapper = metroMapper;
	}
	
	@Override
	public void execution(Model model) {
		Map<String, Object> info = new HashMap<>();
		
		
		String stationName = (String) model.getAttribute("stationName");
		if (stationName.contains("(")) {
		    stationName = stationName.substring(0, stationName.indexOf("("));
		}
		String stationRoute = (String) model.getAttribute("stationRoute");
		String stationId = (String) model.getAttribute("stationId");
		
		//기본정보 dto 반환 map에 담기
		info.put("stationInfo", metroMapper.stationInfo(stationName, stationRoute));
		//지하철명 유래 dto 반환 map에 담기
		info.put("stationNameHistory", stationNameHistory(stationName));
		//지하철 편의시설 유무 dto반환 map에 담기
		info.put("stationAmenities", stationAmenities(stationId));
		//지하철 안내도 dto 반환 map에 담기
		info.put("stationHelpMap", stationHelpMap(stationName, stationRoute));
		
		
		
		model.addAttribute("info",info);
	}
	
	//지하철명 유래
	public StationNameHistoryDto stationNameHistory(String stationName) {
		
		return metroMapper.stationNameHistory(stationName);
	}
	
	//지하철 편의시설
	public StationAmenitiesDto stationAmenities(String stationId) {
		
		return metroMapper.stationAmenities(stationId);
	}
	
	//지하철 안내도
	public StationHelpMapDto stationHelpMap(String stationName, String stationRoute) {
		
		return metroMapper.stationHelpMap(stationName, stationRoute);
	}
	
}
