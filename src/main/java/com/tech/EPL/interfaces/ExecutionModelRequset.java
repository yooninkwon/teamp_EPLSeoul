package com.tech.EPL.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

public interface ExecutionModelRequset {
	public void execution(Model model, HttpServletRequest requset);
}
