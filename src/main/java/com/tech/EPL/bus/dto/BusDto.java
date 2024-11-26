package com.tech.EPL.bus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BusDto {
    private String busRouteId;
    private String vehId;
    private double latitude;  // 위도
    private double longitude; // 경도
    private String plainNo;   // 차량번호
}
