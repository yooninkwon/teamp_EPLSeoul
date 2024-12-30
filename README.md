# teamproject_EPLSeoul     

### <기능 수정 및 개선 내용>   
#### 1. 241216 캐시를 이용한 사용자 경험 개선
Problem : 특정 시간대 Open API 호출 시 데이터 수신 지연   
Solution : 캐시 기능 적용  
Result : 서버 응답시간 개선 - 약 95% 감소        
상세내용 링크 : https://yooninkwon.tistory.com/5

---
### 서울시 교통관광정보 사이트  
****개발 기간**** : 2024.11.25 ~ 2024.12.18    
****개발 인원**** : 5명 (팀장) / 개인프로젝트  
****언어**** : Java 17, HTML/CSS, JavaScript   
****프레임워크**** : Spring Boot    
****DB**** : mariaDB 10.3.39    
   
### <담당 세부기능>  
#### 지하철 관련 정보/metro  

[metro1] 지하철역 정보
+ Open API와 카카오맵을 활용하여 지하철역의 기본 정보, 역명 유래, 위치, 비상대피 안내도, 역사 기본정보 및 편의시설 현황을 실시간으로 제공하는 서비스를 구현   
     
[metro2] 지하철 길찾기
+ Open API와 SVG 파일을 활용하여 출발지, 경유지, 도착지가 표시된 시각적 노선도와 환승 경로, 소요시간, 실시간 열차 안내를 제공        
    
[metro3] 분실물 찾기
+ Open API를 활용하여 역명과 분실물명을 검색하면 해당 역의 습득물 현황 리스트를 제공
<img src="https://github.com/user-attachments/assets/a6c04f09-d1c6-4f5e-93dd-228bb13235ab" width="550" height="250">
</br>
</br>

[metro4] 지하철 이용자 현황
+ Open API를 활용하여 역명, 일자, 월별 검색 시 지하철 일일 및 월별 이용자 수와 시간별 혼잡도 데이터를 통해 Chart.js로 시각화하여 제공     
     
[metro5] 지하철 범죄 및 사고 현황
+ CSV 형식의 지하철 범죄 및 사고 통계 데이터를 Open API를 통해 수집하고, DB에 저장한 후 MyBatis를 이용하여 Chart.js로 시각화   


