package com.tech.EPL.realty.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
import com.tech.EPL.realty.dto.YearsStatGuBuying;
import com.tech.EPL.realty.dto.YearsStatGuJeonse;
import com.tech.EPL.realty.dto.YearsStatGuRent;
import com.tech.EPL.realty.mapper.RealtyYearsMapper;

class YearsGuUpDownDataTest {

	@Mock
	private RealtyYearsMapper yearsMapper;

	@InjectMocks
	private YearsGuUpDownData yearsGuData;

	private YearsStatGuBuying yearsStatGuBuyingApt;
	private YearsStatGuBuying yearsStatGuBuyingSingle;
	private YearsStatGuBuying yearsStatGuBuyingMulti;
	private YearsStatGuBuying yearsStatGuBuyingOffice;

	private YearsStatGuRent yearsStatGuRentApt;
	private YearsStatGuRent yearsStatGuRentSingle;
	private YearsStatGuRent yearsStatGuRentMulti;
	private YearsStatGuRent yearsStatGuRentOffice;

	private YearsStatGuJeonse yearsStatGuJeonseApt;
	private YearsStatGuJeonse yearsStatGuJeonseSingle;
	private YearsStatGuJeonse yearsStatGuJeonseMulti;
	private YearsStatGuJeonse yearsStatGuJeonseOffice;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		
		yearsStatGuBuyingApt = TestDataBuilder.generateTestData(YearsStatGuBuying.class);
		yearsStatGuBuyingSingle = TestDataBuilder.generateTestData(YearsStatGuBuying.class);
		yearsStatGuBuyingMulti = TestDataBuilder.generateTestData(YearsStatGuBuying.class);
		yearsStatGuBuyingOffice = TestDataBuilder.generateTestData(YearsStatGuBuying.class);

		yearsStatGuRentApt = TestDataBuilder.generateTestData(YearsStatGuRent.class);
		yearsStatGuRentSingle = TestDataBuilder.generateTestData(YearsStatGuRent.class);
		yearsStatGuRentMulti = TestDataBuilder.generateTestData(YearsStatGuRent.class);
		yearsStatGuRentOffice = TestDataBuilder.generateTestData(YearsStatGuRent.class);
		
		yearsStatGuJeonseApt = TestDataBuilder.generateTestData(YearsStatGuJeonse.class);
		yearsStatGuJeonseSingle = TestDataBuilder.generateTestData(YearsStatGuJeonse.class);
		yearsStatGuJeonseMulti = TestDataBuilder.generateTestData(YearsStatGuJeonse.class);
		yearsStatGuJeonseOffice = TestDataBuilder.generateTestData(YearsStatGuJeonse.class);
	}

	@Test
	@DisplayName("연도별 자치구 매매전세월세 평균가 데이터베이스 호출 테스트")
	void getYearsGuDataTest() {
		
		ArrayList<YearsStatGuBuying> mockGuBuyingApt = new ArrayList<>(List.of(yearsStatGuBuyingApt));
		ArrayList<YearsStatGuBuying> mockGuBuyingSingle = new ArrayList<>(List.of(yearsStatGuBuyingSingle));
		ArrayList<YearsStatGuBuying> mockGuBuyingMulti = new ArrayList<>(List.of(yearsStatGuBuyingMulti));
		ArrayList<YearsStatGuBuying> mockGuBuyingOffice = new ArrayList<>(List.of(yearsStatGuBuyingOffice));
		
		ArrayList<YearsStatGuRent> mockGuRentApt = new ArrayList<>(List.of(yearsStatGuRentApt));
		ArrayList<YearsStatGuRent> mockGuRentSingle = new ArrayList<>(List.of(yearsStatGuRentSingle));
		ArrayList<YearsStatGuRent> mockGuRentMulti = new ArrayList<>(List.of(yearsStatGuRentMulti));
		ArrayList<YearsStatGuRent> mockGuRentOffice = new ArrayList<>(List.of(yearsStatGuRentOffice));
		
		ArrayList<YearsStatGuJeonse> mockGuJeonseApt = new ArrayList<>(List.of(yearsStatGuJeonseApt));
		ArrayList<YearsStatGuJeonse> mockGuJeonseSingle = new ArrayList<>(List.of(yearsStatGuJeonseSingle));
		ArrayList<YearsStatGuJeonse> mockGuJeonseMulti = new ArrayList<>(List.of(yearsStatGuJeonseMulti));
		ArrayList<YearsStatGuJeonse> mockGuJeonseOffice = new ArrayList<>(List.of(yearsStatGuJeonseOffice));
		
		when(yearsMapper.getYearsBuyingApt()).thenReturn(mockGuBuyingApt);
		when(yearsMapper.getYearsBuyingSingle()).thenReturn(mockGuBuyingSingle);
		when(yearsMapper.getYearsBuyingMulti()).thenReturn(mockGuBuyingMulti);
		when(yearsMapper.getYearsBuyingOffice()).thenReturn(mockGuBuyingOffice);
		
		when(yearsMapper.getYearsRentApt()).thenReturn(mockGuRentApt);
		when(yearsMapper.getYearsRentSingle()).thenReturn(mockGuRentSingle);
		when(yearsMapper.getYearsRentMulti()).thenReturn(mockGuRentMulti);
		when(yearsMapper.getYearsRentOffice()).thenReturn(mockGuRentOffice);
		
		when(yearsMapper.getYearsJeonseApt()).thenReturn(mockGuJeonseApt);
		when(yearsMapper.getYearsJeonseSingle()).thenReturn(mockGuJeonseSingle);
		when(yearsMapper.getYearsJeonseMulti()).thenReturn(mockGuJeonseMulti);
		when(yearsMapper.getYearsJeonseOffice()).thenReturn(mockGuJeonseOffice);
		
		Map<String, Object> response = yearsGuData.execution().getBody();
		
		assertNotNull(response);
		
		assertEquals(response.get("buying_apt"), mockGuBuyingApt);
		assertEquals(response.get("buying_single"), mockGuBuyingSingle);
		assertEquals(response.get("buying_multi"), mockGuBuyingMulti);
		assertEquals(response.get("buying_office"), mockGuBuyingOffice);
		
		assertEquals(response.get("rent_apt"), mockGuRentApt);
		assertEquals(response.get("rent_single"), mockGuRentSingle);
		assertEquals(response.get("rent_multi"), mockGuRentMulti);
		assertEquals(response.get("rent_office"), mockGuRentOffice);
		
		assertEquals(response.get("jeonse_apt"), mockGuJeonseApt);
		assertEquals(response.get("jeonse_single"), mockGuJeonseSingle);
		assertEquals(response.get("jeonse_multi"), mockGuJeonseMulti);
		assertEquals(response.get("jeonse_office"), mockGuJeonseOffice);
		
		verify(yearsMapper).getYearsBuyingApt();
		verify(yearsMapper).getYearsBuyingSingle();
		verify(yearsMapper).getYearsBuyingMulti();
		verify(yearsMapper).getYearsBuyingOffice();
		
		verify(yearsMapper).getYearsRentApt();
		verify(yearsMapper).getYearsRentSingle();
		verify(yearsMapper).getYearsRentMulti();
		verify(yearsMapper).getYearsRentOffice();
		
		verify(yearsMapper).getYearsJeonseApt();
		verify(yearsMapper).getYearsJeonseSingle();
		verify(yearsMapper).getYearsJeonseMulti();
		verify(yearsMapper).getYearsJeonseOffice();
		
	}

}
