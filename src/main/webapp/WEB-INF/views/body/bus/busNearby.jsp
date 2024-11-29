<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
    <link rel="stylesheet" href="/static/css/bus/busstation.css"> <!-- 외부 CSS 파일 -->
    <!-- Kakao Maps API SDK 로드 -->
  	<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoBus}&libraries=services&autoload=false"></script>

    <!-- 외부 JavaScript 파일 로드 -->

    <title>정류소 주변 맛집</title>

</head>

	<script>
	 
	var busStations = [];
	    <c:forEach var="station" items="${busStations}">
	        busStations.push({
	            station_name: "${station.station_name}", // 문자열 값을 안전하게 삽입
	            x_coord: parseFloat("${station.x_coord}"),  // 숫자 값은 그대로 사용
	            y_coord: parseFloat("${station.y_coord}")   // 숫자 값은 그대로 사용
	        });
	    </c:forEach>		    	    	    	    
	 </script>

<body>
    <h1 style="text-align: center;">정류장 주변 맛집</h1>

    <div id="map" ></div> <!-- 지도 영역 -->

   <div id="searchBar" style="position: relative;">
    <input type="text" id="searchInput" placeholder="서울시 장소를 입력하세요">
    <button id="searchButton">검색</button>
    <ul id="suggestions">
    </ul>
	</div>

<div id="category-buttons">
    <button class="category-btn" data-category="FD6">맛집</button>
    <button class="category-btn" data-category="CT1">카페</button>
    <button class="category-btn" data-category="HP8">병원</button>
</div>
    <script src="/static/js/bus/busnearby.js"></script>

</body>
</html>