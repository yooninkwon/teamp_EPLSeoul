<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">


<link rel="stylesheet" href="/static/css/bus/busnearby.css">
<!-- 외부 CSS 파일 -->

<script
	src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${tmapBusKey}"></script>
<script
	src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoBus}&libraries=services&autoload=false"></script>

<script async
	src="https://maps.googleapis.com/maps/api/js?key=${googleBusKey}&loading=async&libraries=places">
	
</script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.8.0/proj4.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


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
		y_coord : parseFloat("${station.y_coord}"),
		stId : "${station.node_id}"
	// 숫자 값은 그대로 사용
	});
	</c:forEach>

	// 경로 탐색 요청 함수 (Tmap API)
	function requestRoute(currentPosition, secondPosition) {
		var startX = currentPosition.getLng();
		var startY = currentPosition.getLat();
		var endX = secondPosition.getLng();
		var endY = secondPosition.getLat();

		var headers = {};
		headers["appKey"] = "${tmapBusKey}";

		$
				.ajax({
					method : "POST",
					headers : headers,
					url : "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
					async : false,
					data : {
						"startX" : startX,
						"startY" : startY,
						"endX" : endX,
						"endY" : endY,
						"reqCoordType" : "WGS84GEO",
						"resCoordType" : "EPSG3857",
						"startName" : "출발지",
						"endName" : "도착지"
					},
					success : function(response) {
						var resultData = response.features;

						// 소요 시간 및 거리 계산
						var totalTime = 0; // 초 단위
						var totalDistance = 0; // m 단위

						var kakaoPath = [];
						for ( var i in resultData) {
							var properties = resultData[i].properties;
							if (properties && properties.totalTime) {
								totalTime = properties.totalTime; // 소요 시간 (초)
								totalDistance = properties.totalDistance; // 거리 (m)
							}

							var geometry = resultData[i].geometry;
							if (geometry.type == "LineString") {
								for ( var j in geometry.coordinates) {
									var latlng = new Tmapv2.Point(
											geometry.coordinates[j][0],
											geometry.coordinates[j][1]);
									var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
											latlng);
									var convertChange = new Tmapv2.LatLng(
											convertPoint._lat,
											convertPoint._lng);

									kakaoPath.push(new kakao.maps.LatLng(
											convertChange.lat(), convertChange
													.lng()));
								}
							}
						}

						// 경로를 그리는 Polyline
						var polyline = new kakao.maps.Polyline({
							path : kakaoPath,
							strokeWeight : 4,
							strokeColor : '#FF0000',
							strokeOpacity : 0.7,
							strokeStyle : 'solid'
						});
						polyline.setMap(map);
						resultdrawArr.push(polyline);

						// 소요 시간과 거리 표시
						displayRouteInfo(totalTime, totalDistance);
					},
					error : function(request, status, error) {
						console.log("code:" + request.status + "\n"
								+ "message:" + request.responseText + "\n"
								+ "error:" + error);
					}
				});
	}
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
		<button class="category-btn" data-category="BS1">
			<i class="fas fa-bus"></i>
			<!-- 숙박 아이콘 -->
			<span>정류장</span>
		</button>


	</div>


	<!-- 지도 영역 -->
	<div id="map">
		<p id="result"></p>
	</div>

	<div id="searchBar" >
		<input type="text" id="searchInput" placeholder="버스 정류장을 입력하세요.">
		<button id="searchButton">검색</button>
		<ul id="suggestions"></ul>
		<button id="drawLineButton">보행 경로</button>
	</div>


	<div id="categoryInfoList">
		<div id="emptyMessage" class="empty-message">정류장과 카테고리를 선택해주세요.</div>
	</div>


	<ul id="blogPostList">
		<!-- 블로그 리스트가 동적으로 여기에 추가됨 -->
	</ul>


	<!-- 모달창 구조 -->
	<div id="busDetailModal" class="modal">
		<div class="modal-content">
			<span class="close-btn" id="closeBtn">&times;</span>
			<div id="modalBusDetails"></div>
		</div>
	</div>


	<!-- 제목을 표시할 영역 (초기에는 비어있음) -->
	<div id="chartTitleContainer"></div>
	<canvas id="boardingChart" width="800" height="400"></canvas>

	<script src="/static/js/bus/busnearby.js"></script>

</body>
</html>