package com.tech.EPL.date.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.date.dto.DateDistDto;
import com.tech.EPL.date.dto.DateRestaurantDto;
import com.tech.EPL.date.mapper.DateMapper;
import com.tech.EPL.date.service.DateFileInsertService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/epl/date")
@RequiredArgsConstructor
public class DateRestController {
	
	@Autowired
	private DateMapper dateMapper;
	
	@Autowired
	private DateFileInsertService dateFileInsertService;
	
	private final ApiKeyConfig apiKeyConfig;
	
	@GetMapping("/dist_info")
	public ResponseEntity<DateDistDto> getDistrictInfo(@RequestParam String distname) {
		DateDistDto dist = dateMapper.getDistrictInfo(distname);
		return ResponseEntity.ok(dist);
	}
	
	// csv 데이터 DB 삽입용 코드
	@GetMapping("/upload")
    public ResponseEntity<String> uploadFile() {
        try {
            // 파일 저장
            String filename = "";
            File savedFile = new File("C:\\Users\\goott4\\Documents\\project2DB\\" + filename);           
            // 데이터 삽입
            int insertedCount = dateFileInsertService.insertFileData(savedFile.getPath());

            return ResponseEntity.ok(insertedCount + " records inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("File upload failed.");
        }
    }
	
	@GetMapping("/restaurant_info")
	public List<DateRestaurantDto> restaurantList(
	        @RequestParam String distname,
	        @RequestParam(defaultValue = "0") int page, // 요청한 페이지 번호
	        @RequestParam(defaultValue = "20") int size, // 페이지당 데이터 수
	        @RequestParam(required = false) String type, // 선택적 필터 타입
	        @RequestParam String searchType,
	        @RequestParam String searchKeyword
	) {
	    int offset = page * size; // 시작 위치 계산
	    String strType = type; // 기본적으로 요청한 type 사용

	    String st = "";
	    if (searchType.equals("가게명")) {st = "BUSINESS_NAME";} 
	    if (searchType.equals("주소")) {st = "STREET_ADDRESS";} 
	     
	    // type이 null이거나 빈 값이 아니면서 양식으로 요청된 경우 경양식 처리
	    if ("양식".equals(type)) {strType = "경양식";}
	    if ("중식".equals(type)) {strType = "중국식";}	    
	    
	    if (searchKeyword.equals("")) {
	    	return dateMapper.restaurantList(distname, offset, size, strType);
		} else {
			System.out.println(st);
			return dateMapper.searchRestaurantList(distname, offset, size, st, searchKeyword);
		}
	}
	
	@GetMapping("/api-key")
	public ResponseEntity<Map<String, String>> getApiKey() {
	    Map<String, String> response = new HashMap<>();
	    response.put("googleApiKey", apiKeyConfig.getGoogleDateKey());
	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/google-api/place")
    public ResponseEntity<?> getPlace(@RequestParam("input") String input) {
        try {
            // Google Places API URL 구성
            String url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json" +
                         "?input=" + input +
                         "&inputtype=textquery" +
                         "&fields=photos,rating,user_ratings_total,geometry" +
                         "&key=" + apiKeyConfig.getGoogleDateKey();

            // Google API 요청
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            return ResponseEntity.ok(response); // JSON 응답 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Google API 요청 실패: " + e.getMessage());
        }
    }
	
	
	
//	@GetMapping("/restaurant_search")
//	public List<DateRestaurantDto> searchRestaurants(
//			@RequestParam String distname,
//	        @RequestParam(defaultValue = "0") int page, // 요청한 페이지 번호
//	        @RequestParam(defaultValue = "20") int size, // 페이지당 데이터 수
//	        @RequestParam String filter, // 검색 필터: 가게명/주소
//	        @RequestParam String query  // 검색어
//	) {
//	    if ("가게명".equals(filter)) {
//	        return dateMapper.searchByName(query);
//	    } else if ("주소".equals(filter)) {
//	        return dateMapper.searchByAddress(query);
//	    } else {
//	        throw new IllegalArgumentException("잘못된 검색 조건입니다.");
//	    }
//	}
}









