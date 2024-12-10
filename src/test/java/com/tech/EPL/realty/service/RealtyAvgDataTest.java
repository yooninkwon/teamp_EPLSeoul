package com.tech.EPL.realty.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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

import com.tech.EPL.realty.config.TestDataBuilder;
import com.tech.EPL.realty.dto.YearsStatBuying;
import com.tech.EPL.realty.dto.YearsStatJeonse;
import com.tech.EPL.realty.dto.YearsStatRent;
import com.tech.EPL.realty.mapper.RealtyMapper;

class RealtyAvgDataTest {

	@Mock
	private RealtyMapper realtyMapper;
	
	@InjectMocks
	private RealtyAvgData realtyAvgData;
	
	private YearsStatBuying yearsStatBuying;
	private YearsStatRent yearsStatRent;
	private YearsStatJeonse yearsStatJeonse;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		
		yearsStatBuying = TestDataBuilder.generateTestData(YearsStatBuying.class);
		yearsStatRent = TestDataBuilder.generateTestData(YearsStatRent.class);
		yearsStatJeonse = TestDataBuilder.generateTestData(YearsStatJeonse.class);
	}
	
	@Test
	@DisplayName("연도별 평균 데이터 테스트")
	void getYearsStatTest() {
		ArrayList<YearsStatBuying> mockStatBuying = new ArrayList<>(List.of(yearsStatBuying));
		ArrayList<YearsStatRent> mockStatRent = new ArrayList<>(List.of(yearsStatRent));
		ArrayList<YearsStatJeonse> mockStatJeonse = new ArrayList<>(List.of(yearsStatJeonse));
		
		when(realtyMapper.getYearsStatBuying()).thenReturn(mockStatBuying);
		when(realtyMapper.getYearsStatRent()).thenReturn(mockStatRent);
		when(realtyMapper.getYearsStatJeonse()).thenReturn(mockStatJeonse);
		
		Map<String, Object> response = realtyAvgData.execution().getBody();
		
		assertNotNull(response);

		assertEquals(mockStatBuying, response.get("buyingStat"));
		assertEquals(mockStatRent, response.get("rentStat"));
		assertEquals(mockStatJeonse, response.get("jeonseStat"));

		verify(realtyMapper).getYearsStatBuying();
		verify(realtyMapper).getYearsStatRent();
		verify(realtyMapper).getYearsStatJeonse();
		
	}

}
