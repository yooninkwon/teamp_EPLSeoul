<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/mobility/mobility.css">
<title>mobility_body</title>
</head>
<body>
	<div class="title">기타 이동수단</div>
	
	<!-- 역 선택 옵션 박스 -->
	<div class="station-container">
		<div>
			<span>가까운 역 찾기</span>
			<select id="guSelect">
				<option value="">구 선택</option>
			</select>
			<select id="dongSelect">
				<option value="">동 선택</option>
			</select>
		</div>
		<div id="stationSelect"></div>
	</div>
	
	<!-- 카테고리 옵션 버튼 -->
	<div class="category-box">
		<div class="category-btn" id="fetchBikeData" style="background-color: #56b38f; margin-right: 15px;">
			<img src="/static/images/mobility/bike.png" class="category-img" /> 실시간 따릉이 대여 정보
		</div>
		<div class="category-btn" id="fetchKickboardData" style="background-color: #d54e50;">
			<img src="/static/images/mobility/kickboard.png" class="category-img" /> 전동킥보드 주차구역
		</div>
	</div>
	
	<!-- 따릉이 정보 -->
	<div id="bikeInfo">
		<table class="info-table bike-color">
			<tr>
				<th class="info-title">대여소명</th>
				<td id="stationName"></td>
				<th class="info-title">총 거치대 수</th>
				<td id="stationTotRackCnt"></td>
				<th class="info-title">대여가능</th>
				<td id="stationParkingCnt"></td>
				<th class="info-title">반납가능</th>
				<td id="stationAbleRackCnt"></td>
			</tr>
		</table>
		<div class="discript">*대여가능 : 거치대에 거치된 자전거 수량 및 거치대에 거치되지 않았지만 대여소에 주차된 자전거 수량의 합을 말합니다.<br/>거치대의 수와 상관없이 자전거 주차가 가능하여 건수 차이가 날 수 있습니다.</div>
	</div>
	
	<!-- 킥보드 정보 -->
	<div id="kickboardInfo">
		<table class="info-table kickboard-color">
			<tr>
				<th class="info-title">주소</th>
				<td id="stationAddr"></td>
				<th class="info-title">거치대 유무</th>
				<td id="stationAvailable"></td>
				<th class="info-title">거치대 개수</th>
				<td id="stationRackCnt"></td>
			</tr>
		</table>
		<div class="discript">*거치대 유무 'N' : 비거치형으로, 노면에 표시된 주차구역내에 주차하시면 불법주차에 해당되지 않습니다.</div>
	</div>
	
	<!-- 카카오 지도 -->
	<input type="checkbox" id="chkBicycle" /> 자전거도로 정보 보기
	<div id="map"></div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiJsKey }&libraries=services"></script>
<script src="/static/js/mobility/mobilityMain.js"></script>
</body>
</html>