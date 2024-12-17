package com.tech.EPL.mobility.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.FileSystemResource;

import com.tech.EPL.mobility.dto.mobility_sbd;
import com.tech.EPL.mobility.dto.MobilityRawData;
import com.tech.EPL.mobility.repository.MobilitySbdJpaRepository;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS) // @BeforeAll 비정적 메서드 사용 가능
class MobilitySbdBatchConfigTest {

    @Autowired
    private MobilitySbdBatchConfig batchConfig;
    
    @MockBean
    private MobilitySbdJpaRepository jpaRepository;

    private static final String basePath = "C:/Users/eldorado/OneDrive/Codefile/Albamon/testData";
    
    @BeforeAll
    static void setUp() throws Exception {
    	// 테스트용 폴더 및 파일 생성
    	Files.createDirectories(Path.of(basePath, "json"));
    	Files.createDirectories(Path.of(basePath, "csv"));
    	
    	JSONArray dataArray = new JSONArray();
    	dataArray.put(new JSONObject().put("bldn_id","9996").put("route","5호선").put("lot","127.193877").put("bldn_nm","미사").put("lat","37.560927"));
    	dataArray.put(new JSONObject().put("bldn_id","9995").put("route","5호선").put("lot","127.17593").put("bldn_nm","강일").put("lat","37.55749"));
    	
    	JSONObject testJson = new JSONObject();
    	testJson.put("DESCRIPTION", new JSONObject().put("LAT", "위도").put("BLDN_NM", "역사명").put("ROUTE", "호선").put("BLDN_ID", "역사_ID").put("LOT", "경도"));
    	testJson.put("DATA", dataArray);
    	
    	Files.writeString(Path.of(basePath, "json", "test.json"), testJson.toString());
    	Files.writeString(Path.of(basePath, "csv", "test.csv"), "\"역사_ID\",\"역사명\",\"호선\",\"위도\",\"경도\"\n\"9996\",\"미사\",\"5호선\",\"37.560927\",\"127.193877\"\n\"9995\",\"강일\",\"5호선\",\"37.55749\",\"127.17593\"");
    }
    
    @AfterAll
    static void tearDown() throws Exception {
    	// 테스트용 폴더 및 파일 삭제
    	Files.walk(Path.of(basePath))
    	.map(Path::toFile)
    	.forEach(File::delete);
    }
    
    @TestConfiguration // @StepScope 활성화가 필요 없는 테스트 전용 Bean으로 교체
    public class MockStepScopeConfig {
    	@Bean
    	ItemReader<MobilityRawData> testItemReader(String fileType, String filePath, String fileName) throws JSONException {
    	    if ("json".equalsIgnoreCase(fileType)) {
    	        return testJsonReader(filePath, fileName); // JSON Reader 선택
    	    } else if ("csv".equalsIgnoreCase(fileType)) {
    	        return testCsvReader(filePath, fileName); // CSV Reader 선택
    	    } else {
    	        throw new IllegalArgumentException("Unsupported file type: " + fileType);
    	    }
    	}

