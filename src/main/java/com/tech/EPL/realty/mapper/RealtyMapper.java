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
	
	public String chart1();

	public ArrayList<YearsStatBuying> getYearsStatBuying();
	
	public ArrayList<YearsStatRent> getYearsStatRent();
	
	public ArrayList<YearsStatJeonse> getYearsStatJeonse();

	public ArrayList<GuStatBuying> getGuAvgBuying();

	public ArrayList<GuStatRent> getGuAvgRent();

	public ArrayList<GuStatJeonse> getGuAvgJeonse();
	
}
