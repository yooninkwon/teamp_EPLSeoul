package com.tech.EPL.date.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
	
	@GetMapping("/kakao-api-key")
	public ResponseEntity<Map<String, String>> getKaKaoApiKey() {
	    Map<String, String> response = new HashMap<>();
	    response.put("kakaoRestApiKey", apiKeyConfig.getKakaoDateKey());
	    response.put("kakaoJSApiKey", apiKeyConfig.getKakaoJSDateKey());
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
	
	@GetMapping("/place/details")
	public ResponseEntity<?> getPlaceDetails(@RequestParam("place_id") String placeId) {
	    try {
	        // Google Places Details API 호출
	        String detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json" +
	                            "?place_id=" + placeId +
	                            "&fields=website,photos,rating,user_ratings_total,formatted_address" +
	                            "&language=ko" + // 한글 설정 추가
	                            "&key=" + apiKeyConfig.getGoogleDateKey();

	        RestTemplate restTemplate = new RestTemplate();
	        ResponseEntity<String> response = restTemplate.getForEntity(detailsUrl, String.class);

	        // 응답 데이터 파싱
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode root = objectMapper.readTree(response.getBody());
	        JsonNode result = root.path("result");
	        JsonNode photos = result.path("photos");
	        JsonNode addressNode = result.path("formatted_address");
	        String website = result.path("website").asText(null);
	        String formattedAddress = addressNode.asText(null); // 주소가 없을 경우 null 반환

	        String photoUrl = null;

	        // 사진 정보 처리
	        if (photos.isArray() && photos.size() > 0) {
	            // 첫 번째 photo_reference 추출
	            String photoReference = photos.get(0).path("photo_reference").asText();

	            // Google Places Photo API URL 생성
	            photoUrl = "https://maps.googleapis.com/maps/api/place/photo" +
	                       "?maxwidth=400" +
	                       "&photoreference=" + photoReference +
	                       "&key=" + apiKeyConfig.getGoogleDateKey();
	        }
	        
	     // 별점 및 리뷰 개수
	        double rating = result.path("rating").asDouble(0.0); // 기본값 0.0
	        int userRatingsTotal = result.path("user_ratings_total").asInt(0); // 기본값 0

	        // 반환할 데이터 생성
	        Map<String, Object> resultMap = new HashMap<>();
	        resultMap.put("photoUrl", photoUrl);
	        resultMap.put("website", website);
	        resultMap.put("rating", rating);
	        resultMap.put("userRatingsTotal", userRatingsTotal);
	        resultMap.put("formattedAddress", formattedAddress);

	        return ResponseEntity.ok(resultMap); // 데이터 반환

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Google Places Details API 요청 실패: " + e.getMessage());
	    }
	}
	
	@PostMapping("/addCourse")
	public Map<String, Object> saveCourse(@RequestBody Map<String, String> courseData, HttpSession session) {
	    Integer courseCount = (Integer) session.getAttribute("courseCount");
	    if (courseCount == null) {
	        courseCount = 0;
	    }

	    String name = courseData.get("name");
	    String address = courseData.get("address");

	    // 중복 여부 확인
	    if (session.getAttribute("course_" + name) != null) {
	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "이미 추가된 코스입니다.");
	        response.put("courseCount", courseCount);
	        return response;
	    }

	    // 최대 개수 제한
	    if (courseCount >= 5) {
	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "코스는 10개까지만 가능합니다.");
	        response.put("courseCount", courseCount);
	        return response;
	    }

	    // 코스카운트를 활용한 순서 저장
	    courseCount++;
	    session.setAttribute("courseCount", courseCount);
	    session.setAttribute("course_" + courseCount, Map.of("name", name, "address", address));

	    Map<String, Object> response = new HashMap<>();
	    response.put("message", "코스 추가 성공");
	    response.put("courseCount", courseCount);
	    return response;
	}
	
	@GetMapping("/getCourseCount")
	public Map<String, Object> getCourses(HttpSession session) {
	    Map<String, Object> response = new HashMap<>();

	    // 세션에서 모든 코스 데이터 가져오기
	    session.getAttributeNames().asIterator().forEachRemaining(attr -> {
	        if (attr.startsWith("course_")) {
	            response.put(attr.substring(7), session.getAttribute(attr)); // "course_" 제거
	        }
	    });
	    // 코스카운트 포함
	    Integer courseCount = (Integer) session.getAttribute("courseCount");
	    response.put("courseCount", courseCount != null ? courseCount : 0);

	    return response;
	}
	
	@GetMapping("/getCourseInfo")
	public List<Map<String, String>> getCourseInfo(HttpSession session) {
	    Integer courseCount = (Integer) session.getAttribute("courseCount");
	    if (courseCount == null || courseCount == 0) {
	        return Collections.emptyList(); // 코스가 없으면 빈 리스트 반환
	    }

	    List<Map<String, String>> courseList = new ArrayList<>();
	    for (int i = 1; i <= courseCount; i++) {
	        Map<String, String> course = (Map<String, String>) session.getAttribute("course_" + i);
	        if (course != null) {
	            courseList.add(course);
	        }
	    }

	    return courseList;
	}
	
	@PostMapping("/updateCourseOrder")
	public String updateCourseOrder(@RequestBody List<Map<String, String>> updatedOrder, HttpSession session) {
	    session.getAttributeNames().asIterator().forEachRemaining(attr -> {
	        if (attr.startsWith("course_")) {
	            session.removeAttribute(attr);
	        }
	    });

	    // 새로운 순서로 세션 데이터 저장
	    int index = 1;
	    for (Map<String, String> course : updatedOrder) {
	        session.setAttribute("course_" + index, course);
	        index++;
	    }

	    session.setAttribute("courseCount", updatedOrder.size());
	    return "Order updated successfully";
	}
	
	@PostMapping("/setStartAddress")
    public String setStartAddress(@RequestBody Map<String, String> requestData, HttpSession session) {
        session.setAttribute("startAddress", requestData.get("address"));
        return "Start address saved";
    }
	
	@GetMapping("/getRouteData")
	public Map<String, Object> getRouteData(HttpSession session) {
	    String startAddress = (String) session.getAttribute("startAddress");
	    Integer courseCount = (Integer) session.getAttribute("courseCount");

	    // 코스 데이터를 웨이포인트 리스트로 변환
	    List<String> waypoints = new ArrayList<>();
	    if (courseCount != null && courseCount > 0) {
	        for (int i = 1; i <= courseCount; i++) {
	            Map<String, String> course = (Map<String, String>) session.getAttribute("course_" + i);
	            if (course != null) {
	                waypoints.add(course.get("address")); // 웨이포인트로 주소 추가
	                // waypoints.add(course.get("name")); // 웨이포인트로 이름 추가
	                System.out.println(waypoints);
	            }
	        }
	    }

	    // 응답 데이터 구성
	    Map<String, Object> response = new HashMap<>();
	    response.put("startAddress", startAddress);
	    response.put("waypoints", waypoints); // 코스 데이터가 변환된 웨이포인트
	    return response;
	}
	
	@PostMapping("/deleteCourse")
	public String deleteCourse(@RequestBody Map<String, Integer> request, HttpSession session) {
	    Integer indexToDelete = request.get("index");
	    Integer courseCount = (Integer) session.getAttribute("courseCount");

	    if (courseCount != null && indexToDelete < courseCount) {
	        // 기존 course 삭제
	        session.removeAttribute("course_" + (indexToDelete + 1));

	        // 이후 코스 재정렬
	        for (int i = indexToDelete + 1; i < courseCount; i++) {
	            Map<String, String> course = (Map<String, String>) session.getAttribute("course_" + (i + 1));
	            session.setAttribute("course_" + i, course);
	        }

	        session.removeAttribute("course_" + courseCount); // 마지막 중복된 course 제거
	        session.setAttribute("courseCount", courseCount - 1);
	    }
	    return "Course deleted and updated successfully";
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









