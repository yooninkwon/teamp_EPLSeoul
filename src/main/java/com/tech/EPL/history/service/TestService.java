package com.tech.EPL.history.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import com.tech.EPL.history.mapper.HistoryMapper;
import com.tech.EPL.interfaces.ExecutionModel;

@Service
public class TestService implements ExecutionModel {
	
	private final HistoryMapper historyMapper;
	
	public TestService(HistoryMapper historyMapper) {
		this.historyMapper = historyMapper;
	}
	
	@Override
	@Transactional
	public void execution(Model model) {
		try {
			System.out.println(historyMapper.test());
		} catch (Exception e) {
			System.err.println("Database operation failed: " + e.getMessage());
			throw e;
		}
	}
	
}
