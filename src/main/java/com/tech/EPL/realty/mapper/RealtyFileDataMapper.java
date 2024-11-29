package com.tech.EPL.realty.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.realty.dto.RealtyBuyData;
import com.tech.EPL.realty.dto.RealtyRentData;

@Mapper
public interface RealtyFileDataMapper {
	void rentFileInsert(RealtyRentData rent);

	int getRentCount();
	
	int rentDeleteAll();

	void buyFileInsert(RealtyBuyData rent);

	int buyingDeleteAll();

	int getBuyingCount();
}
