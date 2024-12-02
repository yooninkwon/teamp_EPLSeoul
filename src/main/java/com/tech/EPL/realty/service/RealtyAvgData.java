package com.tech.EPL.realty.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.realty.dto.YearsStatBuying;
import com.tech.EPL.realty.dto.YearsStatJeonse;
import com.tech.EPL.realty.dto.YearsStatRent;
import com.tech.EPL.realty.mapper.RealtyMapper;

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
		ArrayList<YearsStatBuying> buyingStat;
		ArrayList<YearsStatRent> rentStat;
		ArrayList<YearsStatJeonse> jeonseStat;
		
		try {
			buyingStat = realtyMapper.getYearsStatBuying();
			rentStat = realtyMapper.getYearsStatRent();
			jeonseStat = realtyMapper.getYearsStatJeonse();
		} catch (Exception e) {
			System.err.println("Database operation failed: " + e.getMessage());
			throw e;
		}
//		for (int i = 0; i < buyingStat.size(); i++) {
//			System.out.println(
//					buyingStat.get(i).toString() // + " | " +
//					rentStat.get(i).toString() + " | " +
//					jeonseStat.get(i).toString()
//					
//					);
//		}
		String jsonBuyingStat = "";
		String jsonRentStat = "";
		String jsonJeonseStat = "";
		
		try {
			jsonBuyingStat = mapper.writeValueAsString(buyingStat);
			jsonRentStat = mapper.writeValueAsString(rentStat);
			jsonJeonseStat = mapper.writeValueAsString(jeonseStat);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
				
		model.addAttribute("buyingStat", jsonBuyingStat);
		model.addAttribute("rentStat", jsonRentStat);
		model.addAttribute("jeonseStat", jsonJeonseStat);
		
	}
	
}




