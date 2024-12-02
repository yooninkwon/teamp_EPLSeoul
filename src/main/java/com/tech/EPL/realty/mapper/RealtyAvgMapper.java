package com.tech.EPL.realty.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RealtyAvgMapper {

	void insertBuyingMaxMinAvg(String guName, String buildingUse);

	void insertRentMaxMinAvg(String guName, String buildingUse);

	void insertJeonseMaxMinAvg(String guName, String buildingUse);
	
	void rentYearUpdate(String changeYear, String originalYear);

	void jeonseYearUpdate(String changeYear, String originalYear);

}