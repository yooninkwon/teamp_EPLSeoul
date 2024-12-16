package com.tech.EPL.mobility.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MobilitySeoulAPIService {
	 // 서울시 공공자전거 실시간 대여정보(rentBikeStatus) : 대여소별 실시간 자전거 대여가능 건수, 거치율, 대여소 위치정보
	 // 서울시 전동킥보드 주차구역 현황(parkingKickboard) : 서울시 예산으로 설치한 전동킥보드 주차구역에 대한 순번, 구명, 주소, 상세위치, 거치대 유무, 거치대 크기 정보
	 // 서울시 공공자전거 월별 이용정보(stationUseMonthInfo) : 대여소별 년월, 대여소번호, 대여소명, 대여건수
	
	 // Spring Cache로 캐싱 : 캐시를 service 값에 따라 분리, period가 null일 경우에만 캐싱
	 @Cacheable(value = "seoulAPIData", key = "#service", condition = "#period == null")
	 public List<String> fetchSeoulAPIData(String apiKey, String service, String period) throws IOException {
		// 호출한 전체 데이터를 담을 배열
		List<String> allData = new ArrayList<>();
		
		// 데이터 가공용 service와 호출용 service 값이 다를 경우 변경
		if ("rentBikeStatus".equals(service)) {
			service = "bikeList";
		} else if ("stationUseMonthInfo".equals(service)) {
			service = "tbCycleStationUseMonthInfo";
		}

		int pageSize = 1000; // API의 최대 요청 크기
		int start = 1;
		
	    // 1000개씩 여러번 호출
	    while(true) {
	    	
	    	int end = start + pageSize - 1;
	    	
	    	StringBuilder urlBuilder = new StringBuilder("http://openapi.seoul.go.kr:8088"); /*URL*/
	    	urlBuilder.append("/" +  URLEncoder.encode(apiKey,"UTF-8") ); /*인증키 (sample사용시에는 호출시 제한됩니다.)*/
	    	urlBuilder.append("/" +  URLEncoder.encode("json","UTF-8") ); /*요청파일타입 (xml,xmlf,xls,json) */
	    	urlBuilder.append("/" + URLEncoder.encode(service,"UTF-8")); /*서비스명 (대소문자 구분 필수입니다.)*/
	    	urlBuilder.append("/" + URLEncoder.encode(Integer.toString(start),"UTF-8")); /*요청시작위치 (sample인증키 사용시 5이내 숫자)*/
	    	urlBuilder.append("/" + URLEncoder.encode(Integer.toString(end),"UTF-8")); /*요청종료위치(sample인증키 사용시 5이상 숫자 선택 안 됨)*/
	    	// 상위 5개는 필수적으로 순서바꾸지 않고 호출해야 합니다.
	    	
	    	// 서비스별 추가 요청 인자이며 자세한 내용은 각 서비스별 '요청인자'부분에 자세히 나와 있습니다.
	    	if(period != null) {
	    		urlBuilder.append("/" + URLEncoder.encode(period,"UTF-8")); /* 서비스별 추가 요청인자들*/
	    	}
	    	
	    	URL url = new URL(urlBuilder.toString());
	    	HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	    	conn.setRequestMethod("GET");
	    	conn.setRequestProperty("Content-type", "application/json"); /*요청파일타입 (xml,xmlf,xls,json) */
	    	int responseCode = conn.getResponseCode(); /* 연결 자체에 대한 확인이 필요하므로 추가합니다.*/
	    	BufferedReader rd;
	    	
	    	// 서비스코드가 정상이면 200~300사이의 숫자가 나옵니다.
	    	if(responseCode >= 200 && responseCode <= 300) {
	    		rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	    	} else {
	    		rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	    	}
	    	StringBuilder sb = new StringBuilder();
	    	String line;
	    	while ((line = rd.readLine()) != null) {
	    		sb.append(line);
	    	}
	    	rd.close();
        	conn.disconnect();
	    	
	    	String response = sb.toString(); //JSON 형식의 문자배열 반환
	    	
        	// 코드별 처리
        	if(response.contains("\"CODE\":\"INFO-000\"")) {
        		allData.add(response); // 배열에 추가
            	start += pageSize; // 페이지 갱신
        	} else if (response.contains("\"CODE\":\"INFO-200\"") & allData.size()>0) {
        		System.out.println(service+" 데이터 "+allData.size()+"page 호출 성공");
            	break;
        	} else if (response.contains("\"CODE\":\"INFO-200\"") & allData.size()==0) {
        		String responseMessage = new JSONObject(response).getString("MESSAGE"); // MESSAGE 값 추출
        		System.out.println(service+" 데이터 호출 실패 : "+responseMessage);
            	break;
        	} else {
        		String responseMessage = new JSONObject(response).getString("MESSAGE");
            	System.out.println(service+" 데이터 호출 실패 : "+responseMessage);
            	break;
            }
	    }
	    
		return allData;
	 }
}
