package com.tech.EPL.realty.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tech.EPL.realty.csvinsert.ReadLineContext;
import com.tech.EPL.realty.dto.RealtyBuyData;
import com.tech.EPL.realty.dto.RealtyRentData;
import com.tech.EPL.realty.mapper.RealtyFileDataMapper;

@Service
public class FileDBInsertService {

	private final ReadLineContext<RealtyRentData> rentDataContext;
	private final ReadLineContext<RealtyBuyData> buyDataContext;
	private final RealtyFileDataMapper fileMapper;

	public FileDBInsertService(
			@Qualifier("rentReadLineContext") ReadLineContext<RealtyRentData> rentDataContext,
			@Qualifier("buyReadLineContext") ReadLineContext<RealtyBuyData> buyDataContext,
			RealtyFileDataMapper fileMapper
			) {
		this.rentDataContext = rentDataContext;
		this.buyDataContext = buyDataContext;
		this.fileMapper = fileMapper;
	}

	@Transactional
	public int insertFileData(String filename, String type) {
		
		if (type.equals("전월세")) {
			List<RealtyRentData> rentDataList;
			
			try {
				rentDataList = rentDataContext.readByLine(filename);
				System.out.println("파싱 종료");
				rentDataList.stream().parallel().forEach(rent -> {
					try {
						fileMapper.rentFileInsert(rent);
					} catch (Exception e) {
						e.printStackTrace();
						throw new RuntimeException(e);
					}
				});
			} catch (IOException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
			
			if (!Optional.of(rentDataList).isEmpty()) {
				return rentDataList.size();
			} else {

				return 0;
			}
			
		} else {
			List<RealtyBuyData> buyDataList;
			
			try {
				buyDataList = buyDataContext.readByLine(filename);
				System.out.println("파싱 종료");
				buyDataList.stream().parallel().forEach(rent -> {
					try {
						fileMapper.buyFileInsert(rent);
					} catch (Exception e) {
						e.printStackTrace();
						throw new RuntimeException(e);
					}
				});
			} catch (IOException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
			
			if (!Optional.of(buyDataList).isEmpty()) {
				return buyDataList.size();
			} else {

				return 0;
			}
		}
		
	}

}
