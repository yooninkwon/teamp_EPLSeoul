package com.tech.EPL.bus.service;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.bus.dto.BlogPost;
import com.tech.EPL.config.ApiKeyConfig;


@Service
public class NaverBlogService {
 
	private ApiKeyConfig apiKeyConfig;
	
	public NaverBlogService(ApiKeyConfig apiKeyConfig) {
		this.apiKeyConfig = apiKeyConfig;
	}
	
    // 네이버 블로그 검색 API 호출
    public List<BlogPost> getBlogPosts(String query, int display) throws IOException {
        // 쿼리 파라미터 URL 인코딩
        String encodedQuery = URLEncoder.encode(query, "UTF-8");

        // 인코딩된 쿼리를 URL에 포함
        String apiUrl = "https://openapi.naver.com/v1/search/blog.json?query=" + encodedQuery + "&display=" + display;

        String CLIENT_ID = apiKeyConfig.getNaverClientBus();
        String CLIENT_SECRET = apiKeyConfig.getNaverSecretBus();
              
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpGet request = new HttpGet(apiUrl);
            request.addHeader("X-Naver-Client-Id", CLIENT_ID);
            request.addHeader("X-Naver-Client-Secret", CLIENT_SECRET);

            CloseableHttpResponse response = client.execute(request);
            HttpEntity entity = response.getEntity();

            if (entity == null) {
                throw new IOException("No response received from the server");
            }

            String responseBody = EntityUtils.toString(entity, "UTF-8");
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);

            List<BlogPost> blogPosts = new ArrayList<>();
            for (JsonNode item : rootNode.get("items")) {
                String description = item.get("description").asText();

                BlogPost post = new BlogPost(
                    item.get("title").asText(),
                    item.get("link").asText(),
                    description
                );
                blogPosts.add(post);
            }

            return blogPosts;
        }
    }

    
}