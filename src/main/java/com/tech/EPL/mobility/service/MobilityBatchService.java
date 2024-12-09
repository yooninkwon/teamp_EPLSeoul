package com.tech.EPL.mobility.service;

import java.io.File;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MobilityBatchService {
	
	@Value("${batch.file.path}") // 고정된 filePath 사용
	private String basePath;
	
	// 필드 선언
	private final JobLauncher jobLauncher;
	private final Job processJob;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityBatchService(JobLauncher jobLauncher,
    		Job processJob) {
    	this.jobLauncher = jobLauncher;
    	this.processJob = processJob;
    }
    
    public JobExecution run(String fileType) throws Exception {
    	// 동적 경로 생성
        String filePath = basePath + "/" + fileType;
        
        // 유효성 확인
        File directory = new File(filePath);
        if (!directory.exists() || !directory.isDirectory()) {
            throw new IllegalArgumentException("폴더 경로가 잘못되었습니다: " + filePath);
        }
        File[] files = directory.listFiles((dir, name) -> {
            if ("json".equalsIgnoreCase(fileType)) {
                return name.toLowerCase().endsWith(".json");
            } else if ("csv".equalsIgnoreCase(fileType)) {
                return name.toLowerCase().endsWith(".csv");
            }
            return false; // 지원하지 않는 fileType은 제외
        });
        if (files == null || files.length == 0) {
            throw new IllegalArgumentException("해당 폴더에 적합한 " + fileType + " 파일이 없습니다: " + filePath);
        }
        
        String fileName = files[0].getName();
        System.out.println(fileName + " 데이터 저장 실행");
        
        // 파라미터 전달
    	JobParameters jobParameters = new JobParametersBuilder()
    			.addString("fileType", fileType)
    	        .addString("filePath", filePath)
    	        .addString("fileName", fileName)
    	        .addLong("executionTime", System.currentTimeMillis()) // 고유 실행 ID
    	        .toJobParameters();
    	
        return jobLauncher.run(processJob, jobParameters);
    }
}
