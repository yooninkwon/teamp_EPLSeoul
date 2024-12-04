package com.tech.EPL.metro.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.metro.dto.StationCongestionDto;
import com.tech.EPL.metro.mapper.MetroMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StationPassDataService implements ExecutionModel{

	private final ReturnApiDataService returnApiDataService;
	
	private final MetroMapper metroMapper;
	
	@Override
	public void execution(Model model) {
		Map<String, Object> data = new  HashMap<>();
		
		ApiKeyConfig key = (ApiKeyConfig) model.getAttribute("apiKeyConfig");
		String metroKey = key.getSeoulMetroKey();
		
		String dateValue = (String) model.getAttribute("dateValue");
		String stationName = (String) model.getAttribute("stationName");
		String stationRoute = (String) model.getAttribute("stationRoute");
		String day = dateValue.replace("-", "");
		String month = day.substring(0, 6);		
		
		System.out.println(month+" "+stationName+" "+stationRoute);
		
		
		data.put("day", dayData(metroKey, stationName, stationRoute, day));
		data.put("month", monthData(metroKey, stationName, stationRoute, month));
		data.put("congestion", stationCongestion(stationName, stationRoute));
		model.addAttribute("data",data);
		
	}
	
	//일별 역별 승하차 정보
	public List<Map> dayData(String metroKey, String stationName, String stationRoute, String date) {
		String searchUrl = "http://openapi.seoul.go.kr:8088/"+metroKey 
				+"/json/CardSubwayStatsNew/1/1/"+date+"/"+stationRoute+"/"+stationName;
		
		System.out.println(searchUrl);
		
		Map resultData = returnApiDataService.api(searchUrl).block();
		
		if (resultData == null || resultData.get("CardSubwayStatsNew") == null) {
	        // 응답이 없거나 CardSubwayStatsNew가 없으면 빈 리스트 반환
	        return List.of();
	    }
		
		Map items = (Map) resultData.get("CardSubwayStatsNew");
		
		List<Map> item = (List<Map>) items.get("row");
		
		return item != null ? item : List.of(); // row가 null이면 빈 리스트 반환;
	}
	
	//월별 시간별 승하차 정보
	public List<Map> monthData(String metroKey, String stationName, String stationRoute, String date) {
		String searchUrl = "http://openapi.seoul.go.kr:8088/"+ metroKey 
				+"/json/CardSubwayTime/1/1/"+date+"/"+stationRoute+"/"+stationName+"/";
		
		Map resultData = returnApiDataService.api(searchUrl).block();
		
		if (resultData == null || resultData.get("CardSubwayTime") == null) {
	        // 응답이 없거나 CardSubwayStatsNew가 없으면 빈 리스트 반환
	        return List.of();
	    }
		
		Map items = (Map) resultData.get("CardSubwayTime");
		
		List<Map> item = (List<Map>) items.get("row");
		
		return item != null ? item : List.of(); // row가 null이면 빈 리스트 반환
	}
	
	//요일별 지하철역 혼잡도 정보
	public List<StationCongestionDto> stationCongestion(String stationName, String stationRoute) {
		
		return metroMapper.stationCongestion(stationName, stationRoute);
	}
}
