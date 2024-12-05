package com.tech.EPL.bus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BlogPost {
    private String title;
    private String link;
    private String description;
    private String thumbnail; // 대표 이미지 URL 추가
}
