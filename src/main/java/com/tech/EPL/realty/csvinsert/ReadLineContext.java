package com.tech.EPL.realty.csvinsert;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import com.tech.EPL.date.dto.DateRestaurantDto;
import com.tech.EPL.interfaces.Parser;

public class ReadLineContext<T> {

    private static final int BATCH_SIZE = 1000;

    private final Parser<T> parser;

    public ReadLineContext(Parser<T> parser) {
        this.parser = parser;
    }

    public void readByLine(String filename, Consumer<List<T>> consumer) throws IOException {
        List<T> result = new ArrayList<>();
        int i = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String str;
            while ((str = reader.readLine()) != null) {
                try {
                    i++;
                    System.out.println(i + " 회");
                    result.add(parser.parse(str));

                    if (result.size() == BATCH_SIZE) {
                        consumer.accept(result);
                        result.clear();
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.printf("파싱 에러 - 파일내용 : %s\n", str.substring(0, 20));
                }
            }

            if (!result.isEmpty()) {
                consumer.accept(result);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(i + " 회 작업 완료");
    }

//	public List<DateRestaurantDto> readByLine(String filename) {
//		// TODO Auto-generated method stub
//		return null;
//	}
}
