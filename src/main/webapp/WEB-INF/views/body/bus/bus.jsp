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

    <title>실시간 버스 위치 추적</title>

</head>

	<script>
	var map, markers = []; 
	var busStations = [];
	    <c:forEach var="station" items="${busStations}">
	        busStations.push({
	            station_name: "${station.station_name}", // 문자열 값을 안전하게 삽입
	            x_coord: parseFloat("${station.x_coord}"),  // 숫자 값은 그대로 사용
	            y_coord: parseFloat("${station.y_coord}"),   // 숫자 값은 그대로 사용
	            stId: "${station.node_id}"
	        });
	        </c:forEach>		    	    	    	    
	   
	 </script>


<body>
    <h1 style="text-align: center;">실시간 버스 위치 추적</h1>

    
	<!-- 지도와 infoPanel을 포함하는 컨테이너 -->
	<div id="mapContainer">
	    <!-- 버스 정보를 표시할 영역 -->
	    <div id="infoPanel">
	        <h3>버스 도착 정보</h3>
	        <div id="busArrivalList">버스 정보를 불러오는 중...</div>
	    </div>
	
	    <!-- 지도 영역 -->
	    <div id="map"></div>
	</div>
	
	<!-- 검색바 영역 -->
	<div id="searchBar" style="position: relative; margin-top: 10px;">
	    <input type="text" id="searchInput" placeholder="서울시 장소를 입력하세요">
	    <button id="searchButton">검색</button>
	    <ul id="suggestions"></ul>
	</div>


	<!-- 모달창 구조 -->
	<div id="busDetailModal" class="modal">
	    <div class="modal-content">
	        <span class="close-btn" id="closeModal">&times;</span>
	        <div id="modalBusDetails"></div>
	    </div>
	</div>


    <script src="/static/js/bus/busstation.js"></script>

</body>
</html>