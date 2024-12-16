package com.tech.EPL.metro.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchStationNameService implements ExecutionModel {
	private final CacheService cacheService;
	private final CacheManager cacheManager;
	

	@Override
	public void execution(Model model) {
		System.out.println(cacheManager.getCache("stationInfo"));
		String searchValue = (String) model.getAttribute("searchValue");

		// 결과를 담을 Map 객체 생성
		List<Map> matchingRows = new ArrayList<>();

		
		
		// 지하철역 검색
		List<Map> rows = cacheService.getAllStaionInfo();
		
		for (Map list : rows) {
			String bldnNm = (String) list.get("BLDN_NM");

			if (bldnNm != null && bldnNm.contains(searchValue)) {
				matchingRows.add(list); // 여러 개의 매칭된 row를 리스트에 저장
				
			}
		}

		model.addAttribute("list", matchingRows);

	}

	


}
