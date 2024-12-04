package com.tech.EPL.realty.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.realty.dto.GuStatBuying;
import com.tech.EPL.realty.dto.GuStatJeonse;
import com.tech.EPL.realty.dto.GuStatRent;
import com.tech.EPL.realty.dto.YearsStatBuying;
import com.tech.EPL.realty.dto.YearsStatJeonse;
import com.tech.EPL.realty.dto.YearsStatRent;

@Mapper
public interface RealtyMapper {
	
	public ArrayList<YearsStatBuying> getYearsStatBuying();
	
	public ArrayList<YearsStatRent> getYearsStatRent();
	
	public ArrayList<YearsStatJeonse> getYearsStatJeonse();
	
	
	/* 구별 통계 */
	public ArrayList<GuStatBuying> getGuAvgBuyingApt();
	public ArrayList<GuStatBuying> getGuAvgBuyingSingle();
	public ArrayList<GuStatBuying> getGuAvgBuyingMulti();
	public ArrayList<GuStatBuying> getGuAvgBuyingOffice();

	public ArrayList<GuStatRent> getGuAvgRentApt();
	public ArrayList<GuStatRent> getGuAvgRentSingle();
	public ArrayList<GuStatRent> getGuAvgRentMulti();
	public ArrayList<GuStatRent> getGuAvgRentOffice();

	public ArrayList<GuStatJeonse> getGuAvgJeonseApt();
	public ArrayList<GuStatJeonse> getGuAvgJeonseSingle();
	public ArrayList<GuStatJeonse> getGuAvgJeonseMulti();
	public ArrayList<GuStatJeonse> getGuAvgJeonseOffice();
	
}
