package com.tech.EPL.realty.service;

import java.io.IOException;
import java.util.List;

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
	public void insertFileData(String filename, String type) {
       try {
            if ("전월세".equals(type)) {
                rentDataContext.readByLine(filename, this::insertRentBatch);
            } else {
                buyDataContext.readByLine(filename, this::insertBuyBatch);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 처리 중 오류 발생", e);
        }
	}
	
    private void insertRentBatch(List<RealtyRentData> dataList) {
        try {
            fileMapper.rentFileInsert(dataList);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("배치 삽입 중 오류 발생", e);
        }
    }

    private void insertBuyBatch(List<RealtyBuyData> dataList) {
        try {
            fileMapper.buyFileInsert(dataList);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("배치 삽입 중 오류 발생", e);
        }
    }

}
