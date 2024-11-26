package com.tech.EPL.realty.service.group;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.EPL.realty.service.TestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealtyServiceGroup {
	private final TestService testService;
	
	public void testMethod(Model model) {
		testService.execution(model);
	}
	
}
