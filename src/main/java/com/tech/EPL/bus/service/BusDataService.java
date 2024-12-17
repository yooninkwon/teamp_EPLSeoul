package com.tech.EPL.bus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tech.EPL.bus.dto.BusStationDataDto;
import com.tech.EPL.bus.mapper.Idao;

@Service
public class BusDataService {
    @Autowired
    Idao idao;
	
    public List<BusStationDataDto> getHourlyBoardingData(int busStopId) {
       
    	return idao.selectHourlyBoardingData(busStopId);
    }
	
}
