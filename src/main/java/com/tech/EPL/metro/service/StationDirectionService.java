package com.tech.EPL.metro.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.metro.dto.StationFindXYDto;
import com.tech.EPL.metro.dto.StationGoMapDto;
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
		
		List<String> stationList = stationGoMap(departure,destination);
		data.put("goMap",stationList);
		
		data.put("next",arrivalTime(stationList.get(0), stationList.get(1)));
		
		
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
	//지하철 경유지 찾기
	public List<String> stationGoMap(String departure, String destination) {
		
		if(departure.equals("서울역")) {
			departure = "서울";
		}
		if(destination.equals("서울역")) {
			destination = "서울";
		}
		if(departure.equals("이수")) {
			departure = "총신대입구(이수)";
		}
		if(destination.equals("이수")) {
			destination = "총신대입구(이수)";
		}
		
		String reDeparture = "?"+departure;
		String reDestination= "?"+destination;
		
		
		StationGoMapDto rs = metroMapper.stationGoMap(reDeparture,reDestination);	
		String rsValue = rs.getSgo();
		
		rsValue = rsValue.substring(1);
		
		// '.' 기준으로 분할하여 리스트에 담기
		List<String> stationList = Arrays.stream(rsValue.split("\\."))
				.map(String::trim) // 앞뒤 공백 제거
				.toList();  
		
		 System.out.println(stationList);
		
		return stationList;
	}
	
	
	
	//현재 도착예정 열차시간 및 몇전역
	public List<Map> arrivalTime(String now, String next ) {

		String encodedStationName = URLEncoder.encode(now, StandardCharsets.UTF_8);
		
		String url = "http://swopenAPI.seoul.go.kr/api/subway/"
				+ apiKeyConfig.getSeoulMetroKey()
				+ "/json/realtimeStationArrival/0/20/" + encodedStationName;
		
		
		Map resultData = returnApiDataService.api(url).block();
		List<Map> rs = (List<Map>) resultData.get("realtimeArrivalList");
		List<Map> arrivalTimeList = new ArrayList<>();
		for (Map map : rs) {
			String nextStation = (String) map.get("trainLineNm");
			if(nextStation.contains(next)) {
				arrivalTimeList.add(map);
			}
		}
		
		
		
		
		System.out.println(rs);
		
		return arrivalTimeList;
	}
	
	
}
