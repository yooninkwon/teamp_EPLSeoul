package com.tech.EPL.date.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.date.dto.DateDistDto;
import com.tech.EPL.date.dto.DateRestaurantDto;

@Mapper
public interface DateMapper {
	
	// 선택한 구 정보 가져오기
	DateDistDto getDistrictInfo(String name);
	
	// 음식점 정보 DB에 저장
	void insertRestaurantData(DateRestaurantDto restaurantData);
}
