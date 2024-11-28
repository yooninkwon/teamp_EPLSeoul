package com.tech.EPL.realty.csvinsert;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.tech.EPL.interfaces.Parser;


public class ReadLineContext<T> {
	
	Parser<T> parser;
	
    public ReadLineContext(Parser<T> parser) {
        this.parser = parser;
    }
    
    public List<T> readByLine(String filename) throws IOException {
        
        List<T> result = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        String str;
        while ((str = reader.readLine()) != null) {
            try {
                result.add(parser.parse(str));
            }catch(Exception e){
                System.out.printf("파싱 에러 - 파일내용 : %s\n", str.substring(0, 20));
            }
        }
        reader.close();
        return result;
    }
}
