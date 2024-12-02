package com.tech.EPL.realty.enums;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum GuName {
	종로구("종로구", 11110),
	중구("중구", 11140),
	용산구("용산구", 11170),
	성동구("성동구", 11200),
	광진구("광진구", 11215),
	동대문구("동대문구", 11230),
	중랑구("중랑구", 11260),
	성북구("성북구", 11290),
	강북구("강북구", 11305),
	도봉구("도봉구", 11320),
	노원구("노원구", 11350),
	은평구("은평구", 11380),
	서대문구("서대문구", 11410),
	마포구("마포구", 11440),
	양천구("양천구", 11470),
	강서구("강서구", 11500),
	구로구("구로구", 11530),
	금천구("금천구", 11545),
	영등포구("영등포구", 11560),
	동작구("동작구", 11590),
	관악구("관악구", 11620),
	서초구("서초구", 11650),
	강남구("강남구", 11680),
	송파구("송파구", 11710),
	강동구("강동구", 11740)
	;
	
	// 실제 법정동 코드는 10자리이지만, API에서 요구하는 값은 5자리임
	
	private final String guName;
    private final int guCode;

	GuName(String guName, int guCode) {
	    this.guName = guName;
	    this.guCode = guCode;
	}
	
    public String getGuName() {
        return guName;
    }

    public int getGuCode() {
        return guCode;
    }
        
    private static final Map<String, GuName> BY_GU_NAME =
            Stream.of(values()).collect(Collectors.toMap(GuName::getGuName, Function.identity()));

    private static final Map<Integer, GuName> BY_GU_CODE =
            Stream.of(values()).collect(Collectors.toMap(GuName::getGuCode, Function.identity()));

    public static GuName valueOfGuName(String guName) {
        return BY_GU_NAME.get(guName);
    }

    public static GuName valueOfGuCode(int guCode) {
        return BY_GU_CODE.get(guCode);
    }
	
}
