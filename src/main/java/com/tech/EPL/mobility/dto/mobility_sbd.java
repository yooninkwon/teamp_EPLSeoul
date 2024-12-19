package com.tech.EPL.mobility.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class mobility_sbd {
	@Id // 기본 키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가
	private Integer no;
	
    private String name;
    private double lat;
    private double lot;
    private String si;
    private String gu;
    private String dong;
}
