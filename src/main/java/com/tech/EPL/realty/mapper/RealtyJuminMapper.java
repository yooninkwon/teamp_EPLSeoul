package com.tech.EPL.realty.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.realty.dto.RealtyJuminData;

@Mapper
public interface RealtyJuminMapper {
	
	public ArrayList<RealtyJuminData> getJuminData();
		
}
