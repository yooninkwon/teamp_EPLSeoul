package com.tech.EPL.history.service.group;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.history.service.TestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HistoryServiceGroup {
	private final TestService testService;
	
	public void testMethod(Model model) {
		testService.execution(model);
	}
	
}
