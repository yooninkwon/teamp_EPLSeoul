package com.tech.EPL.realty.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import com.tech.EPL.interfaces.ExecutionModel;
import com.tech.EPL.realty.mapper.RealtyMapper;

@Service
public class TestService implements ExecutionModel {
	
	private final RealtyMapper realtyMapper;
	
	public TestService(RealtyMapper realtyMapper) {
		this.realtyMapper = realtyMapper;
	}
	
	@Override
	@Transactional
	public void execution(Model model) {
		try {
			System.out.println(realtyMapper.test());
		} catch (Exception e) {
			System.err.println("Database operation failed: " + e.getMessage());
			throw e;
		}
	}
	
}
