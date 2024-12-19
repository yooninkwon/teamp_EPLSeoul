package com.tech.EPL.mobility.config;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.tech.EPL.mobility.dto.MobilityRawData;
import com.tech.EPL.mobility.dto.mobility_abd;

@Configuration
@EnableBatchProcessing // Batch 활성화
public class MobilityAbdBatchConfig {

	// 필드 선언
    private JobBuilderFactory jobBuilderFactory;
    private StepBuilderFactory stepBuilderFactory;
    
    // 단일 생성자 주입(@Autowired 생략)
    public MobilityAbdBatchConfig(JobBuilderFactory jobBuilderFactory,
    		StepBuilderFactory stepBuilderFactory) {
    	this.jobBuilderFactory = jobBuilderFactory;
    	this.stepBuilderFactory = stepBuilderFactory;
    }
    
    @Bean(name = "abd")
    public Job abdProcessJob() {
        return jobBuilderFactory.get("abdProcessJob") // 고유 Job 이름
            .start(abdProcessStep()) // 첫 번째 단계로 processStep()을 실행
            .build();
    }

    @Bean
    public Step abdProcessStep() {
        return stepBuilderFactory.get("abdProcessStep") // 고유 Step 이름
    		.tasklet(abdProcessTasklet()) // Tasklet 기반 Step 구성 : 전체 데이터를 한 번에 처리할 때 유용
            .build();
    }
    
    @Bean
    public Tasklet abdProcessTasklet() {
        return (contribution, chunkContext) -> {
            MobilityRawData rawData = abdItemReader(null).read(); // ItemReader를 정의
            List<mobility_abd> entities = abdDataProcessor().process(rawData); // ItemProcessor를 정의
            abdDatabaseWriter(null).write(entities); // ItemWriter를 정의
            return RepeatStatus.FINISHED;
        };
    }
    
    @Bean
    @StepScope
    public ItemReader<MobilityRawData> abdItemReader(
            @Value("#{jobParameters['fullFilePath']}") String fullFilePath) {
        return new ItemReader<MobilityRawData>() {
            private boolean read = false; // Reader가 한 번만 실행되도록 제어하는 플래그

            @Override
            public MobilityRawData read() throws Exception {
                if (!read) {
                    // 파일의 모든 줄을 읽어 List<String>로 반환
                    List<String> lines = Files.readAllLines(Paths.get(fullFilePath), StandardCharsets.UTF_8);
                    MobilityRawData data = new MobilityRawData();
                    data.setRawLines(lines); // 전체 데이터를 rawLines에 저장
                    
                    read = true; // 파일 전체를 읽어옴(완료)
                    return data;
                } else {
                    return null;
                }
            }
        };
    }
    
    @Bean
    public ItemProcessor<MobilityRawData, List<mobility_abd>> abdDataProcessor() {
        return rawData -> {
            List<String> lines = rawData.getRawLines(); // 모든 행 데이터
            String[] years = lines.get(0).split(","); // 첫 번째 행에서 'year' 정보를 추출
            String[] types = lines.get(1).split(","); // 두 번째 행에서 'type' 정보를 추출
            String[] items = lines.get(2).split(","); // 세 번째 행에서 'item' 정보를 추출

            List<mobility_abd> entities = new ArrayList<>(); // 최종 엔티티 데이터 리스트를 생성

            // 데이터 행(5행 이후) 반복 처리
            for (int i = 4; i < lines.size(); i++) {
                // 각 행(지역 및 데이터) 처리
                String[] data = lines.get(i).split(","); // 5행부터 데이터 행 처리
                String district = data[1]; // 2열은 자치구 정보

                // 각 열(데이터 값) 반복 처리
                for (int j = 2; j < data.length; j++) { // 3열부터 데이터
                    // cnt 값을 읽고 변환
                    String cntStr = data[j];
                    int cnt = cntStr.equals("-") ? 0 : Integer.parseInt(cntStr); // '-'는 0으로 변환

                    // ProcessedData 객체 생성 및 필드 매핑
                    mobility_abd entity = new mobility_abd();
                    entity.setDistrict(district);
                    entity.setYear(years[j]);
                    entity.setType(types[j]);
                    entity.setItem(items[j]);
                    entity.setCnt(cnt);

                    entities.add(entity);
                }
            }

            return entities;
        };
    }
    
    @Bean
    public JdbcBatchItemWriter<mobility_abd> abdDatabaseWriter(DataSource dataSource) { // JDBC Batch 처리 : 다량의 데이터를 한 번의 네트워크 호출로 삽입
        return new JdbcBatchItemWriterBuilder<mobility_abd>()
            .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
            .sql("INSERT INTO mobility_abd (district, year, type, item, cnt) VALUES (:district, :year, :type, :item, :cnt)")
            .dataSource(dataSource)
            .build();
    }
}