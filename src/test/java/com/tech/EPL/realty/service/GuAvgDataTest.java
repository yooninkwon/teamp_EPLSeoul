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
import com.tech.EPL.realty.dto.GuStatBuying;
import com.tech.EPL.realty.dto.GuStatJeonse;
import com.tech.EPL.realty.dto.GuStatRent;
import com.tech.EPL.realty.mapper.RealtyMapper;

class GuAvgDataTest {

	@Mock
	private RealtyMapper realtyMapper;

	@InjectMocks
	private GuAvgData guAvgData;

	private GuStatBuying guBuyingData;
	private GuStatRent guRentData;
	private GuStatJeonse guJeonseData;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		guBuyingData = TestDataBuilder.generateTestData(GuStatBuying.class);
		guRentData = TestDataBuilder.generateTestData(GuStatRent.class);
		guJeonseData = TestDataBuilder.generateTestData(GuStatJeonse.class);
	}

	@Test
	@DisplayName("GuAvgData 타입 \"apt\" 테스트")
	void getGuDataAptTest() {
		guAvgData.setType("apt");

		ArrayList<GuStatBuying> mockBuyingList = new ArrayList<>(List.of(guBuyingData));
		ArrayList<GuStatRent> mockRentList = new ArrayList<>(List.of(guRentData));
		ArrayList<GuStatJeonse> mockJeonseList = new ArrayList<>(List.of(guJeonseData));

		when(realtyMapper.getGuAvgBuyingApt()).thenReturn(mockBuyingList);
		when(realtyMapper.getGuAvgRentApt()).thenReturn(mockRentList);
		when(realtyMapper.getGuAvgJeonseApt()).thenReturn(mockJeonseList);

		Map<String, Object> result = guAvgData.execution().getBody();

		assertNotNull(result);
		assertEquals(mockBuyingList, result.get("guAvgBuying"));
		assertEquals(mockRentList, result.get("guAvgRent"));
		assertEquals(mockJeonseList, result.get("guAvgJeonse"));

		verify(realtyMapper).getGuAvgBuyingApt();
		verify(realtyMapper).getGuAvgRentApt();
		verify(realtyMapper).getGuAvgJeonseApt();
	}

	@Test
	@DisplayName("GuAvgData 타입 \"single\" 테스트")
	void getGuDataSingleTest() {
		guAvgData.setType("single");

		ArrayList<GuStatBuying> mockBuyingList = new ArrayList<>(List.of(guBuyingData));
		ArrayList<GuStatRent> mockRentList = new ArrayList<>(List.of(guRentData));
		ArrayList<GuStatJeonse> mockJeonseList = new ArrayList<>(List.of(guJeonseData));

		when(realtyMapper.getGuAvgBuyingSingle()).thenReturn(mockBuyingList);
		when(realtyMapper.getGuAvgRentSingle()).thenReturn(mockRentList);
		when(realtyMapper.getGuAvgJeonseSingle()).thenReturn(mockJeonseList);

		Map<String, Object> result = guAvgData.execution().getBody();

		assertNotNull(result);
		assertEquals(mockBuyingList, result.get("guAvgBuying"));
		assertEquals(mockRentList, result.get("guAvgRent"));
		assertEquals(mockJeonseList, result.get("guAvgJeonse"));

		verify(realtyMapper).getGuAvgBuyingSingle();
		verify(realtyMapper).getGuAvgRentSingle();
		verify(realtyMapper).getGuAvgJeonseSingle();
	}

	@Test
	@DisplayName("GuAvgData 타입 \"multi\" 테스트")
	void getGuDataMultiTest() {
		guAvgData.setType("multi");

		ArrayList<GuStatBuying> mockBuyingList = new ArrayList<>(List.of(guBuyingData));
		ArrayList<GuStatRent> mockRentList = new ArrayList<>(List.of(guRentData));
		ArrayList<GuStatJeonse> mockJeonseList = new ArrayList<>(List.of(guJeonseData));

		when(realtyMapper.getGuAvgBuyingMulti()).thenReturn(mockBuyingList);
		when(realtyMapper.getGuAvgRentMulti()).thenReturn(mockRentList);
		when(realtyMapper.getGuAvgJeonseMulti()).thenReturn(mockJeonseList);

		Map<String, Object> result = guAvgData.execution().getBody();

		assertNotNull(result);
		assertEquals(mockBuyingList, result.get("guAvgBuying"));
		assertEquals(mockRentList, result.get("guAvgRent"));
		assertEquals(mockJeonseList, result.get("guAvgJeonse"));

		verify(realtyMapper).getGuAvgBuyingMulti();
		verify(realtyMapper).getGuAvgRentMulti();
		verify(realtyMapper).getGuAvgJeonseMulti();
	}

	@Test
	@DisplayName("GuAvgData 타입 \"office\" 테스트")
	void getGuDataOfficeTest() {
		guAvgData.setType("office");

		ArrayList<GuStatBuying> mockBuyingList = new ArrayList<>(List.of(guBuyingData));
		ArrayList<GuStatRent> mockRentList = new ArrayList<>(List.of(guRentData));
		ArrayList<GuStatJeonse> mockJeonseList = new ArrayList<>(List.of(guJeonseData));

		when(realtyMapper.getGuAvgBuyingOffice()).thenReturn(mockBuyingList);
		when(realtyMapper.getGuAvgRentOffice()).thenReturn(mockRentList);
		when(realtyMapper.getGuAvgJeonseOffice()).thenReturn(mockJeonseList);

		Map<String, Object> result = guAvgData.execution().getBody();

		assertNotNull(result);
		assertEquals(mockBuyingList, result.get("guAvgBuying"));
		assertEquals(mockRentList, result.get("guAvgRent"));
		assertEquals(mockJeonseList, result.get("guAvgJeonse"));

		verify(realtyMapper).getGuAvgBuyingOffice();
		verify(realtyMapper).getGuAvgRentOffice();
		verify(realtyMapper).getGuAvgJeonseOffice();
	}

}
