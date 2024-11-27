package com.tech.EPL.mobility.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Service;

@Service
public class MobilityService {
	
	 public String fetchBikeStationData(String apiKey) throws IOException {
	
	    StringBuilder urlBuilder = new StringBuilder("http://openapi.seoul.go.kr:8088");
	    urlBuilder.append("/" + URLEncoder.encode(apiKey, "UTF-8")); // 인증키 추가
	    urlBuilder.append("/" + URLEncoder.encode("json", "UTF-8"));
	    urlBuilder.append("/" + URLEncoder.encode("bikeStationMaster", "UTF-8"));
	    urlBuilder.append("/" + URLEncoder.encode("1", "UTF-8"));
	    urlBuilder.append("/" + URLEncoder.encode("5", "UTF-8"));
	
	    URL url = new URL(urlBuilder.toString());
	    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	    conn.setRequestMethod("GET");
	    conn.setRequestProperty("Content-type", "application/json");
	    System.out.println("Response code: " + conn.getResponseCode());
	
	    BufferedReader rd;
	    if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	        rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	    } else {
	        rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	    }
	
	    StringBuilder response = new StringBuilder();
	    String line;
	    while ((line = rd.readLine()) != null) {
	        response.append(line);
	    }
	    rd.close();
	    conn.disconnect();
	
	    return response.toString();
	}
}
