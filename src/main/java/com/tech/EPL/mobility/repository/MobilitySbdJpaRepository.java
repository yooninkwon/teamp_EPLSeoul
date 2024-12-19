package com.tech.EPL.mobility.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.EPL.mobility.dto.mobility_sbd;

public interface MobilitySbdJpaRepository extends JpaRepository<mobility_sbd, Integer> {
	// 메서드 이름 기반 쿼리
	boolean existsByName(String name); // = select exists (select 1 from MOBILITY_SBD where name = ?)
	List<mobility_sbd> findAll(); // = select * from MOBILITY_SBD
}