package com.tech.EPL.realty.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.realty.dto.YearsStatGuBuying;
import com.tech.EPL.realty.dto.YearsStatGuJeonse;
import com.tech.EPL.realty.dto.YearsStatGuRent;

@Mapper
public interface RealtyYearsMapper {
	
	ArrayList<YearsStatGuBuying> getYearsBuyingApt();
	ArrayList<YearsStatGuBuying> getYearsBuyingSingle();
	ArrayList<YearsStatGuBuying> getYearsBuyingMulti();
	ArrayList<YearsStatGuBuying> getYearsBuyingOffice();
	
	ArrayList<YearsStatGuRent> getYearsRentApt();
	ArrayList<YearsStatGuRent> getYearsRentSingle();
	ArrayList<YearsStatGuRent> getYearsRentMulti();
	ArrayList<YearsStatGuRent> getYearsRentOffice();
	
	ArrayList<YearsStatGuJeonse> getYearsJeonseApt();
	ArrayList<YearsStatGuJeonse> getYearsJeonseSingle();
	ArrayList<YearsStatGuJeonse> getYearsJeonseMulti();
	ArrayList<YearsStatGuJeonse> getYearsJeonseOffice();
	
}
