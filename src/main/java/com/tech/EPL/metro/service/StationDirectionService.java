package com.tech.EPL.metro.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.metro.dto.StationFindXYDto;
import com.tech.EPL.metro.mapper.MetroMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StationDirectionService implements ExecutionModel{

	private final MetroMapper metroMapper;
	private final ApiKeyConfig apiKeyConfig;
	private final ReturnApiDataService returnApiDataService;
	

	
	@Override
	public void execution(Model model) {
		String departure = (String) model.getAttribute("departure");
		String destination = (String) model.getAttribute("destination");
		
		
		
		System.out.println(departure + "  " + destination);
		
		Map<String, Object> data = new HashMap<>();  
		data.put("direction", direction(departure,destination));
		
		model.addAttribute("data",data);
	}
	
	//지하철역 좌표 찾기
	public StationFindXYDto findXY(String station) {
		
		StationFindXYDto stationFindXYDto = metroMapper.stationFindXY(station);
		
		
		
		return stationFindXYDto;
	}
	
	//지하철 길안내 경로 찾기
	public Map direction(String departure, String destination) {
		
		StationFindXYDto departureXY = findXY(departure);
		StationFindXYDto destinationXY = findXY(destination);
		
		
		
		String url = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoBySubway?"
				+ "serviceKey=" + apiKeyConfig.getLostItemMetroKey()
				+ "&startX="+departureXY.getX()+"&startY="+departureXY.getY()
				+ "&endX="+destinationXY.getX()+"&endY="+destinationXY.getY()
				+ "&resultType=json";
		
		Map resultData = returnApiDataService.api(url).block();
		resultData = (Map) resultData.get("msgBody");
		List<Map> result= (List<Map>) resultData.get("itemList");
		
		Map rs = result.get(0); // 첫 번째 요소 가져오기
		
		System.out.println(rs);
		
		return rs;
	}
	
	
	
}
