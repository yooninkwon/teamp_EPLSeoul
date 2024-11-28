package com.tech.EPL.metro.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.metro.dto.StationAmenitiesDto;
import com.tech.EPL.metro.dto.StationInfoDto;
import com.tech.EPL.metro.dto.StationNameHistoryDto;

@Mapper
public interface MetroMapper {

	StationInfoDto stationInfo(String stationName, String stationRoute);

	StationNameHistoryDto stationNameHistory(String stationName);

	StationAmenitiesDto stationAmenities(String stationId);

	
	
	
}
