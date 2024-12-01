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
		
		avgUpdateYearSQL();
		
	}
	
	private void insertGuCode(GuName guName, BuildingUseName buildingUse) {
				
		System.out.println("매매 MAX/MIN/AVG | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertBuyingMaxMinAvg(guName.toString(), buildingUse.toString());
		
		
		System.out.println("월세 MAX/MIN/AVG | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertRentMaxMinAvg(guName.toString(), buildingUse.toString());
		
		System.out.println("전세 MAX/MIN/AVG | " + guName.toString() + " | " + buildingUse.toString());
		avgMapper.insertJeonseMaxMinAvg(guName.toString(), buildingUse.toString());
		
	}
	
	private void avgUpdateYearSQL() {
		System.out.println("SQL \" 삭제 업데이트 메서드");
		
        String[] changeYear = {"2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"};

        int i = 0;
        for(int j = 0; j < changeYear.length; j++) {
        	avgMapper.rentYearUpdate(changeYear[j], "\"" + changeYear[j]);
        	avgMapper.jeonseYearUpdate(changeYear[j], "\"" + changeYear[j]);
        	i = j;
        }
        System.out.println("업데이트 " + i + " 회 작업 완료");
	}
}
