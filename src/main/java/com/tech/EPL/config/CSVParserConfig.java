package com.tech.EPL.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.tech.EPL.realty.csvinsert.ReadLineContext;
import com.tech.EPL.realty.csvinsert.parser.RealtyBuyDataParser;
import com.tech.EPL.realty.csvinsert.parser.RealtyRentDataParser;
import com.tech.EPL.realty.dto.RealtyBuyData;
import com.tech.EPL.realty.dto.RealtyRentData;

@Configuration
public class CSVParserConfig {
    
	@Bean
    ReadLineContext<RealtyRentData> rentReadLineContext(){
        return new ReadLineContext<RealtyRentData>(new RealtyRentDataParser());
    }

	@Bean
	ReadLineContext<RealtyBuyData> buyReadLineContext(){
		return new ReadLineContext<RealtyBuyData>(new RealtyBuyDataParser());
	}
}
