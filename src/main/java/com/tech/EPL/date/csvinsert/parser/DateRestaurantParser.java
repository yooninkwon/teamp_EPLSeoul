package com.tech.EPL.date.csvinsert.parser;

import com.tech.EPL.date.dto.DateRestaurantDto;
import com.tech.EPL.interfaces.Parser;

public class DateRestaurantParser implements Parser<DateRestaurantDto>{

	@Override
	public DateRestaurantDto parse(String str) {
		// 데이터를 ','로 구분하여 배열로 변환
        String[] splitted = str.split("\",\"");
        // 데이터를 담을 DateRestaurantDto 객체 생성
        DateRestaurantDto restaurantData = new DateRestaurantDto();

        // 각 데이터 필드를 설정
        restaurantData.setManagement_number(splitted[0].replace("\"", "")); // 첫 번째 항목에서 첫 번째 따옴표 제거
        restaurantData.setPermission_date(splitted[1]);
        restaurantData.setBusiness_status_code(splitted[2]);
        restaurantData.setBusiness_status_name(splitted[3]);
        restaurantData.setDetail_status_code(splitted[4]);
        restaurantData.setDetail_status_name(splitted[5]);
        restaurantData.setPhone_number(splitted[6]);
        restaurantData.setArea_size(splitted[7]);
        restaurantData.setZip_code(splitted[8]);
        restaurantData.setLot_address(splitted[9]);
        restaurantData.setStreet_address(splitted[10]);
        restaurantData.setStreet_zip_code(splitted[11]);
        restaurantData.setBusiness_name(splitted[12]);
        restaurantData.setLast_updated_date(splitted[13]);
        restaurantData.setData_update_flag(splitted[14]);
        restaurantData.setData_update_date(splitted[15]);
        restaurantData.setBusiness_type(splitted[16]);
        restaurantData.setCoordinate_x(splitted[17]);
        restaurantData.setCoordinate_y(splitted[18].replace("\"", "")); // 마지막 항목에서 마지막 따옴표 제거

        return restaurantData;
    }
}	
