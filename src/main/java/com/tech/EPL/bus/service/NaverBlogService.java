package com.tech.EPL.bus.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.EPL.bus.dto.BlogPost;


@Service
public class NaverBlogService {
    private static final String CLIENT_ID = "BRPgky88uQX_HnaKnfGu"; // 발급받은 클라이언트 ID
    private static final String CLIENT_SECRET = "bvaQoqKUuG"; // 발급받은 클라이언트 Secret

    // 네이버 블로그 검색 API 호출
    public List<BlogPost> getBlogPosts(String query, int display) throws IOException {
        String apiUrl = "https://openapi.naver.com/v1/search/blog.json?query=" + query + "&display=" + display;

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
                String thumbnail = extractImageFromDescription(description); // 본문에서 이미지 추출

                // 크롤링을 통한 대표 이미지 가져오기 (옵션)
                if (thumbnail == null) {
                    thumbnail = fetchThumbnailFromBlog(item.get("link").asText());
                }

                BlogPost post = new BlogPost(
                    item.get("title").asText(),
                    item.get("link").asText(),
                    description,
                    thumbnail
                );
                blogPosts.add(post);
            }

            return blogPosts;
        }
    }

    // 본문에서 이미지 URL 추출
    private String extractImageFromDescription(String description) {
        String imgRegex = "<img[^>]+src=[\"']([^\"']+)[\"']";
        Pattern pattern = Pattern.compile(imgRegex);
        Matcher matcher = pattern.matcher(description);

        if (matcher.find()) {
            String imgUrl = matcher.group(1);
            // 절대 경로로 변환 (네이버 블로그의 경우 상대 경로가 포함될 수 있음)
            if (!imgUrl.startsWith("http")) {
                imgUrl = "https://blog.naver.com" + imgUrl; // 상대 경로를 절대 경로로 변환
            }
            return imgUrl;
        }
        return null; // 이미지가 없을 경우
    }

    // 링크에서 대표 이미지 크롤링
    private String fetchThumbnailFromBlog(String blogUrl) {
        try {
            Document doc = Jsoup.connect(blogUrl).get();
            String thumbnail = doc.select("meta[property=og:image]").attr("content");  // og:image 메타 태그에서 대표 이미지 추출
            return thumbnail.isEmpty() ? null : thumbnail;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}