package com.tech.EPL.realty.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.realty.mapper.RealtyMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RealtyAvgData implements ExecutionModel {
	
	private final RealtyMapper realtyMapper;
	private final ObjectMapper mapper;
	
	public RealtyAvgData(RealtyMapper realtyMapper,
			ObjectMapper mapper) {
		this.realtyMapper = realtyMapper;
		this.mapper = mapper;
	}
	
	@Override
	public void execution(Model model) {
		
		addModelMethod(model, "buyingStat", realtyMapper.getYearsStatBuying());
		addModelMethod(model, "rentStat", realtyMapper.getYearsStatRent());
		addModelMethod(model, "jeonseStat", realtyMapper.getYearsStatJeonse());

	}
	
	private <T> void addModelMethod(Model model, String keyName, ArrayList<T> list) {
		try {
			model.addAttribute(keyName, mapper.writeValueAsString(list));
		} catch (JsonProcessingException e) {
			log.error("Json Processing Exception", e);
		}
	}
	
}




