package com.tech.EPL.realty.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.tech.EPL.realty.enums.GuName;

public class GuCodeServiceTest {
	
	private GuCodeService guCodeService;
	
	@BeforeEach
	void setUp() {
		guCodeService = new GuCodeService();
	}
	
	@Test
	@DisplayName("Enum에 존재하는 구 이름 입력시 올바른 구 이름 반환 테스트")
	void findByGuNameTest_forValidGuName() {
		String validGuName = "은평구";
		
		GuName result = guCodeService.findByGuName(validGuName);
		
		assertEquals(validGuName, result.getGuName());
	}
	
	@Test
	@DisplayName("Enum에 존재하지 않는 구 이름 입력시 Null 반환 테스트")
	void findByGuNameTest_forInvalidGuName() {
		String invalidGuName = "잘못된 구 이름";
		
		GuName result = guCodeService.findByGuName(invalidGuName);
		
		assertNull(result);
	}
	
	@Test
	@DisplayName("Enum에 존재하는 구 코드 입력시 올바른 구 코드 반환 테스트")
	void findByGuCodeTest_forValidGuCode() {
		int validGuCode = 11380;
		
		GuName result = guCodeService.findByGuCode(validGuCode);
		
		assertEquals(validGuCode, result.getGuCode());
	}
	
	@Test
	@DisplayName("Enum에 존재하지 않는 구 코드 입력시 Null 반환 테스트")
	void findByGuCodeTest_forInvalidGuCode() {
		int invalidGuCode = 0000000000;
		
		GuName result = guCodeService.findByGuCode(invalidGuCode);
		
		assertNull(result);
	}
	
}
