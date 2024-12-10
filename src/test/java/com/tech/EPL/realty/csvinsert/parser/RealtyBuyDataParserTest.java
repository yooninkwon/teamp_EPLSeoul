package com.tech.EPL.realty.csvinsert.parser;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.tech.EPL.realty.dto.RealtyBuyData;

class RealtyBuyDataParserTest {
	
	private RealtyBuyDataParser dataParser;
	private String sampleData;
	
	@BeforeEach
	void setUp() {
		dataParser = new RealtyBuyDataParser();
		sampleData = "\"2024\",\"11500\",\"강서구\",\"10500\",\"마곡동\",\"1\",\"대지\",\"0758\",\"0003\",\"마곡헤리움2차\",\"20241123\",\"16450\",\"22.51\",\"33.970000\",\"9\",\"\",\"\",\"2016\",\"오피스텔\",\"중개거래\",\"서울 강서구\"";
	}
	
	@Test
	@DisplayName("매매 CSV 파일 DTO클래스로 파싱하는 클래스 테스트")
	void buyDataParserTest() {
		RealtyBuyData response = dataParser.parse(sampleData);
		
        assertNotNull(response);
        
        assertEquals("2024", response.getRcpt_yr());
        assertEquals("11500", response.getCgg_cd());
        assertEquals("강서구", response.getCgg_nm());
        assertEquals("10500", response.getStdg_cd());
        assertEquals("마곡동", response.getStdg_nm());
        assertEquals("1", response.getLotno_se());
        assertEquals("대지", response.getLotno_se_nm());
        assertEquals("0758", response.getMno());
        assertEquals("0003", response.getSno());
        assertEquals("마곡헤리움2차", response.getBldg_nm());
        assertEquals("20241123", response.getCtrt_day());
        assertEquals(16450, response.getThing_amt());
        assertEquals("22.51", response.getArch_area());
        assertEquals("33.970000", response.getLand_area());
        assertEquals("9", response.getFlr());
        assertEquals("", response.getRght_se());
        assertEquals("", response.getRtrcn_day());
        assertEquals("2016", response.getArch_yr());
        assertEquals("오피스텔", response.getBldg_usg());
        assertEquals("중개거래", response.getDclr_se());
        assertEquals("서울 강서구", response.getOpbiz_restagnt_sgg_nm());
	}

}
