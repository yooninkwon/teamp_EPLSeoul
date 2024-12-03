package com.tech.EPL.date.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tech.EPL.date.dto.DateDistDto;
import com.tech.EPL.date.dto.DateRestaurantDto;
import com.tech.EPL.date.mapper.DateMapper;
import com.tech.EPL.date.service.DateFileInsertService;

import lombok.Getter;

@RestController
@RequestMapping("/epl/date")
public class DateRestController {
	
	@Autowired
	private DateMapper dateMapper;
	
	@Autowired
	private DateFileInsertService dateFileInsertService;
	
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
	        @RequestParam(defaultValue = "20") int size // 페이지당 데이터 수
	) {
	    int offset = page * size; // 시작 위치 계산
	    return dateMapper.restaurantList(distname, offset, size);
	}
}









