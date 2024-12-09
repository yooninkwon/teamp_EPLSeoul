package com.tech.EPL.realty.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@WebMvcTest(ELPRealtyRestController.class)
public class EPLRealtyRestControllerTest {
	
	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	private RealtyServiceGroup serviceGroup;
	
	@Test
	@DisplayName("realty1 - 연간 실거래가 통계 test")
	void testGetYearsData() throws Exception {
		Map<String, Object> mockResponse = Map.of("2020", 100, "2021", 120);
		when(serviceGroup.getYearsAvgData()).thenReturn(ResponseEntity.ok(mockResponse));
		
		mockMvc.perform(get("/epl/years-data"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.2020", is(100)))
			.andExpect(jsonPath("$.2021", is(120)));
		
		verify(serviceGroup, times(1)).getYearsAvgData();
	}

	@Test
	@DisplayName("realty2 - 자치구별 실거래가 통계 test")
	void testGetGuData() throws Exception {
		Map<String, Object> mockResponse = Map.of("구로구", 100000, "은평구", 90000);
		when(serviceGroup.getGuData("apt")).thenReturn(ResponseEntity.ok(mockResponse));
		
		mockMvc.perform(get("/epl/gu-data?type=apt"))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.구로구", is(100000)))
		.andExpect(jsonPath("$.은평구", is(90000)));
		
		verify(serviceGroup, times(1)).getGuData("apt");
	}
	
	@Test
	@DisplayName("realty3 - 자치구 실거래가 랭킹 test")
	void testGetRankingData() throws Exception {
		Map<String, Object> mockResponse = Map.of("rank_buyMax", "은평구", "rank_buyMin", "구로구");
		when(serviceGroup.getRankingData()).thenReturn(ResponseEntity.ok(mockResponse));
		
		mockMvc.perform(get("/epl/rank-data"))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.rank_buyMax", is("은평구")))
		.andExpect(jsonPath("$.rank_buyMin", is("구로구")));
		
		verify(serviceGroup, times(1)).getRankingData();
	}
	
	@Test
	@DisplayName("realty4 - 자치구별 연간 실거래가 등락 test")
	void testGetYearsGuData() throws Exception {
		Map<String, Object> mockResponse = Map.of("Seoul", 500);
		when(serviceGroup.getYearsGuData()).thenReturn(ResponseEntity.ok(mockResponse));
		
		mockMvc.perform(get("/epl/years-gu-data"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.Seoul", is(500)));
		
		verify(serviceGroup, times(1)).getYearsGuData();
	}
	
	@Test
	@DisplayName("realty5 - 자치구별 연간 실거래가 등락 test")
	void testGetJuminData() throws Exception {
		ArrayList<RealtyJuminData> mockList = new ArrayList<>();
		RealtyJuminData data = new RealtyJuminData();
		
        data.setGu("은평구");
        data.setYear(2020);
        data.setJumin(1000000);
        
        mockList.add(data);
        
		when(serviceGroup.getJuminData()).thenReturn(ResponseEntity.ok(mockList));
		
		mockMvc.perform(get("/epl/jumin-data"))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$[0].gu", is("은평구")))
		.andExpect(jsonPath("$[0].year", is(2020)))
		.andExpect(jsonPath("$[0].jumin", is(1000000)));
		
		verify(serviceGroup, times(1)).getJuminData();
	}
	
	
}
