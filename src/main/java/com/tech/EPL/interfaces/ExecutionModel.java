package com.tech.EPL.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

public interface ExecutionModel<T> {
	public ResponseEntity<T> execution(Model model);
}
