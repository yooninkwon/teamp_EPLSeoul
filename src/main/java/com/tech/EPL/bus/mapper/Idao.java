package com.tech.EPL.bus.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.bus.dto.BusStationDataDto;
import com.tech.EPL.bus.dto.BusStationDto;

@Mapper
public interface Idao {

	public ArrayList<BusStationDto> busStation ();

	public  List<BusStationDataDto> selectHourlyBoardingData(int busStopId);
	
	public BusStationDto busStationName (String node_id);
}
