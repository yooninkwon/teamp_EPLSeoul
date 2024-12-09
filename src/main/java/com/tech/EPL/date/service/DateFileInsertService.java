package com.tech.EPL.date.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tech.EPL.date.csvinsert.parser.DateRestaurantParser;
import com.tech.EPL.date.dto.DateRestaurantDto;
import com.tech.EPL.date.mapper.DateMapper;
import com.tech.EPL.realty.csvinsert.ReadLineContext;

@Service
public class DateFileInsertService {

    private final DateMapper dateMapper;

    public DateFileInsertService(DateMapper dateMapper) {
        this.dateMapper = dateMapper;
    }

    @Transactional
    public int insertFileData(String filename) {
        // ReadLineContext에 DateRestaurantParser 전달
        ReadLineContext<DateRestaurantDto> context = new ReadLineContext<>(new DateRestaurantParser());
        List<DateRestaurantDto> restaurantDataList;

        try {
            // CSV 파일 읽기
            restaurantDataList = null;
            		//context.readByLine(filename);
            System.out.println("CSV 파일 파싱 완료");

            // 병렬로 데이터 삽입
            restaurantDataList.stream().parallel().forEach(data -> {
                try {
                	dateMapper.insertRestaurantData(data);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        // 저장된 데이터 개수 반환
        if (!Optional.ofNullable(restaurantDataList).isEmpty()) {
            return restaurantDataList.size();
        } else {
            return 0;
        }
    }
}