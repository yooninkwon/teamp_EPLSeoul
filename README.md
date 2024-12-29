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
>검색시 지하철명 리스트(ex 사당 검색시 사당(2호선),사당(4호선)) - 지하철 정보 open api    
>지하철 역명의 유래 - 역명의 유래 Open API    
>역 위치 - 지하철 정보 Open API x,y값 + 카카오맵 Api    
>안내도 - 비상대피 안내도정보 Open API    
>역사 기본정보 - 지하철 정보 Open API   
>편의시설 현황 - 지하철 편의시설 현황 Open API    
     
[metro2] 지하철 길찾기
>지하철노선도 svg파일 - 오픈소스로 구함 (+출발지, 도착지 및 경유지 표시)     
>길찾기 : 지하철역 좌표 Open API + 지하철 환승 경로 Open API / 소요시간 및 거리    
>상세안내 : 지하철 출발, 도착지 경로 Open API    
>실시간 열차안내 : 출발지에서 도착지로 가는 방향의 실시간 열차 안내    
    
[metro3] 분실물 찾기
>역명, 분실물명 검색시 해당 역 및 습득물 현황 리스트 Open API    
     
[metro4] 지하철 이용자 현황
>역, 일자, 월 지하철 이용자 및 시간별 혼잡도 통계 Open API + Chart.js     
     
[metro5] 지하철 범죄 및 사고 현황
> 지하철 내 범죄 및 사고 통계 Open API(csv data)    


