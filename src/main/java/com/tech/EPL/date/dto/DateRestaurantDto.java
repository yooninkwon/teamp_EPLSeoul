package com.tech.EPL.date.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DateRestaurantDto {

	private String management_number; // 관리번호
	private String permission_date; // 인허가일자
	private String business_status_code; // 영업상태코드
	private String business_status_name; // 영업상태명
	private String detail_status_code; // 상세영업상태코드
	private String detail_status_name; // 상세영업상태명
	private String phone_number; // 전화번호
	private String area_size; // 소재지면적
	private String zip_code; // 소재지우편번호
	private String lot_address; // 지번주소
	private String street_address; // 도로명주소
	private String street_zip_code; // 도로명우편번호
	private String business_name; // 사업장명
	private String last_updated_date; // 최종수정일자
	private String data_update_flag; // 데이터갱신구분
	private String data_update_date; // 데이터갱신일자
	private String business_type; // 업태구분명
	private String coordinate_x; // 좌표정보(x)
	private String coordinate_y; // 좌표정보(y)

}
