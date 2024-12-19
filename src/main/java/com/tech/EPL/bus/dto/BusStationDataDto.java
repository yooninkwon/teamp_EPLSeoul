package com.tech.EPL.bus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BusStationDataDto {
		private int route_number;            // 노선번호
	    private String route_name;           // 노선명
	    private int bus_stop_id;              // 표준버스정류장ID
	    private String bus_stop_ars_number;    // 버스정류장ARS번호
	    private String station_name;         // 역명
	    private String district;            // 버스정류장 위치(자치구)

	 // 00시부터 23시까지 승차 및 하차 총 승객 수
	    private int hour_00_boarding;
	    private int hour_00_alighting;
	    private int hour_01_boarding;
	    private int hour_01_alighting;
	    private int hour_02_boarding;
	    private int hour_02_alighting;
	    private int hour_03_boarding;
	    private int hour_03_alighting;
	    private int hour_04_boarding;
	    private int hour_04_alighting;
	    private int hour_05_boarding;
	    private int hour_05_alighting;
	    private int hour_06_boarding;
	    private int hour_06_alighting;
	    private int hour_07_boarding;
	    private int hour_07_alighting;
	    private int hour_08_boarding;
	    private int hour_08_alighting;
	    private int hour_09_boarding;
	    private int hour_09_alighting;
	    private int hour_10_boarding;
	    private int hour_10_alighting;
	    private int hour_11_boarding;
	    private int hour_11_alighting;
	    private int hour_12_boarding;
	    private int hour_12_alighting;
	    private int hour_13_boarding;
	    private int hour_13_alighting;
	    private int hour_14_boarding;
	    private int hour_14_alighting;
	    private int hour_15_boarding;
	    private int hour_15_alighting;
	    private int hour_16_boarding;
	    private int hour_16_alighting;
	    private int hour_17_boarding;
	    private int hour_17_alighting;
	    private int hour_18_boarding;
	    private int hour_18_alighting;
	    private int hour_19_boarding;
	    private int hour_19_alighting;
	    private int hour_20_boarding;
	    private int hour_20_alighting;
	    private int hour_21_boarding;
	    private int hour_21_alighting;
	    private int hour_22_boarding;
	    private int hour_22_alighting;
	    private int hour_23_boarding;
	    private int hour_23_alighting;
    
}
