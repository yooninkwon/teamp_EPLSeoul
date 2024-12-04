package com.tech.EPL.realty.csvinsert.parser;

import com.tech.EPL.interfaces.Parser;
import com.tech.EPL.realty.dto.RealtyRentData;

public class RealtyRentDataParser implements Parser<RealtyRentData>{

	@Override
	public RealtyRentData parse(String str) {
		String[] splitted = str.split("\",\"");
//		String[] splitted = str.split(",");
//		for(String asd : splitted) {
//			System.out.println(asd+", ");			
//		}
		RealtyRentData rentFileData = new RealtyRentData();
		
		rentFileData.setRcpt_yr(splitted[0]);
		rentFileData.setCgg_cd(splitted[1]);
		rentFileData.setCgg_nm(splitted[2]);
		rentFileData.setStdg_cd(splitted[3]);
		rentFileData.setStdg_nm(splitted[4]);
		rentFileData.setLotno_se(splitted[5]);
		rentFileData.setLotno_se_nm(splitted[6]);
		rentFileData.setMno(splitted[7]);	  
		rentFileData.setSno(splitted[8]);	  
		rentFileData.setFlr(splitted[9]);	
		rentFileData.setCtrt_day(splitted[10]);
		rentFileData.setRent_se(splitted[11]);
		rentFileData.setRent_area(splitted[12]);
		rentFileData.setGrfe(Integer.parseInt(splitted[13]));
		rentFileData.setRtfe(Integer.parseInt(splitted[14]));
		rentFileData.setBldg_nm(splitted[15]);
		rentFileData.setArch_yr(splitted[16]);
		rentFileData.setBldg_usg(splitted[17]);
		rentFileData.setCtrt_prd(splitted[18]);
		rentFileData.setNew_updt_yn(splitted[19]);
		rentFileData.setCtrt_updt_use_yn(splitted[20]);
		rentFileData.setBfr_grfe(splitted[21]);
		rentFileData.setBfr_rtfe(splitted[22]);
		
		
		return rentFileData;
	}

}
