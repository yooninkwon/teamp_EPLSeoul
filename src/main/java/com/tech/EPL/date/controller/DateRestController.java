package com.tech.EPL.date.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tech.EPL.date.dto.DateDistDto;
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
	
	@GetMapping("/upload")
    public ResponseEntity<String> uploadFile() {
        try {
            // 파일 저장
            //String filename = "서울시 일반음식점 인허가 정보_py.csv";
            //File savedFile = new File("C:\\Users\\goott4\\Documents\\project2DB\\" + filename);           
            // 데이터 삽입
//            int insertedCount = dateFileInsertService.insertFileData(savedFile.getPath());

            return ResponseEntity.ok(insertedCount + " records inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("File upload failed.");
        }
    }
}
