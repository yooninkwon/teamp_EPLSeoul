package com.tech.EPL.realty.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RealtyRentData {
	
	private String rcpt_yr;	// 접수연도
	private String cgg_cd;	// 자치구코드
	private String cgg_nm;	// 자치구명
	private String stdg_cd;	// 법정동코드
	private String stdg_nm;	// 법정동명
	private String lotno_se; // 지번구분
	private String lotno_se_nm;	// 지번구분명
	private String mno;	// 본번
	private String sno;	// 부번
	private String flr;	// 층
	private String ctrt_day; // 계약일
	private String rent_se;	// 전월세 구분
	private String rent_area; // 임대면적(㎡)
	private int grfe; // 보증금(만원)
	private int rtfe; // 임대료(만원)
	private String bldg_nm; // 건물명
	private String arch_yr; // 건축년도
	private String bldg_usg; // 건물용도
	private String ctrt_prd; // 계약기간
	private String new_updt_yn; // 신규갱신여부
	private String ctrt_updt_use_yn; // 계약갱신권사용여부
	private String bfr_grfe; // 종전 보증금
	private String bfr_rtfe; // 종전 임대료
}
