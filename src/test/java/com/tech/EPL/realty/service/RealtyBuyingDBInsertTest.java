package com.tech.EPL.realty.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.function.Consumer;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.tech.EPL.realty.csvinsert.ReadLineContext;
import com.tech.EPL.realty.dto.RealtyBuyData;
import com.tech.EPL.realty.mapper.RealtyFileDataMapper;

public class RealtyBuyingDBInsertTest {

	@InjectMocks
	private FileDBInsertService fileDBInsertService;

	@Mock
	private ReadLineContext<RealtyBuyData> buyDataContext;

	@Mock
	private RealtyFileDataMapper fileMapper;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

	}

	@Test
	@DisplayName("매매 전체 데이터 insert 테스트")
	void testInsertBuyingFileData() throws Exception {
		String filename = "buying_test.csv";
		String type = "매매";
		List<RealtyBuyData> mockData = List.of(new RealtyBuyData());

		doAnswer(invocation -> {
			Consumer<List<RealtyBuyData>> consumer = invocation.getArgument(1);
			consumer.accept(mockData);
			return null;
		}).when(buyDataContext).readByLine(eq(filename), any());

		fileDBInsertService.insertFileData(filename, type);

		verify(buyDataContext, times(1)).readByLine(eq(filename), any());
		verify(fileMapper, times(1)).buyFileInsert(mockData);
	}

}
