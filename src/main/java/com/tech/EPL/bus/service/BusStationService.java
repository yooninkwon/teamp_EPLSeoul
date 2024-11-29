package com.tech.EPL.bus.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.bus.dto.BusStationDto;
import com.tech.EPL.bus.mapper.Idao;
import com.tech.EPL.interfaces.ExecutionModel;

@Service
public class BusStationService implements ExecutionModel {

	private Idao idao;

	public BusStationService(Idao idao) {
		this.idao = idao;
	}
	
	@Override
	public void execution(Model model) {

		ArrayList<BusStationDto> busStations = idao.busStation();

		model.addAttribute("busStations", busStations);

	}

}