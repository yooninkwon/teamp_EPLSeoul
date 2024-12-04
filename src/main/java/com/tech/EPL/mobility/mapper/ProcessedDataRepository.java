package com.tech.EPL.mobility.mapper;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.EPL.mobility.dto.ProcessedData;

public interface ProcessedDataRepository extends JpaRepository<ProcessedData, Integer> {
	// 메서드 이름 기반 쿼리
	boolean existsByName(String name); // = select exists (select 1 from MOBILITY_SBD where name = ?)

}