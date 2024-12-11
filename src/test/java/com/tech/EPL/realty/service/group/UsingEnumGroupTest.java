package com.tech.EPL.realty.service.group;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.tech.EPL.realty.enums.DongName;
import com.tech.EPL.realty.enums.GuName;
import com.tech.EPL.realty.service.DongCodeService;
import com.tech.EPL.realty.service.GuCodeService;

class UsingEnumGroupTest {
	
	@Mock
	private DongCodeService dongCodeService;

	@Mock
	private GuCodeService guCodeService;
	
	@InjectMocks
	private UsingEnumGroup enumGroup;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@DisplayName("동 코드로 찾기 테스트")
	void findByDongCodeTest() {
		when(dongCodeService.findByDongCode(0000)).thenReturn(DongName.강남구개포동);
		DongName result = enumGroup.findByDongCode(0000);
		assertNotNull(result);
		assertEquals(DongName.강남구개포동.getDongName(), result.getDongName());
		verify(dongCodeService, times(1)).findByDongCode(0000);
	}
	
	@Test
	@DisplayName("동 이름으로 찾기 테스트")
	void findByDongNameTest() {
		when(dongCodeService.findByDongName("aaa")).thenReturn(DongName.강남구개포동);
		DongName result = enumGroup.findByDongName("aaa");
		assertNotNull(result);
		assertEquals(DongName.강남구개포동.getDongName(), result.getDongName());
		verify(dongCodeService, times(1)).findByDongName("aaa");
	}
	
	@Test
	@DisplayName("구 코드로 찾기 테스트")
	void findByGuCodeTest() {
		when(guCodeService.findByGuCode(0000)).thenReturn(GuName.강남구);
		GuName result = enumGroup.findByGuCode(0000);
		assertNotNull(result);
		assertEquals(GuName.강남구.getGuName(), result.getGuName());
		verify(guCodeService, times(1)).findByGuCode(0000);
	}
	
	@Test
	@DisplayName("구 이름으로 찾기 테스트")
	void findByGuNameTest() {
		when(guCodeService.findByGuName("aaa")).thenReturn(GuName.강남구);
		GuName result = enumGroup.findByGuName("aaa");
		assertNotNull(result);
		assertEquals(GuName.강남구.getGuName(), result.getGuName());
		verify(guCodeService, times(1)).findByGuName("aaa");
	}

}
