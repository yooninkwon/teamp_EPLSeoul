package com.tech.EPL.bus.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.bus.dto.BusStationDto;

@Mapper
public interface Idao {

	public ArrayList<BusStationDto> busStation ();

	
}
