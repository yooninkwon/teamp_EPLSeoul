package com.tech.EPL.history.service;

import org.springframework.stereotype.Service;
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
	public void execution(Model model) {
//		historyMapper.test();
		System.out.println(historyMapper.test());
//		model.addAttribute("test", model);
	}
	
}
