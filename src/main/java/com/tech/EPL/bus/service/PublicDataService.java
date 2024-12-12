package com.tech.EPL.bus.service;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PublicDataService {

    public String getPublicData() {
        // 기본 URL
        String baseUrl = "http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId";

        // 서비스 키 (URL 인코딩된 상태로 제공)
        String serviceKey = "d7aEl2jtBFw1hoI9KwebIEoMLB72A54OmJuMrOuQS1mJXVvhR0G8rm2sD9xxh4fsyFo2mc8EH3yQ%2BWr8R0Q%2FhA%3D%3D";

        // 정류소 ID (stId)
        String stId = "100000020";

        // 최종 URL
        String url = baseUrl + "?serviceKey=" + serviceKey + "&stId=" + stId;

        try {
            RestTemplate restTemplate = new RestTemplate();
            URI uri = new URI(url);  // URI 생성 시 예외가 발생할 수 있습니다.
            String response = restTemplate.getForObject(uri, String.class);
            return response;  // API 호출 결과를 반환
        } catch (URISyntaxException e) {
            e.printStackTrace();  // 예외 처리 (로그를 남기거나 사용자에게 에러 메시지 표시)
            return "Error: Invalid URI syntax";
        }
    }
}