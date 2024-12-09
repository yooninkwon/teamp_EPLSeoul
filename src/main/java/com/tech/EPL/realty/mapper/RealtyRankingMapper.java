package com.tech.EPL.realty.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.realty.dto.RankingBuyingData;
import com.tech.EPL.realty.dto.RankingGrfeData;
import com.tech.EPL.realty.dto.RankingRentRtfeData;

@Mapper
public interface RealtyRankingMapper {
	
	ArrayList<RankingBuyingData> getBuyingRankingMax();
	ArrayList<RankingBuyingData> getBuyingRankingMin();
	
	ArrayList<RankingGrfeData> getRentRankingGrfeMax();
	ArrayList<RankingGrfeData> getRentRankingGrfeMin();
	
	ArrayList<RankingRentRtfeData> getRentRankingRtfeMax();
	ArrayList<RankingRentRtfeData> getRentRankingRtfeMin();
	
	ArrayList<RankingGrfeData> getJeonseRankingMax();
	ArrayList<RankingGrfeData> getJeonseRankingMin();
	
	
}
