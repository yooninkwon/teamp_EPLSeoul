package com.tech.EPL.date.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.EPL.date.dto.DateDistDto;
import com.tech.EPL.date.dto.DateRestaurantDto;

@Mapper
public interface DateMapper {
	
	// 선택한 구 정보 가져오기
	DateDistDto getDistrictInfo(String name);
	
	// 음식점 정보 DB에 저장
	void insertRestaurantData(DateRestaurantDto restaurantData);

	// 음식점 리스트 가져오기
	List<DateRestaurantDto> restaurantList(String distname, int offset, int size, String type);
	
	// 가게명 검색
	List<DateRestaurantDto> searchByName(String query);
	
	// 주소 검색
	List<DateRestaurantDto> searchByAddress(String query);

	List<DateRestaurantDto> searchRestaurantList(String distname, int offset, int size,
			String st, String searchKeyword);
	
}
