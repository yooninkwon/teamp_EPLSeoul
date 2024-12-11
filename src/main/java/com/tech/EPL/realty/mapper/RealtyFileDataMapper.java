package com.tech.EPL.realty.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.realty.dto.RealtyBuyData;
import com.tech.EPL.realty.dto.RealtyJuminData;
import com.tech.EPL.realty.dto.RealtyRentData;

@Mapper
public interface RealtyFileDataMapper {
	void rentFileInsert(List<RealtyRentData> dataList);

	int getRentCount();
	
	int rentDeleteAll();

	void buyFileInsert(List<RealtyBuyData> dataList);

	int buyingDeleteAll();

	int getBuyingCount();

	void juminFileInsert(List<RealtyJuminData> dataList);
}
