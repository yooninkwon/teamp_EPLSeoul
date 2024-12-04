package com.tech.EPL.metro.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.interfaces.ExecutionModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LostFoundService implements ExecutionModel{

	private final ReturnApiDataService returnApiDataService;
	
	@Override
	public void execution(Model model) {
		
		ApiKeyConfig key = (ApiKeyConfig) model.getAttribute("apiKeyConfig");
		String lostItemKey = key.getLostItemMetroKey();
		String stationValue = (String) model.getAttribute("stationValue");
		String lostItemValue = (String) model.getAttribute("lostItemValue");
		
		List<Map> data = new ArrayList<>();
		List<Map> lostItems = null;
	    // lostItemData가 반환하는 List<Map>의 요소를 data에 개별적으로 추가
		try {
			lostItems = lostItemData(stationValue, lostItemValue, lostItemKey);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    data.addAll(lostItems);
		
		model.addAttribute("data",data);
		
	}
	
	//분실물 찾기 api연결
	public List<Map> lostItemData(String stationValue, String lostItemValue, String lostItemKey) throws UnsupportedEncodingException{
		
        // URLEncoder.encode를 한 번만 적용하여 인코딩
        String encodedLostItemValue = URLEncoder.encode(lostItemValue, "UTF-8");
        String encodedStationValue = URLEncoder.encode(stationValue, "UTF-8");
		
		
		String url = "https://apis.data.go.kr/1320000/LosPtfundInfoInqireService/getPtLosfundInfoAccTpNmCstdyPlace?"
				+ "serviceKey="	+ lostItemKey 
				+"&pageNo=1&numOfRows=10000"
				+ "&PRDT_NM=" + encodedLostItemValue
				+ "&DEP_PLACE=" + encodedStationValue;
		
		JSONObject resultData = XML.toJSONObject(returnApiDataService.xmlApi(url).block());
		Map result = resultData.toMap();
		
		if (result == null || result.get("response") == null) {
	        // 응답이 없거나 CardSubwayStatsNew가 없으면 빈 리스트 반환
	        return List.of();
	    }
		
		
		Map response = (Map) result.get("response");
		Map body = (Map) response.get("body");
		Map items = (Map) body.get("items");
		List<Map> item = (List<Map>) items.get("item");
		
		
		return item != null ? item : List.of();
		
	}
	
	
}