        @Bean
        FlatFileItemReader<MobilityRawData> testCsvReader(String filePath, String fileName) {
            FlatFileItemReader<MobilityRawData> reader = new FlatFileItemReader<>();
            reader.setResource(new FileSystemResource(filePath + "/" + fileName));
            reader.setLinesToSkip(1);
            reader.setLineMapper(new DefaultLineMapper<MobilityRawData>() {{
                setLineTokenizer(new DelimitedLineTokenizer() {{
                    setNames("역사_ID", "역사명", "호선", "위도", "경도");
                }});
                setFieldSetMapper(new FieldSetMapper<MobilityRawData>() {
                    @Override
                    public MobilityRawData mapFieldSet(FieldSet fieldSet) {
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
        ItemReader<MobilityRawData> testJsonReader(String filePath, String fileName) throws JSONException {
            return new ItemReader<MobilityRawData>() {
                private final Iterator<JSONObject> iterator = testCreateJsonIterator(filePath, fileName);
                
                @Override
                public MobilityRawData read() throws Exception {
                    if (iterator.hasNext()) {
                        JSONObject json = iterator.next();
                        MobilityRawData rawData = new MobilityRawData();
                        rawData.setBldn_nm(json.getString("bldn_nm"));
                        rawData.setLat(json.getDouble("lat"));
                        rawData.setLot(json.getDouble("lot"));
                        return rawData;
                    }
                    return null;
                }
            };
        }
        
        private Iterator<JSONObject> testCreateJsonIterator(String filePath, String fileName) throws JSONException {
            try {
                File file = new File(filePath + "/" + fileName);
                String content = new String(Files.readAllBytes(file.toPath()));
                JSONObject root = new JSONObject(content);
                JSONArray dataArray = root.getJSONArray("DATA");
                // 테스트 환경에서 toList() 메서드 사용 불가(예상)
                List<JSONObject> jsonObjects = new ArrayList<>();
                for (int i = 0; i < dataArray.length(); i++) {
                    jsonObjects.add(dataArray.getJSONObject(i));
                }
                return jsonObjects.iterator();
            } catch (IOException e) {
                throw new RuntimeException("Failed to read JSON file: " + filePath, e);
            }
        }
    }
    
    @Test
    @DisplayName("JSON Reader가 올바르게 선택되어 데이터를 읽어오는지 확인")
    void testItemReaderSelectsJsonReader() throws Exception {
        // Given: JSON 파일 경로와 파일 타입
        String fileType = "json";
        String filePath = basePath + "/json";
        String fileName = "test.json";

        // When: itemReader를 호출하고 데이터를 읽음
        MockStepScopeConfig mockConfig = new MockStepScopeConfig();
        ItemReader<MobilityRawData> reader = mockConfig.testItemReader(fileType, filePath, fileName);
        MobilityRawData rawData1 = reader.read();
        MobilityRawData rawData2 = reader.read();
        MobilityRawData rawData3 = reader.read();

        // Then: Reader가 JSON Reader인지 확인하고 읽은 데이터 검증
        assertThat(reader).isInstanceOf(ItemReader.class); // jsonReader 타입과 일치하는지 확인
        assertThat(rawData1.getBldn_nm()).isEqualTo("미사");
        assertThat(rawData2.getBldn_nm()).isEqualTo("강일");
        assertThat(rawData3).isNull(); // 데이터 끝
    }
    
    @Test
    @DisplayName("CSV Reader가 올바르게 선택되어 데이터를 읽어오는지 확인")
    void testItemReaderSelectsCsvReader() throws Exception {
    	// Given: CSV 파일 경로와 파일 타입
    	String fileType = "csv";
    	String filePath = basePath + "/csv";
        String fileName = "test.csv";
    	
    	// When: itemReader를 호출하고 데이터를 읽음
    	MockStepScopeConfig mockConfig = new MockStepScopeConfig();
    	FlatFileItemReader<MobilityRawData> reader = (FlatFileItemReader<MobilityRawData>) mockConfig.testItemReader(fileType, filePath, fileName);
    	reader.open(new ExecutionContext()); // CSV Reader 초기화 : 테스트 환경에서는 Spring Batch 컨텍스트가 동작하지 않으므로 수동 처리
    	MobilityRawData rawData1 = reader.read();
    	MobilityRawData rawData2 = reader.read();
    	MobilityRawData rawData3 = reader.read();
    	
    	// Then: Reader가 CSV Reader인지 확인하고 읽은 데이터 검증
    	assertThat(reader).isInstanceOf(FlatFileItemReader.class); // csvReader 타입과 일치하는지 확인
    	assertThat(rawData1.getBldn_nm()).isEqualTo("미사");
    	assertThat(rawData2.getBldn_nm()).isEqualTo("강일");
    	assertThat(rawData3).isNull(); // 데이터 끝
    }
    
    @Test
    @DisplayName("Processor가 데이터를 변환하는지 확인")
    void testProcessor() throws Exception {
        // Given: Mock 데이터 생성
        MobilityRawData rawData = new MobilityRawData();
        rawData.setBldn_nm("미사");
        rawData.setLat(37.560927);
        rawData.setLot(127.193877);

        // When: 데이터를 처리
        MobilitySbdBatchConfig spyBatchConfig = spy(batchConfig);
        mobility_sbd processedData = spyBatchConfig.sbdDataProcessor().process(rawData);

        // Then: 변환된 데이터 검증
        assertThat(processedData.getName()).isEqualTo("미사");
        assertThat(processedData.getLat()).isEqualTo(37.560927);
        assertThat(processedData.getLot()).isEqualTo(127.193877);
        assertThat(processedData.getGu()).isEqualTo("하남시");
        assertThat(processedData.getDong()).isEqualTo("망월동");
    }
    
    @Test
    @DisplayName("Writer가 중복 데이터를 걸러내는지 확인")
    void testWriterWithDuplicates() throws Exception {
        mobility_sbd data = new mobility_sbd();
        data.setName("미사");

        when(jpaRepository.existsByName("미사")).thenReturn(true);

        ItemWriter<mobility_sbd> writer = batchConfig.sbdDatabaseWriter(jpaRepository);

        writer.write(Arrays.asList(data));

        verify(jpaRepository, times(0)).save(data); // 중복 데이터는 저장되지 않음
    }
    
    @Test
    @DisplayName("Writer가 데이터를 저장하는지 확인")
    void testWriter() throws Exception {
        // Given: Writer 생성
        mobility_sbd data1 = new mobility_sbd();
        data1.setName("미사");

        mobility_sbd data2 = new mobility_sbd();
        data2.setName("강일");

        when(jpaRepository.existsByName(any(String.class))).thenReturn(false);

        ItemWriter<mobility_sbd> writer = batchConfig.sbdDatabaseWriter(jpaRepository);

        // When: 데이터를 저장
        writer.write(Arrays.asList(data1, data2));

        // Then: JpaRepository 호출 검증
        verify(jpaRepository, times(1)).save(data1);
        verify(jpaRepository, times(1)).save(data2);
    }
}