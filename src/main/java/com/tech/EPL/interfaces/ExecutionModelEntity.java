package com.tech.EPL.interfaces;

import org.springframework.http.ResponseEntity;

public interface ExecutionModelEntity<T> {
	public ResponseEntity<T> execution();
}
