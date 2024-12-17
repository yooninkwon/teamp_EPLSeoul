package com.tech.EPL.mobility.dto;

import java.util.List;

import lombok.Data;

@Data
public class MobilityRawData {
	//sbd
    private String bldn_nm;
    private double lat;
    private double lot;
    
    //abd
    private List<String> rawLines;
}