package com.tech.EPL.realty.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ELPRealtyController.class)
public class EPLRealtyControllerTest {
	
	@Autowired
	MockMvc mockMvc;
	
	@ParameterizedTest
	@CsvSource({
		"/epl/realty0, epl/realty0",
		"/epl/realty1, epl/realty1",
		"/epl/realty2, epl/realty2",
		"/epl/realty3, epl/realty3",
		"/epl/realty4, epl/realty4",
		"/epl/realty5, epl/realty5",
		"/epl/realty6, epl/realty6",
		"/epl/realty7, epl/realty7"
	})
	@DisplayName("realty 0~7 Controller Test")
	void realty0Test(String url, String expectedView) throws Exception {
		
		mockMvc.perform(get(url))
			.andExpect(status().isOk())
			.andExpect(view().name(expectedView));
	}

	
}
