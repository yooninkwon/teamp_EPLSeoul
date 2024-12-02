package com.tech.EPL.realty.dto;

import lombok.Data;

@Data
public class YearsStatBuying {
	private String rcpt_yr;
	private String bldg_usg;
	private int max_thing_amt;
	private int min_thing_amt;
	private int avg_thing_amt;
	private int count_all;
}
