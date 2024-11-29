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
public class RealtyRentDBInsertTest {
	
//	@Autowired
//	private ReadLineContext<RealtyRentData> rentDataContext;
	
	@Autowired
	private RealtyFileDataMapper realtyFileDataMapper;
	
	@Autowired
	private FileDBInsertService fileDBInsertService;
		
	@Test
	@DisplayName("전월세 전체 데이터 insert 테스트")
	void rentAddAllTest() throws IOException {
		
		String fileName = "C:\\team Albamon\\EPL_Seoul 자료\\부동산 실거래가 정보 모음\\월세_실거래가_건물용도별\\서울시 부동산 전월세가 정보 오피스텔.csv";
		realtyFileDataMapper.rentDeleteAll();
//		int count = fileDBInsertService.insertFileData(fileName, "전월세");
//		assertEquals(count, realtyFileDataMapper.getRentCount());
	}
	
	@Test
    @DisplayName("전월세 deleteAll, getCount 테스트")
    void rentDeleteAllTest(){
		realtyFileDataMapper.rentDeleteAll();
        assertEquals(0, realtyFileDataMapper.getRentCount());
    }	
}
