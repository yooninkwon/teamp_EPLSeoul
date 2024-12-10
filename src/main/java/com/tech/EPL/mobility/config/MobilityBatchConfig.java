package com.tech.EPL.mobility.config;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Iterator;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.tech.EPL.config.ApiKeyConfig;
import com.tech.EPL.mobility.dto.MobilityProcessedData;
import com.tech.EPL.mobility.dto.MobilityRawData;
import com.tech.EPL.mobility.repository.MobilityJpaRepository;

@Configuration
@EnableBatchProcessing // Batch 활성화
public class MobilityBatchConfig {

	// 필드 선언
    private JobBuilderFactory jobBuilderFactory;
    private StepBuilderFactory stepBuilderFactory;
    private String kakaoApiRestKey;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityBatchConfig(JobBuilderFactory jobBuilderFactory,
    		StepBuilderFactory stepBuilderFactory,
    		ApiKeyConfig apiKeyConfig) {
    	this.jobBuilderFactory = jobBuilderFactory;
    	this.stepBuilderFactory = stepBuilderFactory;
        this.kakaoApiRestKey = apiKeyConfig.getKakaoMobilityRestKey();
    }
    
    @Bean 
    public Job processJob() {
        return jobBuilderFactory.get("processJob")
            .start(processStep()) // 첫 번째 단계로 processStep()을 실행
            .build();
    }

    @Bean
    public Step processStep() {
        return stepBuilderFactory.get("processStep")
            .<MobilityRawData, MobilityProcessedData>chunk(10) // InputData 타입의 데이터를 읽어서, ProcessedData로 변환(Chunk 단위로 묶어서 처리)
            .reader(itemReader(null,null,null)) // Reader 선택 (파일 형식에따라 동적으로 ItemReader를 정의)
            .processor(dataProcessor()) // ItemProcessor를 정의
            .writer(databaseWriter(null)) // ItemWriter를 정의
            .build();
    }
    
    @Bean
    @StepScope // Step 실행 시점으로 동적 파라미터 처리
    public FlatFileItemReader<MobilityRawData> itemReader(
    		@Value("#{jobParameters['fileType']}") String fileType,
    		@Value("#{jobParameters['filePath']}") String filePath,
	    	@Value("#{jobParameters['fileName']}") String fileName) {
        if ("csv".equalsIgnoreCase(fileType)) {
            return csvReader(filePath, fileName); // CSV Reader 선택
        } else if ("json".equalsIgnoreCase(fileType)) {
            return jsonReader(filePath, fileName); // JSON Reader 선택
        } else { // 지원하지 않는 형식일 경우 예외 발생
            throw new IllegalArgumentException("Unsupported file type: " + fileType);
        }
    }
    
    @Bean
    @StepScope
    public FlatFileItemReader<MobilityRawData> csvReader(
    		@Value("#{jobParameters['filePath']}") String filePath,
	    	@Value("#{jobParameters['fileName']}") String fileName) {
    	
    	String fullFilePath = filePath + "/" + fileName;
    	System.out.println(fullFilePath + " 접근");
    	
    	FlatFileItemReader<MobilityRawData> reader = new FlatFileItemReader<>();
        reader.setResource(new FileSystemResource(fullFilePath)); // 읽을 파일의 경로
        reader.setLinesToSkip(1); // 헤더 건너뛰기
        reader.setLineMapper(new DefaultLineMapper<MobilityRawData>() {{
            setLineTokenizer(new DelimitedLineTokenizer() {{ // 구분자로 데이터 분리 : 기본 콤마
                setNames("역사_ID", "역사명", "호선", "위도", "경도"); // 전체 필드 속성명
            }});
            setFieldSetMapper(new FieldSetMapper<MobilityRawData>() { // CSV 데이터를 DTO 객체로 변환
                @Override
                public MobilityRawData mapFieldSet(FieldSet fieldSet) { // MobilityRawData 객체 생성 및 필드 매핑
                    MobilityRawData data = new MobilityRawData();
                    data.setBldn_nm(fieldSet.readString("역사명"));
                    data.setLat(fieldSet.readDouble("위도"));
                    data.setLot(fieldSet.readDouble("경도"));
                    return data;
                }
            });
        }});
        return reader;
    }
    
