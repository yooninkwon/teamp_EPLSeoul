<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/tiles.css">
<!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/bus/busnearby.css">
<!-- 외부 CSS 파일 -->
<!-- Kakao Maps API SDK 로드 -->
<script
	src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoBus}&libraries=services&autoload=false"></script>

<script async
	src="https://maps.googleapis.com/maps/api/js?key=${googleBusKey}&loading=async&libraries=places">	
</script>


<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">


<title>정류소 주변 맛집</title>
</head>

<script>
	var busStations = [];
	<c:forEach var="station" items="${busStations}">
	busStations.push({
		station_name : "${station.station_name}", // 문자열 값을 안전하게 삽입
		x_coord : parseFloat("${station.x_coord}"), // 숫자 값은 그대로 사용
		y_coord : parseFloat("${station.y_coord}")
	// 숫자 값은 그대로 사용
	});
	</c:forEach>
</script>

<body>
	<h1 style="text-align: center;">정류장 주변 시설</h1>

	<div id="category-buttons">
		<button class="category-btn" data-category="FD6">
			<i class="fas fa-utensils"></i>
			<!-- 맛집 아이콘 -->
			<span>맛집</span>
		</button>
		<button class="category-btn" data-category="CE7">
			<i class="fas fa-coffee"></i>
			<!-- 카페 아이콘 -->
			<span>카페</span>
		</button>
		<button class="category-btn" data-category="HP8">
			<i class="fas fa-hospital"></i>
			<!-- 병원 아이콘 -->
			<span>병원</span>
		</button>
		<button class="category-btn" data-category="PM9">
			<i class="fas fa-prescription-bottle-alt"></i>
			<!-- 약국 아이콘 -->
			<span>약국</span>
		</button>
		<button class="category-btn" data-category="CS2">
			<i class="fas fa-store"></i>
			<!-- 편의점 아이콘 -->
			<span>편의점</span>
		</button>
		<button class="category-btn" data-category="PK6">
			<i class="fas fa-parking"></i>
			<!-- 주차장 아이콘 -->
			<span>주차장</span>
		</button>
		<button class="category-btn" data-category="SW8">
			<i class="fas fa-subway"></i>
			<!-- 지하철역 아이콘 -->
			<span>지하철역</span>
		</button>
		<button class="category-btn" data-category="BK9">
			<i class="fas fa-piggy-bank"></i>
			<!-- 은행 아이콘 -->
			<span>은행</span>
		</button>
		<button class="category-btn" data-category="CT1">
			<i class="fas fa-landmark"></i>
			<!-- 문화시설 아이콘 -->
			<span>문화시설</span>
		</button>
		<button class="category-btn" data-category="AD5">
			<i class="fas fa-hotel"></i>
			<!-- 숙박 아이콘 -->
			<span>숙박</span>
		</button>
	</div>


	<!-- 지도 영역 -->
	<div id="map"></div>


	<div id="searchBar" style="position: relative;">
		<input type="text" id="searchInput" placeholder="버스 정류장을 입력하세요.">
		<button id="searchButton">검색</button>
		<ul id="suggestions">
		</ul>
	</div>


	<div id="categoryInfoList">
	  <div id="emptyMessage" class="empty-message">정류장과 카테고리를 선택해주세요.</div>
	
	</div>

	<h1>블로그 리뷰</h1>
	<ul id="blogPostList">
		<!-- 블로그 리스트가 동적으로 여기에 추가됨 -->
	</ul>


	<script src="/static/js/bus/busnearby.js"></script>

</body>
</html>