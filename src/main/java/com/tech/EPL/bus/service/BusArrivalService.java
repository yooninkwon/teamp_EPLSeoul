package com.tech.EPL.bus.service;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.tech.EPL.bus.dto.BusDetails;
import com.tech.EPL.config.ApiKeyConfig;

import reactor.core.publisher.Mono;

@Service
public class BusArrivalService {
    private final ApiKeyConfig apiKeyConfig;
    private final BusDetailApiServece busDetailApiServece; // BusDetailApiServece 주입
   
    public BusArrivalService(ApiKeyConfig apiKeyConfig, BusDetailApiServece busDetailApiServece) {
        this.apiKeyConfig = apiKeyConfig;
        this.busDetailApiServece = busDetailApiServece;  // BusDetailApiServece 객체 주입
    }

    @Autowired
    private WebClient.Builder webClientBuilder;  // WebClient.Builder 주입

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
    public String callBusApi(String stationId) {
        String API_KEY = apiKeyConfig.getOpenBus(); 
       

        String API_URL = "http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId"; 
        String url = API_URL + "?serviceKey=" + API_KEY + "&stId=" + stationId;



        try {
            // URI 객체로 변환
            URI uri = new URI(url);

            // WebClient로 요청 보내기
            String response = webClientBuilder.baseUrl(uri.toString())
                    .build()
                    .get()
                    .uri(uri)  // URI 객체를 사용하여 요청
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                            clientResponse -> {
                                System.out.println("API 오류 응답: " + clientResponse.statusCode());
                                return Mono.empty();
                            })
                    .bodyToMono(String.class)
                    .doOnTerminate(() -> System.out.println("API 호출 종료"))
                    .block();  // 동기적으로 응답을 기다림

            if (response == null) {
                System.out.println("API 응답이 null입니다.");
                return "API 응답이 없습니다.";
            } else {
               
                return response;
            }

        } catch (Exception e) {
            System.out.println("API 호출 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return "API 호출 중 오류가 발생했습니다.";
        }
    }


    // 응답 데이터 파싱 메서드
    private List<Map<String, String>> parseBusArrivalData(String responseData) throws Exception {
        List<Map<String, String>> buses = new ArrayList<>();
        XmlMapper xmlMapper = new XmlMapper();
        JsonNode rootNode = xmlMapper.readTree(responseData);
        JsonNode busArrivalsNode = rootNode.path("msgBody").path("itemList");

        for (JsonNode busNode : busArrivalsNode) {
            Map<String, String> busInfo = new HashMap<>();

            String vehId = busNode.path("vehId1").asText();  // vehId 가져오기
            String plainNo = getPlainNoFromVehId(vehId);  // vehId로 plainNo를 가져오는 메서드 호출

            busInfo.put("stNm", busNode.path("stNm").asText());  // 버스 정류장 이름
            busInfo.put("busNo", vehId);  // 버스 아이디
            busInfo.put("arrmsg1", busNode.path("arrmsg1").asText());  // 도착 시간
            busInfo.put("plainNo", plainNo);  // plainNo 추가

            buses.add(busInfo);
        }

        return buses;
    }
    // vehId로 plainNo를 가져오는 메서드
    private String getPlainNoFromVehId(String vehId) {
        try {
            // BusDetailApiServece를 사용하여 vehId로 busDetails 정보 가져오기
            BusDetails busDetails = busDetailApiServece.getBusDetails(vehId);
            return busDetails != null ? busDetails.getPlainNo() : "정보 없음";  // plainNo 반환
        } catch (Exception e) {
            e.printStackTrace();
            return "정보 없음";  // 예외 발생 시 기본 값 반환
        }
    }
}
