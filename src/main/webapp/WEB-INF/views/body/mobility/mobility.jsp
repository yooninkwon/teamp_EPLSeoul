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
<div class="discript">왼쪽 메뉴바를 클릭하여 원하는 정보를 지도에서 확인하세요.</div>
<div class="stationContainer">
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

<input type="checkbox" id="chkBicycle" /> 자전거도로 정보 보기

<p><em>대여소를 클릭하여 상세 정보를 확인하세요.</em></p> 
<p id="result"></p>

<div id="map"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiJsKey }&libraries=services"></script>
<script src="/static/js/mobility/mobility.js"></script>
</body>
</html>