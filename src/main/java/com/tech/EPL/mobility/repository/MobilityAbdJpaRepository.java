package com.tech.EPL.mobility.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.EPL.mobility.dto.mobility_abd;

public interface MobilityAbdJpaRepository extends JpaRepository<mobility_abd, Integer> {
	// 메서드 이름 기반 쿼리
	List<mobility_abd> findAll(); // = select * from MOBILITY_ABD
}