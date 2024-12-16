package com.tech.EPL.realty.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.util.List;
import java.util.function.Consumer;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.tech.EPL.realty.csvinsert.ReadLineContext;
import com.tech.EPL.realty.dto.RealtyRentData;
import com.tech.EPL.realty.mapper.RealtyFileDataMapper;

public class RealtyRentDBInsertTest {

	@InjectMocks
	private FileDBInsertService fileDBInsertService;

	@Mock
	private ReadLineContext<RealtyRentData> rentDataContext;

	@Mock
	private RealtyFileDataMapper fileMapper;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

	}

	@AfterEach
	void tearDown() {
		Mockito.reset(rentDataContext, fileMapper);
	}

	@Test
	@DisplayName("전월세 전체 데이터 insert 테스트")
	void testInsertRentFileData() throws IOException {
		String filename = "rent_test.csv";
		String type = "전월세";
		List<RealtyRentData> mockData = List.of(new RealtyRentData());

		doAnswer(invocation -> {
			Consumer<List<RealtyRentData>> consumer = invocation.getArgument(1);
			consumer.accept(mockData);
			return null;
		}).when(rentDataContext).readByLine(eq(filename), any());

		fileDBInsertService.insertFileData(filename, type);

		verify(rentDataContext, times(1)).readByLine(eq(filename), any());
		verify(fileMapper, times(1)).rentFileInsert(mockData);
	}


}
