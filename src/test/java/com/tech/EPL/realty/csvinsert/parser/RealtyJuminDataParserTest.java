package com.tech.EPL.realty.csvinsert.parser;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.tech.EPL.realty.dto.RealtyJuminData;

class RealtyJuminDataParserTest {
	
	private RealtyJuminDataParser dataParser;
	private String sampleData;
	
	@BeforeEach
	void setUp() {
		dataParser = new RealtyJuminDataParser();
		sampleData = "\"은평구\",\"2007\",\"1234\"";
	}
	
	@Test
	@DisplayName("인구수 CSV 파일 DTO클래스로 파싱하는 클래스 테스트")
	void juminDataParserTest() {
		RealtyJuminData response = dataParser.parse(sampleData);
		
		assertNotNull(response);
		assertEquals("은평구", response.getGu());
		assertEquals(2007, response.getYear());
		assertEquals(1234, response.getJumin());
		
	}

}
