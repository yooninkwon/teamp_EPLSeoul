package com.tech.EPL.metro.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchStationNameService implements ExecutionModel {

	private final ReturnApiDataService returnApiDataService;

	@Override
	public void execution(Model model) {
		ApiKeyConfig key = (ApiKeyConfig) model.getAttribute("apiKeyConfig");

		String searchValue = (String) model.getAttribute("searchValue");

		// 결과를 담을 Map 객체 생성
		List<Map> matchingRows = new ArrayList<>();

		// 지하철역 검색
		String searchUrl = "http://openapi.seoul.go.kr:8088/" + key.getSeoulMetroKey()
				+ "/json/subwayStationMaster/1/1000/";
		Map resultData = returnApiDataService.api(searchUrl).block();

		Map items = (Map) resultData.get("subwayStationMaster");

		List<Map> rows = (List<Map>) items.get("row");

		for (Map list : rows) {
			String bldnNm = (String) list.get("BLDN_NM");

			if (bldnNm != null && bldnNm.contains(searchValue)) {
				matchingRows.add(list); // 여러 개의 매칭된 row를 리스트에 저장
				System.out.println(bldnNm);
			}
		}

		model.addAttribute("list", matchingRows);

	}

}
