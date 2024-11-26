package com.tech.EPL.realty.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/") // 추후 변경
public class ELPRealtyRestController {
	private final WebClient webClientXml;
	private final WebClient webClientJson;

    public ELPRealtyRestController(
    		@Qualifier("webClientForXml") WebClient webClientXml,
    		@Qualifier("webClientForJson") WebClient webClientJson) {
    	this.webClientXml = webClientXml;
        this.webClientJson = webClientJson;
    }
    
//    public Mono<ResponseEntity<"타입">> exp_xml() {
//    	return webClientXml.get().uri(""). 어쩌구 저쩌구
//
//	}
//    
//    public Mono<ResponseEntity<"타입">> exp_json() {
//    	return webClientXml.get().uri(""). 어쩌구 저쩌구
//    }
}
