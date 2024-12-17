package com.tech.EPL.bus.service;

import java.net.URI;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.tech.EPL.bus.dto.BusDetails;
import com.tech.EPL.config.ApiKeyConfig;

@Service
public class BusDetailApiServece {
    private final ApiKeyConfig apiKeyConfig;
    private RestTemplate restTemplate;

    public BusDetailApiServece(ApiKeyConfig apiKeyConfig) {
        this.restTemplate = new RestTemplate();
        this.apiKeyConfig = apiKeyConfig;
    }

    // 실시간 버스 위치 정보를 가져오는 메서드
    public BusDetails getBusDetails(String vehId) {
        String apiKey = apiKeyConfig.getOpenBus();
        String apiUrl = "http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId?serviceKey=" 
                        + apiKey + "&vehId=" + vehId;

     

        try {
            // URI 객체로 변환
            URI uri = URI.create(apiUrl);

            // API 호출하여 XML 응답받기
            String responseXml = restTemplate.getForObject(uri, String.class);

            // API 응답 확인
            // System.out.println("API 응답: " + responseXml);

            // XML 파싱
            XmlMapper xmlMapper = new XmlMapper();
            JsonNode rootNode = xmlMapper.readTree(responseXml);

            // msgBody와 itemList 노드 확인
            JsonNode msgBodyNode = rootNode.path("msgBody");
            if (msgBodyNode.isNull()) {
                System.out.println("msgBody 노드가 존재하지 않습니다.");
                return null;
            }

            JsonNode itemListNode = msgBodyNode.path("itemList");

            // itemList가 단일 객체인지 배열인지 확인 후 처리
            if (itemListNode.isArray()) {
                // 배열인 경우 첫 번째 항목 처리
                if (itemListNode.size() > 0) {
                    return parseBusDetails(itemListNode.get(0));
                } else {
                    System.out.println("itemList 배열이 비어 있습니다.");
                    return null;
                }
            } else {
                // 단일 객체인 경우
                return parseBusDetails(itemListNode);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching bus details", e);
        }
    }

    // BusDetails 객체로 파싱하는 메서드
    private BusDetails parseBusDetails(JsonNode itemNode) {
        
    	
    	String plainNo = itemNode.path("plainNo").asText();
    	String vehId = itemNode.path("vehId").asText();
        String busType = itemNode.path("busType").asText();
        String congetion = itemNode.path("congetion").asText();
        double posX = itemNode.path("posX").asDouble();
        double posY = itemNode.path("posY").asDouble();

        // 파싱된 데이터를 BusDetails 객체로 반환
        return new BusDetails(plainNo,vehId, busType, congetion, posX, posY);
    }
}