package com.tech.EPL.realty.config;

import java.lang.reflect.Field;
import java.util.ArrayList;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TestDataBuilder {

	public static <T> T generateTestData(Class<T> clazz) {

		try {
			T object = clazz.getDeclaredConstructor().newInstance();

			for (Field field : clazz.getDeclaredFields()) {
				field.setAccessible(true);
				if (field.getType().equals(String.class)) {
					field.set(object, "Test_Value");
				} else if (field.getType().equals(int.class)) {
					field.set(object, 123456);
				} else if (field.getType().equals(double.class)) {
					field.set(object, 12345.67D);
				} else if (field.getType().equals(ArrayList.class)) {
					field.set(object, new ArrayList<>());
				} else if (field.getType().equals(float.class)) {
					field.set(object, 0.2F);
				}
			}
			return object;
		} catch (Exception e) {
			log.error("Exception: ", e);
			return null;
		}
	}
}
