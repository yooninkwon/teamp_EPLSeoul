package com.tech.EPL.realty.service.group;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.tech.EPL.realty.config.TestDataBuilder;
import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.service.GuAvgData;
import com.tech.EPL.realty.service.JuminDataService;
import com.tech.EPL.realty.service.RankingData;
import com.tech.EPL.realty.service.RealtyYearsAvgData;
import com.tech.EPL.realty.service.YearsGuUpDownData;

class GettingDBGroupTest {

	@Mock
	private RealtyYearsAvgData realtyYearsAvgData;

	@Mock
	private GuAvgData guAvgData;

	@Mock
	private RankingData rankingData;

	@Mock
	private YearsGuUpDownData yearsGuUpDownData;

	@Mock
	private JuminDataService juminDataService;

	@InjectMocks
	private GettingDBGroup gettingGroup;

	private Map<String, Object> mockData1 = Map.of("key1", "value1", "key2", "value2");
	private Map<String, Object> mockData2 = Map.of("keyA", "valueA", "keyB", "valueB");
	private Map<String, Object> mockData3 = Map.of("keyQ", "valueQ", "keyW", "valueW");
	private Map<String, Object> mockData4 = Map.of("key9", "value9", "key0", "value0");
	private Map<String, Object> mockData5 = Map.of("map1", mockData1, "map2", mockData2, "map3", mockData3, "map4",
			mockData4);

	RealtyJuminData juminData = TestDataBuilder.generateTestData(RealtyJuminData.class);
	ArrayList<RealtyJuminData> mockDataList = new ArrayList<>(List.of(juminData));

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("연간 매매전세월세 데이터 호출 테스트")
	void getYearsAvgDataTest() {
		when(realtyYearsAvgData.execution()).thenReturn(ResponseEntity.ok(mockData1));

		ResponseEntity<Map<String, Object>> response = gettingGroup.getYearsAvgData();

		assertNotNull(response);
		assertEquals("value1", response.getBody().get("key1"));
		assertEquals("value2", response.getBody().get("key2"));

		verify(realtyYearsAvgData, times(1)).execution();
	}

	@Test
	@DisplayName("연간 자치구 데이터 호출 테스트")
	void getGuDataTest() {
		when(guAvgData.execution()).thenReturn(ResponseEntity.ok(mockData1));

		ResponseEntity<Map<String, Object>> response1 = gettingGroup.getGuData("apt");
		ResponseEntity<Map<String, Object>> response2 = gettingGroup.getGuData("single");
		ResponseEntity<Map<String, Object>> response3 = gettingGroup.getGuData("multi");
		ResponseEntity<Map<String, Object>> response4 = gettingGroup.getGuData("office");

		assertNotNull(response1);
		assertEquals("value1", response1.getBody().get("key1"));
		assertEquals("value2", response1.getBody().get("key2"));

		assertNotNull(response2);
		assertEquals("value1", response2.getBody().get("key1"));
		assertEquals("value2", response2.getBody().get("key2"));

		assertNotNull(response3);
		assertEquals("value1", response3.getBody().get("key1"));
		assertEquals("value2", response3.getBody().get("key2"));

		assertNotNull(response4);
		assertEquals("value1", response4.getBody().get("key1"));
		assertEquals("value2", response4.getBody().get("key2"));

		verify(guAvgData, times(4)).execution();
	}

	@Test
	@DisplayName("자치구 실거래가 랭킹 데이터 호출")
	void getRankingDataTest() {
		when(rankingData.execution()).thenReturn(ResponseEntity.ok(mockData4));

		ResponseEntity<Map<String, Object>> response = gettingGroup.getRankingData();

		assertNotNull(response);
		assertEquals("value9", response.getBody().get("key9"));
		assertEquals("value0", response.getBody().get("key0"));
		verify(rankingData, times(1)).execution();
	}

	@Test
	@DisplayName("연간 자치구 실거래가 등락 데이터 호출")
	void getYearsGuUpDownDataTest() {
		when(yearsGuUpDownData.execution()).thenReturn(ResponseEntity.ok(mockData5));

		ResponseEntity<Map<String, Object>> response = gettingGroup.getYearsGuUpDownData();

		assertNotNull(response);
		assertEquals(mockData1, response.getBody().get("map1"));
		assertEquals(mockData2, response.getBody().get("map2"));
		assertEquals(mockData3, response.getBody().get("map3"));
		assertEquals(mockData4, response.getBody().get("map4"));
		verify(yearsGuUpDownData, times(1)).execution();
	}

	@Test
	@DisplayName("인구수 데이터 호출")
	void getJuminDataTest() {
		when(juminDataService.execution()).thenReturn(ResponseEntity.ok(mockDataList));

		ResponseEntity<ArrayList<RealtyJuminData>> response = gettingGroup.getJuminData();

		assertNotNull(response);
		assertEquals(juminData, response.getBody().get(0));
		verify(juminDataService, times(1)).execution();
	}
}
