package com.tech.EPL.realty.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RealtyAvgMapper {

	void insertAvgForBuyingByGuName(String guName, String buildingUse);
	
	void insertAvgForRentByGuName(String guName, String buildingUse);
	
	void insertAvgForJeonseByGuName(String guName, String buildingUse);

	void insertAvgForBuyingMaxByGuName(String guName, String buildingUse);

	void insertAvgForBuyingMinByGuName(String guName, String buildingUse);

	void insertAvgForRentMaxByGuName(String guName, String buildingUse);

	void insertAvgForRentMinByGuName(String guName, String buildingUse);

	void insertAvgForJeonseMaxByGuName(String guName, String buildingUse);

	void insertAvgForJeonseMinByGuName(String guName, String buildingUse);
	
}