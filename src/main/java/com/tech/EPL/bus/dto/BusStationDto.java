package com.tech.EPL.bus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BusStationDto {
    private String node_id;
    private String ars_id;
    private String station_name;
    private double x_coord;
    private double y_coord;
    private String station_type;
    private String lastStnIdName;
}
