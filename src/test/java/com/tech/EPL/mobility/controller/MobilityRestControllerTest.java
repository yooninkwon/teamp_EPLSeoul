package com.tech.EPL.mobility.controller;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.tech.EPL.mobility.service.MobilityBatchService;

@WebMvcTest(MobilityRestController.class)
public class MobilityRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MobilityBatchService mobilityBatchService;
    
    @Test
    @DisplayName("runBatch 트리거 - 파라미터 전달")
    void testRunBatch() throws Exception {
    	// 테스트용 파라미터
    	String workType = "sbd";
    	String fileType = "json";
    	
    	// Given: Service 계층 동작을 Mocking
    	JobExecution mockJobExecution = Mockito.mock(JobExecution.class);
    	Mockito.when(mockJobExecution.getStatus()).thenReturn(BatchStatus.COMPLETED);
    	Mockito.when(mobilityBatchService.run(workType, fileType)).thenReturn(mockJobExecution); 
	    // Mock `run()` 호출 시 가짜 JobExecution 객체 반환

        // When: MockMvc를 통해 Controller 호출
        mockMvc.perform(get("/epl/mobility/data/runBatch/{workType}/{fileType}",workType, fileType))
               .andExpect(status().isOk()); // Then: HTTP 상태 확인
        
        // mobilityBatchService 호출 확인
        verify(mobilityBatchService, Mockito.times(1)).run(workType, fileType);
    }
}
