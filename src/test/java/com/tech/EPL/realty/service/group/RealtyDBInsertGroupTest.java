package com.tech.EPL.realty.service.group;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.tech.EPL.realty.service.FileDBInsertService;
import com.tech.EPL.realty.service.InsertDataAVG;

class RealtyDBInsertGroupTest {
	
	@Mock
	private FileDBInsertService dbInsertService;
	
	@Mock
	private InsertDataAVG insertDataAVG;
	
	@InjectMocks
	private RealtyDBInsertGroup dbInsertGroup;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
    @DisplayName("fileDBinsert 메서드 호출 테스트")
	void fileDBinsertTest() {
		String fileName = "";
		String type = "rent";
		
		dbInsertGroup.fileDBinsert(fileName, type);
		
		verify(dbInsertService, times(1)).insertFileData(fileName, type);
	}
	
	@Test
	@DisplayName("fileDBinsert 예외 처리 테스트")
	void testFileDBinsertThrowsException() {
	    String fileName = "invalidFile.csv";
	    String type = "unknown";

	    doThrow(new IllegalArgumentException("Invalid type")).when(dbInsertService).insertFileData(fileName, type);

	    assertThrows(IllegalArgumentException.class, () -> dbInsertGroup.fileDBinsert(fileName, type));
	}
	
	@Test
    @DisplayName("insertAVG 메서드 호출 테스트")
	void insertAVGTest() {
		dbInsertGroup.insertAVG();
		
		verify(insertDataAVG, times(1)).execution();
	}	
}
