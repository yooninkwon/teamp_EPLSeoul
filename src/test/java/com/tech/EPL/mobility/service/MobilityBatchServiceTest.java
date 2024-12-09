package com.tech.EPL.mobility.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class MobilityBatchServiceTest {
    
    @Autowired
    private MobilityBatchService mobilityBatchService; // 실제 객체
    
    @MockBean
    private JobLauncher jobLauncher;
    @MockBean
    private Job processJob;

    private static final String basePath = "C:/Users/eldorado/OneDrive/Codefile/Albamon/testData";
    
    @BeforeAll
    static void setUpOnce() throws Exception {
        // 테스트용 폴더 및 파일 생성
        Files.createDirectories(Path.of(basePath, "json"));
        Files.createDirectories(Path.of(basePath, "csv"));
        Files.createDirectories(Path.of(basePath, "xml"));

        Files.createFile(Path.of(basePath, "json", "test.json"));
        Files.createFile(Path.of(basePath, "csv", "test.json"));
    }

    @AfterAll
    static void tearDownOnce() throws Exception {
    	// 테스트용 폴더 및 파일 삭제
        Files.walk(Path.of(basePath)) // 깊이 우선 탐색(DFS)으로 순회
             .map(Path::toFile)
             .forEach(File::delete);
    }
    
    @Test
    @DisplayName("파일 경로가 없거나 폴더가 아닌 경우")
    void testInvalidDirectory() throws Exception {
    	// Given: 잘못된 filePath
        String fileType = "invalid";
        
        // When: run 메서드 호출
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            mobilityBatchService.run(fileType);
        });
        
        // Then: 적절한 예외 메시지 확인
        assertThat(exception.getMessage()).contains("폴더 경로가 잘못되었습니다");
        
        // jobLauncher.run이 호출되지 않았는지 확인
        verify(jobLauncher, times(0)).run(any(Job.class), any(JobParameters.class));
    }

    @Test
    @DisplayName("파일이 존재하지 않을 경우")
    void testNoFilesInDirectory() throws Exception {
    	// Given: 파일이 존재하지 않는 filePath
        String fileType = "xml";
        
        // When: run 메서드 호출
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            mobilityBatchService.run(fileType);
        });
        
        // Then: 적절한 예외 메시지 확인
        assertThat(exception.getMessage()).contains("적합한 xml 파일이 없습니다");

        // jobLauncher.run이 호출되지 않았는지 확인
        verify(jobLauncher, times(0)).run(any(Job.class), any(JobParameters.class));
    }

    @Test
    @DisplayName("파일 확장자가 맞지 않는 경우")
    void testIncorrectFileExtension() throws Exception {
    	// Given: 매칭되지 않는 fileType
    	String fileType = "csv";
    	
        // When: run 메서드 호출
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            mobilityBatchService.run(fileType);
        });
        
        // Then: 적절한 예외 메시지 확인
        assertThat(exception.getMessage()).contains("적합한 csv 파일이 없습니다");

        // jobLauncher.run이 호출되지 않았는지 확인
        verify(jobLauncher, times(0)).run(any(Job.class), any(JobParameters.class));
    }

    @Test
    @DisplayName("정상 작동하는 경우")
    void testValidRun() throws Exception {
    	// Given: 올바른 fileType
        String fileType = "json";
        
        // When: run 메서드 호출
        JobExecution mockJobExecution = Mockito.mock(JobExecution.class);
        when(jobLauncher.run(any(Job.class), any(JobParameters.class))).thenReturn(mockJobExecution);
        
        JobExecution execution = mobilityBatchService.run(fileType);

        // jobLauncher.run() 호출 확인
        verify(jobLauncher, times(1)).run(eq(processJob), any(JobParameters.class));

        // JobExecution 상태 확인
        assertThat(execution).isNotNull();
    }
}
