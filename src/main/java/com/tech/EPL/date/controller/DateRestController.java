package com.tech.EPL.date.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.EPL.date.dto.DateDistDto;
import com.tech.EPL.date.mapper.DateMapper;

@RestController
@RequestMapping("/epl/date")
public class DateRestController {
	
	
	@Autowired
	private DateMapper dateMapper;
	
	@GetMapping("/dist_info")
	public ResponseEntity<DateDistDto> getDistrictInfo(@RequestParam String distname) {
		String name = "";
		if (distname.equals("Gangnam-gu")) {name = "강남구";}
		if (distname.equals("Gangbuk-gu")) {name = "강북구";}
		if (distname.equals("Gangdong-gu")) {name = "강동구";}
		if (distname.equals("Gangseo-gu")) {name = "강서구";}
		if (distname.equals("Gwanak-gu")) {name = "관악구";}
		if (distname.equals("Gwangjin-gu")) {name = "광진구";}
		if (distname.equals("Guro-gu")) {name = "구로구";}
		if (distname.equals("Geumcheon-gu")) {name = "금천구";}
		if (distname.equals("Nowon-gu")) {name = "노원구";}
		if (distname.equals("Dobong-gu")) {name = "도봉구";}
		if (distname.equals("Dongdaemun-gu")) {name = "동대문구";}
		if (distname.equals("Dongjak-gu")) {name = "동작구";}
		if (distname.equals("Mapo-gu")) {name = "마포구";}
		if (distname.equals("Seodaemun-gu")) {name = "서대문구";}
		if (distname.equals("Seocho-gu")) {name = "서초구";}
		if (distname.equals("Seongdong-gu")) {name = "성동구";}
		if (distname.equals("Seongbuk-gu")) {name = "성북구";}
		if (distname.equals("Songpa-gu")) {name = "송파구";}
		if (distname.equals("Yangcheon-gu")) {name = "양천구";}
		if (distname.equals("Yeongdeungpo-gu_1_")) {name = "영등포구";}
		if (distname.equals("Yongsan-gu")) {name = "용산구";}
		if (distname.equals("Eunpyeong-gu")) {name = "은평구";}
		if (distname.equals("Jongno-gu")) {name = "종로구";}
		if (distname.equals("Jung-gu")) {name = "중구";}
		if (distname.equals("Jungnang-gu")) {name = "중랑구";}
		DateDistDto dist = dateMapper.getDistrictInfo(name);
		return ResponseEntity.ok(dist);
	}
	
	
}
