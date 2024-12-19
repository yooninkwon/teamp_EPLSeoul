package com.tech.EPL.bus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BusDetails {
    
	private String plainNo;
	private String vehId;
    private String busType;
    private String congetion;
    private double posX;
    private double posY;
    private String stopFlag ;
    private String lastStnIdName;
    private String dataTm ;
    private String stOrd ;
        
}
