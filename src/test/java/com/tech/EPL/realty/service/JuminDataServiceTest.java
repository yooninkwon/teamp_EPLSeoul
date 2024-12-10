package com.tech.EPL.realty.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.tech.EPL.realty.config.TestDataBuilder;
import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.mapper.RealtyJuminMapper;

class JuminDataServiceTest {
	
	@Mock
	private RealtyJuminMapper juminMapper;
	
	@InjectMocks
	private JuminDataService juminDataService;
	
	private RealtyJuminData juminData;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		juminData = TestDataBuilder.generateTestData(RealtyJuminData.class);
	}
	
	@Test
	@DisplayName("인구수 데이터 불러오는 코드 테스트")
	void getJuminDataTest() {
		ArrayList<RealtyJuminData> mockList = new ArrayList<>(List.of(juminData));
		
		when(juminMapper.getJuminData()).thenReturn(mockList);
		ArrayList<RealtyJuminData> response = juminDataService.execution().getBody();
		
		assertNotNull(response);
		assertEquals(response, mockList);
		
		verify(juminMapper).getJuminData();
	}
	

}
