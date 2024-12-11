package com.tech.EPL.realty.dto;

import lombok.Data;

@Data
public class YearsStatGuRent {
	private String cgg_nm;
	private String rcpt_yr;
	private String bldg_usg;
	private int max_grfe;
	private int min_grfe;
	private int avg_grfe;
	private int max_rtfe;
	private int min_rtfe;
	private int avg_rtfe;
	private int count_all; 
}
