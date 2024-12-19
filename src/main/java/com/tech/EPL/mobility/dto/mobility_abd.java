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
public class mobility_abd {
	@Id // 기본 키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가
	private Integer no;
	
    private String district;
    private String year;
    private String type;
    private String item;
    private int cnt;
}
