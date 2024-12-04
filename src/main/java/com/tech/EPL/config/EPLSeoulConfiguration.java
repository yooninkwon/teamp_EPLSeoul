package com.tech.EPL.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableCaching // 캐싱 활성화
@EnableScheduling // 스케쥴링 어노테이션
public class EPLSeoulConfiguration {

}
