package com.tech.EPL.metro.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.metro.dto.StationAccidentDto;
import com.tech.EPL.metro.dto.StationCrimeDto;
import com.tech.EPL.metro.mapper.MetroMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StationAccidentCrimeDataService implements ExecutionModel{

	private final MetroMapper metroMapper;
	
	@Override
	public void execution(Model model) {
		
		model.addAttribute("accident",stationAccident());
		model.addAttribute("crime",stationCrime());
		
		
		
	}
	
	//최근 5개년 사고현황
	public List<StationAccidentDto> stationAccident() {
		
		return metroMapper.stationAccident();
		
	}
	//최근 5개년 성범죄현황
	public List<StationCrimeDto> stationCrime() {
		
		return metroMapper.stationCrime();
	}
	
}
