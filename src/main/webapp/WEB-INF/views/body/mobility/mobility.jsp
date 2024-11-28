<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/mobility.css">
<title>mobility_body</title>
</head>
<body>
<div class="title">기타 이동수단</div>
<div class="discript">왼쪽 메뉴바를 클릭하여 원하는 정보를 지도에서 확인하세요.</div>
<div class="stationContainer">
	<div>
		<span>가까운 역 찾기</span>
		<select>
			<option>구
			<option>구옵션1
			<option>구옵션2
		</select>
		<select>
			<option>동
			<option>동옵션1
			<option>동옵션2
		</select>
	</div>
	<div>
		
	</div>
</div>

<!--
공공 API 데이터를 활용해 지도에 마커를 표시.
RESTful API를 통해 데이터를 가져오고, 이를 JavaScript로 활용.
JavaScript를 사용해 지도에 데이터 시각화.
API 데이터에서 필요한 정보를 필터링 및 변환.
-->
<input type="checkbox" id="chkBicycle" /> 자전거도로 정보 보기

<p><em>대여소를 클릭하여 상세 정보를 확인하세요.</em></p> 
<p id="result"></p>

<div id="map"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey }"></script>
<script src="/static/js/mobility.js"></script>
</body>
</html>