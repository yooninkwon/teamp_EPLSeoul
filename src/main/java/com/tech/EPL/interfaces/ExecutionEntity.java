package com.tech.EPL.interfaces;

import org.springframework.http.ResponseEntity;

public interface ExecutionEntity<T> {
	public ResponseEntity<T> execution();
}
