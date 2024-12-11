package com.tech.EPL.realty.csvinsert.parser;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.tech.EPL.realty.dto.RealtyRentData;

class RealtyRentDataParserTest {
	
	private RealtyRentDataParser dataParser;
	private String sampleData;
	
	@BeforeEach
	void setUp() {
		dataParser = new RealtyRentDataParser();
		sampleData = "\"2024\",\"11380\",\"은평구\",\"11000\",\"증산동\",\"1\",\"대지\",\"0258\",\"0000\",\"13\",\"20241124\",\"전세\",\"55.74\",\"65000\",\"0\",\"DMC센트럴자이(4단지)\",\"2023\",\"아파트\",\"25.01~27.01\",\"신규\",\"\",\"\",\"\"";
	}
	
	@Test
	@DisplayName("전월세 CSV 파일 DTO클래스로 파싱하는 클래스 테스트")
	void rentDataParserTest() {
		RealtyRentData response = dataParser.parse(sampleData);
		
		assertNotNull(response);
		assertEquals("2024", response.getRcpt_yr());
        assertEquals("11380", response.getCgg_cd());
        assertEquals("은평구", response.getCgg_nm());
        assertEquals("11000", response.getStdg_cd());
        assertEquals("증산동", response.getStdg_nm());
        assertEquals("1", response.getLotno_se());
        assertEquals("대지", response.getLotno_se_nm());
        assertEquals("0258", response.getMno());
        assertEquals("0000", response.getSno());
        assertEquals("13", response.getFlr());
        assertEquals("20241124", response.getCtrt_day());
        assertEquals("전세", response.getRent_se());
        assertEquals("55.74", response.getRent_area());
        assertEquals(65000, response.getGrfe());
        assertEquals(0, response.getRtfe());
        assertEquals("DMC센트럴자이(4단지)", response.getBldg_nm());
        assertEquals("2023", response.getArch_yr());
        assertEquals("아파트", response.getBldg_usg());
        assertEquals("25.01~27.01", response.getCtrt_prd());
        assertEquals("신규", response.getNew_updt_yn());
        assertEquals("", response.getCtrt_updt_use_yn());
        assertEquals("", response.getBfr_grfe());
        assertEquals("", response.getBfr_rtfe());
	}

}
