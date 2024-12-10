package com.tech.EPL.realty.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.tech.EPL.realty.enums.BuildingUseName;
import com.tech.EPL.realty.enums.GuName;
import com.tech.EPL.realty.mapper.RealtyAvgMapper;

class InsertDataAVGTest {

	@Mock
	private RealtyAvgMapper avgMapper;

	@InjectMocks
	private InsertDataAVG insertDataAVG;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("부동산 실거래 데이터 전체 테이블 이용한 평균 테이블 데이터 삽입 테스트")
	void insertAvgTest() {
		insertDataAVG.execution(null);

		for (GuName guName : GuName.values()) {
			for (BuildingUseName buildingUse : BuildingUseName.values()) {
				verify(avgMapper).insertBuyingMaxMinAvg(guName.toString(), buildingUse.toString());
				verify(avgMapper).insertRentMaxMinAvg(guName.toString(), buildingUse.toString());
				verify(avgMapper).insertJeonseMaxMinAvg(guName.toString(), buildingUse.toString());
			}
		}

		String[] changeYear = { 
				"2011", "2012", "2013", "2014", "2015",
				"2016", "2017", "2018", "2019", "2020", 
				"2021", "2022", "2023", "2024" };

		for (String year : changeYear) {
			verify(avgMapper).rentYearUpdate(year, "\"" + year);
			verify(avgMapper).jeonseYearUpdate(year, "\"" + year);
		}

		verifyNoMoreInteractions(avgMapper);

	}

}
