package com.tech.EPL.realty;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tech.EPL.realty.mapper.RealtyFileDataMapper;
import com.tech.EPL.realty.service.FileDBInsertService;

@SpringBootTest
public class RealtyBuyingDBInsertTest {
	
//	@Autowired
//	private ReadLineContext<RealtyRentData> rentDataContext;
	
	@Autowired
	private RealtyFileDataMapper realtyFileDataMapper;
	
	@Autowired
	private FileDBInsertService fileDBInsertService;
			
	@Test
	@DisplayName("매매 전체 데이터 insert 테스트")
	void buyingAddAllTest() throws IOException {
		
		String fileName = "C:\\team Albamon\\EPL_Seoul 자료\\부동산 실거래가 정보 모음\\매매_실거래가_건물용도별\\서울시 부동산 실거래가 정보 아파트.csv";
		realtyFileDataMapper.rentDeleteAll();
		int count = fileDBInsertService.insertFileData(fileName, "매매");
		assertEquals(count, realtyFileDataMapper.getBuyingCount());
	}
	
	@Test
    @DisplayName("매매 deleteAll, getCount 테스트")
    void buyingDeleteAllTest(){
		realtyFileDataMapper.buyingDeleteAll();
        assertEquals(0, realtyFileDataMapper.getBuyingCount());
		
    }
	
}
