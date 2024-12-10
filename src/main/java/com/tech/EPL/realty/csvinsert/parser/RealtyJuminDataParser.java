package com.tech.EPL.realty.csvinsert.parser;

import com.tech.EPL.interfaces.Parser;
import com.tech.EPL.realty.dto.RealtyJuminData;

public class RealtyJuminDataParser implements Parser<RealtyJuminData> {

	@Override
	public RealtyJuminData parse(String str) {
		
        if (str.startsWith("\ufeff")) {
            str = str.substring(1);
        }
		
		String[] splitted = str.split("\",\"");
		RealtyJuminData juminData = new RealtyJuminData();
		
		juminData.setGu(splitted[0].replace("\"", ""));
		juminData.setYear(Integer.parseInt(splitted[1]));
		juminData.setJumin(Integer.parseInt(splitted[2].replace("\"", "")));
		
		return juminData;
	}

}
