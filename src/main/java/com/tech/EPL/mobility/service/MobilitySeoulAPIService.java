package com.tech.EPL.mobility.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MobilitySeoulAPIService {
	
	 // Spring Cache로 캐싱 : 캐시를 service 값에 따라 분리
	 @Cacheable(value = "seoulAPIData", key = "#service")
	 // 서울시 따릉이대여소 마스터 정보(bikeStationMaster) : 서울시 따릉이대여소에 대한 대여소 ID, 역 주소, 좌표 정보
	 // 서울시 전동킥보드 주차구역 현황(parkingKickboard) : 서울시 예산으로 설치한 전동킥보드 주차구역에 대한 순번, 구명, 주소, 상세위치, 거치대 유무, 거치대 크기 정보
	 public List<String> fetchSeoulAPIData(String apiKey, String service) throws IOException {
		// 호출한 전체 데이터를 담을 배열
		 List<String> allData = new ArrayList<>();
		
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
	    	// urlBuilder.append("/" + URLEncoder.encode("20220301","UTF-8")); /* 서비스별 추가 요청인자들*/
	    	
	    	URL url = new URL(urlBuilder.toString());
	    	HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	    	conn.setRequestMethod("GET");
	    	conn.setRequestProperty("Content-type", "application/json"); /*요청파일타입 (xml,xmlf,xls,json) */
	    	int responseCode = conn.getResponseCode(); /* 연결 자체에 대한 확인이 필요하므로 추가합니다.*/
	    	BufferedReader rd;
	    	
	    	// 서비스코드가 정상이면 200~300사이의 숫자가 나옵니다.
	    	if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
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
	    	
	    	// 정상처리 코드(INFO-000)가 아니라면 종료
            if (!response.contains("\"CODE\":\"INFO-000\"")) {
            	break;
            } else {
            	// 배열에 추가
            	allData.add(response);
            	// 페이지 갱신
            	start += pageSize;
            	
            	System.out.println(service+" 데이터 "+allData.size()+"page 호출 결과 : "+responseCode);
            }
	    }
	    
		return allData;
	 }
}