    @Bean
    @StepScope
    public FlatFileItemReader<MobilityRawData> jsonReader(
    		@Value("#{jobParameters['filePath']}") String filePath,
	    	@Value("#{jobParameters['fileName']}") String fileName) {  // json용 커스텀 Reader
        return new FlatFileItemReader<MobilityRawData>() { // jsonReader를 InputData로 반환
            private final Iterator<JSONObject> iterator = createJsonIterator(filePath, fileName); // JSON 파일의 내용을 Iterator로 변환

            @Override
            public MobilityRawData read() throws Exception {
                if (iterator.hasNext()) { // Iterator에서 다음 요소가 존재하는지 확인
                    JSONObject json = iterator.next(); // 다음 JSON 객체 가져오기
                    MobilityRawData rawData = new MobilityRawData();
                    rawData.setBldn_nm(json.getString("bldn_id")); // JSON 필드를 RawData에 매핑
                    rawData.setLat(json.getDouble("lat"));
                    rawData.setLot(json.getDouble("lot"));
                    return rawData; // JSON 데이터를 InputData 객체로 변환 후 반환
                }
                return null; // 모든 데이터를 읽었을 경우 null 반환
            }
        };
    }

    @StepScope
    protected Iterator<JSONObject> createJsonIterator(
    		@Value("#{jobParameters['filePath']}") String filePath,
	    	@Value("#{jobParameters['fileName']}") String fileName) {
    	
    	String fullFilePath = filePath + "/" + fileName;
    	System.out.println(fullFilePath + " 접근");
    	
        try { // 파일 내용을 읽어 JSON 객체로 변환
            File file = new File(fullFilePath);
            String content = new String(Files.readAllBytes(file.toPath())); // 파일 내용을 바이트 문자배열로 읽음
            JSONObject root = new JSONObject(content); // JSON 파일의 루트 객체 생성
            JSONArray dataArray = root.getJSONArray("DATA"); // "DATA" 키의 문자열을 JSONArray로 변환
            
            // JSONArray의 각 요소를 JSONObject로 변환하여 Iterator로 반환
            return dataArray.toList().stream() // JSON 배열을 Java List로 변환 후 스트림 처리
                    .map(obj -> new JSONObject((Map<?, ?>) obj)) // 각 Object를 JSONObject로 변환
                    .iterator(); // 변환된 리스트를 Iterator로 반환
        } catch (IOException e) {
            throw new RuntimeException("Failed to read JSON file: " + filePath, e); // 파일 읽기 실패 시 예외 발생
        }
    }
    
    @Bean
    public ItemProcessor<MobilityRawData, MobilityProcessedData> dataProcessor() {
        return rawData -> {
            // REST API 호출
            String[] districtName = fetchDistrictName(rawData.getLat(), rawData.getLot());
            
            // RawData 및 API 호출 정보를 최종 ProcessedData에 매핑
            MobilityProcessedData processedData = new MobilityProcessedData();
            processedData.setName(rawData.getBldn_nm());
            processedData.setLat(rawData.getLat());
            processedData.setLot(rawData.getLot());
            processedData.setSi(districtName[0]);
            processedData.setGu(districtName[1]);
            processedData.setDong(districtName[2]);

            return processedData;
        };
    }
    
    // 카카오맵 로컬 REST API 호출 : 좌표를 행정구역정보로 변환
    protected String[] fetchDistrictName(double lat, double lot) {
    	// URL 빌더로 파라미터 바인딩
        String url = UriComponentsBuilder.fromHttpUrl("https://dapi.kakao.com/v2/local/geo/coord2regioncode") // 기본 json 응답
            .queryParam("x", lot)
            .queryParam("y", lat)
            .build()
            .toUriString();
        
        // HTTP 헤더 구성
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoApiRestKey);
        
        // HTTP 요청 엔티티 생성 : 헤더만 포함
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        // REST API 호출
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, entity, String.class // GET으로 요청
        );
        
        // JSON 응답 파싱
        JSONObject jsonResponse = new JSONObject(response.getBody());
        JSONArray documents = jsonResponse.getJSONArray("documents");
        JSONObject districtInfo = documents.getJSONObject(0);
        
        String si = districtInfo.getString("region_1depth_name");
        String gu = districtInfo.getString("region_2depth_name");
        String dong = districtInfo.getString("region_3depth_name");
        
        return new String[]{si, gu, dong};
    }
    
    @Bean
    public ItemWriter<MobilityProcessedData> databaseWriter(MobilityJpaRepository jspRepository) { // JpaRepository 자동 주입
        return entitys -> {
            for (MobilityProcessedData entity : entitys) {
            	if ("서울특별시".equals(entity.getSi())) {
            		if (!jspRepository.existsByName(entity.getName())) { // 이름 기준 중복 확인
            			jspRepository.save(entity); // 중복되지 않은 경우 저장(CRUD 메서드)
            		}
            	}
            }
        };
    }
}