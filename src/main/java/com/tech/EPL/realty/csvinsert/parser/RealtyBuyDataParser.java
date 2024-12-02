package com.tech.EPL.realty.csvinsert.parser;

import com.tech.EPL.interfaces.Parser;

import com.tech.EPL.realty.dto.RealtyBuyData;

public class RealtyBuyDataParser implements Parser<RealtyBuyData> {

	@Override
	public RealtyBuyData parse(String str) {
		String[] splitted = str.split("\",\"");
		RealtyBuyData buyFileData = new RealtyBuyData();
		
		buyFileData.setRcpt_yr(splitted[0]);
		buyFileData.setCgg_cd(splitted[1]);
		buyFileData.setCgg_nm(splitted[2]);
		buyFileData.setStdg_cd(splitted[3]);
		buyFileData.setStdg_nm(splitted[4]);
		buyFileData.setLotno_se(splitted[5]);
		buyFileData.setLotno_se_nm(splitted[6]);
		buyFileData.setMno(splitted[7]);
		buyFileData.setSno(splitted[8]);
		buyFileData.setBldg_nm(splitted[9]);
		buyFileData.setCtrt_day(splitted[10]);
		buyFileData.setThing_amt(splitted[11]);
		buyFileData.setArch_area(splitted[12]);
		buyFileData.setLand_area(splitted[13]);
		buyFileData.setFlr(splitted[14]);
		buyFileData.setRght_se(splitted[15]);
		buyFileData.setRtrcn_day(splitted[16]);
		buyFileData.setArch_yr(splitted[17]);
		buyFileData.setBldg_usg(splitted[18]);
		buyFileData.setDclr_se(splitted[19]);
		buyFileData.setOpbiz_restagnt_sgg_nm(splitted[20]);
		
		return buyFileData;
	}

}
