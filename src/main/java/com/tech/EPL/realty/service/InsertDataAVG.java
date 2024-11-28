package com.tech.EPL.realty.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.realty.enums.BuildingUseName;
import com.tech.EPL.realty.enums.GuName;
import com.tech.EPL.realty.mapper.RealtyAvgMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsertDataAVG implements ExecutionModel {

	private final RealtyAvgMapper avgMapper;

	@Override
	public void execution(Model model) {
		
		int i = 0;

		for (GuName guName : GuName.values()) {
			System.out.println(guName.toString());
			for (BuildingUseName buildingUse : BuildingUseName.values()) {
				i++;
				insertGuCode(guName, buildingUse);
			}
		}
		
		System.out.println(i + "회 작업완료");
				
	}

	private void insertGuCode(GuName guName, BuildingUseName buildingUse) {
		
		System.out.println("매매 AVG | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForBuyingByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("월세 AVG |" + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForRentByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("전세 AVG | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForJeonseByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("매매 MAX | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForBuyingMaxByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("매매 MIN | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForBuyingMinByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("월세 MAX | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForRentMaxByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("월세 MIN | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForRentMinByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("전세 MAX | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForJeonseMaxByGuName(guName.toString(), buildingUse.toString());
		
		System.out.println("전세 MIN | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertAvgForJeonseMinByGuName(guName.toString(), buildingUse.toString());
		
		
	}
}
