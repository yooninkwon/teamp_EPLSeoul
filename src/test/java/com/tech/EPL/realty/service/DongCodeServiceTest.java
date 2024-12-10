package com.tech.EPL.realty.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.tech.EPL.realty.enums.DongName;

class DongCodeServiceTest {
	
	private DongCodeService dongCodeService;
	
	@BeforeEach
	void setUp() {
		dongCodeService = new DongCodeService();
	}
	
	@Test
	@DisplayName("Enum에 존재하는 동 이름 입력시 올바른 동 이름 반환 테스트")
	void findByDongNameTest_forValidDongName() {
		String validDongName = "종로구청운동";
		
		DongName result = dongCodeService.findByDongName(validDongName);
		
		assertNotNull(result);
		assertEquals(validDongName, result.getDongName());
	}
	
	@Test
	@DisplayName("Enum에 존재하지 않는 동 이름 입력시 Null 반환 테스트")
	void findByDongNameTest_forInvalidDongName() {
		String invalidDongName = "잘못된동이름";
		
		DongName result = dongCodeService.findByDongName(invalidDongName);
		
		assertNull(result);
	}
	
	@Test
	@DisplayName("Enum에 존재하는 동 이름 입력시 올바른 동 코드 반환 테스트")
	void findByDongNameTest_forValidDongCode() {
		int validDongCode = 1111010100;
		
		DongName result = dongCodeService.findByDongCode(validDongCode);
		
		assertNotNull(result);
		assertEquals(validDongCode, result.getDongCode());
	}
	
	@Test
	@DisplayName("Enum에 존재하지 않는 동 코드 입력시 Null 반환 테스트")
	void findByDongNameTest_forInvalidDongCode() {
		int invalidDongCode = 1;
		
		DongName result = dongCodeService.findByDongCode(invalidDongCode);
		
		assertNull(result);
	}

}
