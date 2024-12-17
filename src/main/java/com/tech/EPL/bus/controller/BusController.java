package com.tech.EPL.bus.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.bus.dto.BlogPost;
import com.tech.EPL.bus.dto.BusDetails;
import com.tech.EPL.bus.dto.BusStationDataDto;
import com.tech.EPL.bus.service.BusArrivalService;
import com.tech.EPL.bus.service.BusDataService;
import com.tech.EPL.bus.service.BusDetailApiServece;
import com.tech.EPL.bus.service.BusStationService;
import com.tech.EPL.bus.service.NaverBlogService;
import com.tech.EPL.bus.service.PublicDataService;
import com.tech.EPL.config.ApiKeyConfig;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/epl")
@RequiredArgsConstructor
public class BusController {
	

	private final BusStationService busStationService;
	
	private final BusArrivalService busArrivalService;

	private final ApiKeyConfig apiKeyConfig;

	private final NaverBlogService naverBlogService;

	private final PublicDataService publicDataService;

	private final BusDetailApiServece busDetailService;
	
	private final BusDataService busDataService;
	

	@GetMapping("/busNearby")
	public String getNearbyPlaces(Model model) throws IOException {
		// 기존 API 키 및 기타 서비스 호출
		model.addAttribute("kakaoBus", apiKeyConfig.getKakaoBusKey());
		model.addAttribute("googleBusKey", apiKeyConfig.getGoogleBusKey());
		model.addAttribute("tmapBusKey", apiKeyConfig.getTmapBusKey());
		model.addAttribute("OpenBus", apiKeyConfig.getOpenBus());
		
		busStationService.execution(model);

		return "epl/busNearby";
	}
	
	
	
	
	// 버스 도착 정보 요청
	@RequestMapping("/getBusArrivalInfo")
	@ResponseBody
	public List<Map<String, String>> getBusArrivalInfo(@RequestParam("stationId") String stationId) {
	   System.out.println("stationId:"+stationId);
	    try {
	        // 서비스 호출하여 버스 도착 정보 가져오기
	        List<Map<String, String>> busList = busArrivalService.getBusArrivalInfo(stationId);
//	        System.out.println("busList:"+busList);
	      
	        return busList;
	    } catch (Exception e) {
	        // 예외 처리 (API 호출 실패 등)
	        Map<String, String> error = new HashMap<>();
	        error.put("errorMessage", "버스 정보를 가져오는 데 실패했습니다.");
	        return List.of(error);
	    }
	}
	
	
	


	@GetMapping("/getBlogPostsByPlace")
	@ResponseBody
	public List<BlogPost> getBlogPostsByPlace(@RequestParam String place, Model model) throws IOException {
		int display = 10; // 가져올 글의 개수
		
		return naverBlogService.getBlogPosts(place, display);
	}
	
	
    // 버스 번호를 통해 실시간 버스 위치 정보 가져오기
	@RequestMapping("/getBusDetails")
	public ResponseEntity<String> getBusDetails(@RequestParam String vehId1) throws JsonProcessingException {
	    System.out.println("버스 상세 정보 요청: " + vehId1);  // 요청 받은 vehId1 확인
	    BusDetails busDetails = busDetailService.getBusDetails(vehId1);

	    if (busDetails == null) {
	        System.out.println("버스 상세 정보 없음: " + vehId1);  // 데이터가 없는 경우 확인
	        return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("{}");  // 빈 JSON 반환
	    }

	    System.out.println("버스 상세 정보 반환: " + busDetails);  // 반환되는 busDetails 객체 확인
	    return ResponseEntity.ok(new ObjectMapper().writeValueAsString(busDetails));  // 정상 응답
	}
	
	



    @RequestMapping("/busStopData")
    @ResponseBody
    public List<BusStationDataDto> getBusStopData(@RequestParam("stationId") int busStopId) {
        return busDataService.getHourlyBoardingData(busStopId);
    }
	
	
		



    
    

}
