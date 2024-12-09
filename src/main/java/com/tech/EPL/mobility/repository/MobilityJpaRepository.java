package com.tech.EPL.mobility.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.EPL.mobility.dto.MobilityProcessedData;

public interface MobilityJpaRepository extends JpaRepository<MobilityProcessedData, Integer> {
	// 메서드 이름 기반 쿼리
	boolean existsByName(String name); // = select exists (select 1 from MOBILITY_SBD where name = ?)

}