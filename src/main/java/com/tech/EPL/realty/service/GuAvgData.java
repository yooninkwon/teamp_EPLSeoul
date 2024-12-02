package com.tech.EPL.realty.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.realty.dto.GuStatBuying;
import com.tech.EPL.realty.dto.GuStatJeonse;
import com.tech.EPL.realty.dto.GuStatRent;
import com.tech.EPL.realty.mapper.RealtyMapper;

@Service
public class GuAvgData implements ExecutionModel {
	
	private final RealtyMapper realtyMapper;
	private final ObjectMapper mapper;	
	
	public GuAvgData(RealtyMapper realtyMapper,
				ObjectMapper mapper
			) {
		this.realtyMapper = realtyMapper;
		this.mapper = mapper;
	}

	@Override
	public void execution(Model model) {
		
		ArrayList<GuStatBuying> guAvgBuying = realtyMapper.getGuAvgBuying();
		ArrayList<GuStatRent> guAvgRent = realtyMapper.getGuAvgRent();
		ArrayList<GuStatJeonse> guAvgJeonse = realtyMapper.getGuAvgJeonse();
		
		String jsonGuAvgBuying = "";
		String jsonGuAvgRent = "";
		String jsonGuAvgJeonse = "";
		
		try {
			jsonGuAvgBuying = mapper.writeValueAsString(guAvgBuying);
			jsonGuAvgRent = mapper.writeValueAsString(guAvgRent);
			jsonGuAvgJeonse = mapper.writeValueAsString(guAvgJeonse);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		model.addAttribute("guAvgBuying", jsonGuAvgBuying);
		model.addAttribute("guAvgRent", jsonGuAvgRent);
		model.addAttribute("guAvgJeonse", jsonGuAvgJeonse);
		
	}	
}