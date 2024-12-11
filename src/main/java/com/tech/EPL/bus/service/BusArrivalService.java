package com.tech.EPL.bus.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.tech.EPL.config.ApiKeyConfig;

@Service
public class BusArrivalService {
	private final ApiKeyConfig apiKeyConfig;

	public BusArrivalService(ApiKeyConfig apiKeyConfig) {
		this.apiKeyConfig = apiKeyConfig;
	}

	@Autowired
	private RestTemplate restTemplate;	

	

	// 공공 API에서 버스 도착 정보 가져오는 메서드
	public List<Map<String, String>> getBusArrivalInfo(String stationId) throws Exception {
		// 1. 공공 API 호출 (HTTP 요청을 통해 데이터 가져오기)
		String responseData = callBusApi(stationId);

		// 2. 응답 데이터 파싱
		List<Map<String, String>> buses = parseBusArrivalData(responseData);

		// 3. 파싱된 버스 목록 반환
		return buses;
	}

	// 공공 API 호출 메서드 (실제 API 호출)
	private String callBusApi(String stationId) throws Exception {
	    // 공공 API에서 사용하는 API_KEY를 정의
	    String API_KEY = apiKeyConfig.getOpenBus(); 
	    System.out.println("사용 중인 API_KEY: " + API_KEY); // API 키 확인
	   
	    String API_URL = "http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId"; // 제공하신 API URL

	    // API URL에 stationId와 API_KEY를 추가하여 요청을 보냄
	    String url = API_URL+"?serviceKey="+API_KEY+"&stId="+stationId;

	    System.out.println("url"+url);
	    // RestTemplate을 사용하여 GET 요청을 보내고 응답을 받음
	    String response = restTemplate.getForObject(url, String.class);

	    // 응답 로그 출력
	    System.out.println("API 응답: " + response);
	    System.out.println("API stationId: " + stationId);

	    // API 응답을 반환
	    return response;
	}

	// 응답 데이터 파싱 메서드
	private List<Map<String, String>> parseBusArrivalData(String responseData) throws Exception {
	    List<Map<String, String>> buses = new ArrayList<>();

	    // Jackson의 XmlMapper를 사용하여 XML을 Map으로 변환
	    XmlMapper xmlMapper = new XmlMapper();
	    JsonNode rootNode = xmlMapper.readTree(responseData);

	    // XML에서 원하는 데이터 추출
	    JsonNode busArrivalsNode = rootNode.path("msgBody").path("itemList");

	    for (JsonNode busNode : busArrivalsNode) {
	        Map<String, String> busInfo = new HashMap<>();
	        busInfo.put("busNo", busNode.path("rtNm").asText()); // 버스 노선
	        busInfo.put("arrivalTime", busNode.path("arrtime").asText()); // 도착 시간
	        buses.add(busInfo);
	    }

	    return buses;
	}
}
