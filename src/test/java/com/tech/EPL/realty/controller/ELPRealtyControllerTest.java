package com.tech.EPL.realty.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.ui.Model;

import com.tech.EPL.realty.service.RealtyAvgData;
import com.tech.EPL.realty.service.group.RealtyServiceGroup;

@SpringBootTest
class ELPRealtyControllerTest {


	@InjectMocks
	private RealtyServiceGroup serviceGroup;
	
	@Mock
	private RealtyAvgData testService;
	
	@Test
	void test(Model model) {
		String asd = realty1(model);
		System.out.println(asd);
	}
	
	@Test
	@DisplayName("realty1 TEST")
	public String realty1(Model model) {
		testService.execution(model);
		return "epl/realty1";
	}
	
}
