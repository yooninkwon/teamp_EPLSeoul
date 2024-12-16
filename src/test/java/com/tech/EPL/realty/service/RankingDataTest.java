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
import com.tech.EPL.realty.dto.RankingBuyingData;
import com.tech.EPL.realty.dto.RankingGrfeData;
import com.tech.EPL.realty.dto.RankingRentRtfeData;
import com.tech.EPL.realty.mapper.RealtyRankingMapper;

class RankingDataTest {
	
	@Mock
	private RealtyRankingMapper rankingMapper;
	
	@InjectMocks
	RankingData rankingData;
	
	private RankingBuyingData rankingBuyingDataMax;
	private RankingGrfeData rankingRentGrfeDataMax;
	private RankingRentRtfeData rankingRentRtfeDataMax;
	private RankingGrfeData rankingJeonseGrfeDataMax;
	
	private RankingBuyingData rankingBuyingDataMin;
	private RankingGrfeData rankingRentGrfeDataMin;
	private RankingRentRtfeData rankingRentRtfeDataMin;
	private RankingGrfeData rankingJeonseGrfeDataMin;
	
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		
		rankingBuyingDataMax = TestDataBuilder.generateTestData(RankingBuyingData.class);
		rankingRentGrfeDataMax = TestDataBuilder.generateTestData(RankingGrfeData.class);
		rankingRentRtfeDataMax = TestDataBuilder.generateTestData(RankingRentRtfeData.class);
		rankingJeonseGrfeDataMax = TestDataBuilder.generateTestData(RankingGrfeData.class);
		rankingBuyingDataMin = TestDataBuilder.generateTestData(RankingBuyingData.class);
		rankingRentGrfeDataMin = TestDataBuilder.generateTestData(RankingGrfeData.class);
		rankingRentRtfeDataMin = TestDataBuilder.generateTestData(RankingRentRtfeData.class);
		rankingJeonseGrfeDataMin = TestDataBuilder.generateTestData(RankingGrfeData.class);
	}
	
	@Test
	@DisplayName("구 실거래가 랭킹 데이터 테스트")
	void getRankingDataTest() {
		
		ArrayList<RankingBuyingData> mockRankBuyingMax = new ArrayList<>(List.of(rankingBuyingDataMax));
		ArrayList<RankingBuyingData> mockRankBuyingMin = new ArrayList<>(List.of(rankingBuyingDataMin));
		
		ArrayList<RankingGrfeData> mockRankRentGrfeMax = new ArrayList<>(List.of(rankingRentGrfeDataMax));
		ArrayList<RankingGrfeData> mockRankRentGrfeMin = new ArrayList<>(List.of(rankingRentGrfeDataMin));
		
		ArrayList<RankingRentRtfeData> mockRankRentRtfeMax = new ArrayList<>(List.of(rankingRentRtfeDataMax));
		ArrayList<RankingRentRtfeData> mockRankRentRtfeMin = new ArrayList<>(List.of(rankingRentRtfeDataMin));
		
		ArrayList<RankingGrfeData> mockRankJeonseMax = new ArrayList<>(List.of(rankingJeonseGrfeDataMax));
		ArrayList<RankingGrfeData> mockRankJeonseMin = new ArrayList<>(List.of(rankingJeonseGrfeDataMin));
		
		when(rankingMapper.getBuyingRankingMax()).thenReturn(mockRankBuyingMax);
		when(rankingMapper.getBuyingRankingMin()).thenReturn(mockRankBuyingMin);
		
		when(rankingMapper.getRentRankingGrfeMax()).thenReturn(mockRankRentGrfeMax);
		when(rankingMapper.getRentRankingGrfeMin()).thenReturn(mockRankRentGrfeMin);
		
		when(rankingMapper.getRentRankingRtfeMax()).thenReturn(mockRankRentRtfeMax);
		when(rankingMapper.getRentRankingRtfeMin()).thenReturn(mockRankRentRtfeMin);
		
		when(rankingMapper.getJeonseRankingMax()).thenReturn(mockRankJeonseMax);
		when(rankingMapper.getJeonseRankingMin()).thenReturn(mockRankJeonseMin);
		
		Map<String, Object> response = rankingData.execution().getBody();
		
		assertNotNull(response);
		
		assertEquals(response.get("rank_buyMax"), mockRankBuyingMax);
		assertEquals(response.get("rank_buyMin"), mockRankBuyingMin);

		assertEquals(response.get("rank_rentGrfeMax"), mockRankRentGrfeMax);
		assertEquals(response.get("rank_rentGrfeMin"), mockRankRentGrfeMin);
		
		assertEquals(response.get("rank_rentRtfeMax"), mockRankRentRtfeMax);
		assertEquals(response.get("rank_rentRtfeMin"), mockRankRentRtfeMin);
		
		assertEquals(response.get("rank_jeonseMax"), mockRankJeonseMax);
		assertEquals(response.get("rank_jeonseMin"), mockRankJeonseMin);
		
		verify(rankingMapper).getBuyingRankingMax();
		verify(rankingMapper).getBuyingRankingMin();
		
		verify(rankingMapper).getRentRankingGrfeMax();
		verify(rankingMapper).getRentRankingGrfeMin();

		verify(rankingMapper).getRentRankingRtfeMax();
		verify(rankingMapper).getRentRankingRtfeMin();
		
		verify(rankingMapper).getJeonseRankingMax();
		verify(rankingMapper).getJeonseRankingMin();
	}

}
