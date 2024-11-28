package com.tech.EPL.realty.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RealtyBuyData {

	private String rcpt_yr; // 접수연도
	private String cgg_cd; // 자치구코드
	private String cgg_nm; // 자치구명
	private String stdg_cd; // 법정동코드
	private String stdg_nm; // 법정동명
	private String lotno_se; // 지번구분
	private String lotno_se_nm; // 지번구분명
	private String mno; // 본번
	private String sno; // 부번
	private String bldg_nm; // 건물명
	private String ctrt_day; // 계약일
	private int thing_amt; // 물건금액(만원)
	private String arch_area; // 건물면적(㎡)
	private String land_area; // 토지면적(㎡)
	private String flr; // 층
	private String rght_se; // 권리구분
	private String rtrcn_day; // 취소일
	private String arch_yr; // 건축년도
	private String bldg_usg; // 건물용도
	private String dclr_se; // 신고구분
	private String opbiz_restagnt_sgg_nm; // 신고한 개업공인중개사 시군구명
}
