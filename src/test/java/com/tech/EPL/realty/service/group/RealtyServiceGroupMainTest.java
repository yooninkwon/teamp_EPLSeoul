package com.tech.EPL.realty.service.group;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
import com.tech.EPL.realty.enums.DongName;
import com.tech.EPL.realty.enums.GuName;

class RealtyServiceGroupMainTest {
	
	@InjectMocks
	private RealtyServiceGroupMain serviceGroupMain;
	
	@Mock
	private RealtyDBInsertGroup dbInsertGroup;

	@Mock
	private UsingEnumGroup usingEnumGroup;

	@Mock
	private GettingDBGroup getDatabaseGroup;
	
	private Map<String, Object> mockData1 = Map.of("key1", "value1", "key2", "value2");
	private Map<String, Object> mockData2 = Map.of("keyA", "valueA", "keyB", "valueB");
	private Map<String, Object> mockData3 = Map.of("keyQ", "valueQ", "keyW", "valueW");
	private Map<String, Object> mockData4 = Map.of("key9", "value9", "key0", "value0");
	private Map<String, Object> mockData5 = Map.of("map1", mockData1, 
													"map2", mockData2, 
													"map3", mockData3, 
													"map4", mockData4);
	
	RealtyJuminData juminData = TestDataBuilder.generateTestData(RealtyJuminData.class);
	ArrayList<RealtyJuminData> mockDataList = new ArrayList<>(List.of(juminData));
	
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
	
	@Test
	@DisplayName("연도별 매매월세전세 평균 데이터 호출 테스트")
	void getYearsAvgDataTest() {
		when(getDatabaseGroup.getYearsAvgData()).thenReturn(ResponseEntity.ok(mockData1));
		
		ResponseEntity<Map<String, Object>> response = serviceGroupMain.getYearsAvgData();
		
		assertNotNull(response);
		
		assertEquals("value1", response.getBody().get("key1"));
		assertEquals("value2", response.getBody().get("key2"));
		
		verify(getDatabaseGroup, times(1)).getYearsAvgData();
	}
	
	@Test
	@DisplayName("자치구 연도별 매매월세전세 평균 데이터 호출 테스트")
	void getGuDataTest() {
		when(getDatabaseGroup.getGuData("apt")).thenReturn(ResponseEntity.ok(mockData1));
		when(getDatabaseGroup.getGuData("single")).thenReturn(ResponseEntity.ok(mockData2));
		when(getDatabaseGroup.getGuData("multi")).thenReturn(ResponseEntity.ok(mockData3));
		when(getDatabaseGroup.getGuData("office")).thenReturn(ResponseEntity.ok(mockData4));
		
		ResponseEntity<Map<String, Object>> response1 = serviceGroupMain.getGuData("apt");
		ResponseEntity<Map<String, Object>> response2 = serviceGroupMain.getGuData("single");
		ResponseEntity<Map<String, Object>> response3 = serviceGroupMain.getGuData("multi");
		ResponseEntity<Map<String, Object>> response4 = serviceGroupMain.getGuData("office");
		
		assertNotNull(response1);
		assertEquals("value1", response1.getBody().get("key1"));
		assertEquals("value2", response1.getBody().get("key2"));
		
		assertNotNull(response2);
		assertEquals("valueA", response2.getBody().get("keyA"));
		assertEquals("valueB", response2.getBody().get("keyB"));
		
		assertNotNull(response3);
		assertEquals("valueQ", response3.getBody().get("keyQ"));
		assertEquals("valueW", response3.getBody().get("keyW"));
		
		assertNotNull(response4);
		assertEquals("value9", response4.getBody().get("key9"));
		assertEquals("value0", response4.getBody().get("key0"));		

		verify(getDatabaseGroup, times(1)).getGuData("apt");
		verify(getDatabaseGroup, times(1)).getGuData("single");
		verify(getDatabaseGroup, times(1)).getGuData("multi");
		verify(getDatabaseGroup, times(1)).getGuData("office");
	}
	
	@Test
	@DisplayName("자치구 실거래가 랭킹 데이터 호출")
	void getRankingDataTest() {
		when(getDatabaseGroup.getRankingData()).thenReturn(ResponseEntity.ok(mockData4));
		
		ResponseEntity<Map<String, Object>> response = serviceGroupMain.getRankingData();
		
		assertNotNull(response);
		
		assertEquals("value9", response.getBody().get("key9"));
		assertEquals("value0", response.getBody().get("key0"));
		
		verify(getDatabaseGroup, times(1)).getRankingData();
	}
	
	@Test
	@DisplayName("연도별 자치구 실거래가 등락추이 데이터 호출")
	void getYearsGuDataTest() {
		when(getDatabaseGroup.getYearsGuUpDownData()).thenReturn(ResponseEntity.ok(mockData5));
		
		ResponseEntity<Map<String, Object>> response = serviceGroupMain.getYearsGuUpDownData();
		
		assertNotNull(response);
		
		assertEquals(mockData1, response.getBody().get("map1"));
		assertEquals(mockData2, response.getBody().get("map2"));
		assertEquals(mockData3, response.getBody().get("map3"));
		assertEquals(mockData4, response.getBody().get("map4"));
		
		verify(getDatabaseGroup, times(1)).getYearsGuUpDownData();
	}
	
	@Test
	@DisplayName("인구수 데이터 호출")
	void getYearsJuminDataTest() {
		when(getDatabaseGroup.getJuminData()).thenReturn(ResponseEntity.ok(mockDataList));
		
		ResponseEntity<ArrayList<RealtyJuminData>> response = serviceGroupMain.getJuminData();
		
		assertNotNull(response);
		assertEquals(juminData, response.getBody().get(0));
		
		verify(getDatabaseGroup, times(1)).getJuminData();
	}
	
	@Test
	@DisplayName("동 코드로 조회 테스트")
	void searchDongCodeTest() {
		when(usingEnumGroup.findByDongCode(1234)).thenReturn(DongName.강남구개포동);
		DongName result = serviceGroupMain.searchDongCode(1234);
		
		assertNotNull(result);
		assertEquals(DongName.강남구개포동.getDongName(), result.getDongName());
	}
	
	@Test
	@DisplayName("동 이름으로 조회 테스트")
	void searchDongNameTest() {
		when(usingEnumGroup.findByDongName("aaa")).thenReturn(DongName.강남구개포동);
		DongName result = serviceGroupMain.searchDongName("aaa");
		
		assertNotNull(result);
		assertEquals(DongName.강남구개포동.getDongName(), result.getDongName());
	}
	
	@Test
	@DisplayName("구 코드로 조회 테스트")
	void searchGuCodeTest() {
		when(usingEnumGroup.findByGuCode(1234)).thenReturn(GuName.강남구);
		GuName result = serviceGroupMain.searchGuCode(1234);
		
		assertNotNull(result);
		assertEquals(GuName.강남구.getGuName(), result.getGuName());
	}
	
	@Test
	@DisplayName("구 이름으로 조회 테스트")
	void searchGuNameTest() {
		when(usingEnumGroup.findByGuName("aaa")).thenReturn(GuName.강남구);
		GuName result = serviceGroupMain.searchGuName("aaa");
		
		assertNotNull(result);
		assertEquals(GuName.강남구.getGuName(), result.getGuName());
	}
}
