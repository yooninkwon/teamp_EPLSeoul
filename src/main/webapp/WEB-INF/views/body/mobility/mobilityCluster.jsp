<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/mobility/mobilityCluster.css">
<title>mobility_body</title>
</head>
<body>
	<!-- 카테고리 옵션 버튼 -->
	<div class="category-box">
		<div class="category-btn" id="fetchBikeRentData" style="background-color: #56b38f; margin-right: 15px;">
			<img src="/static/images/mobility/bike.png" class="category-img" /> 따릉이 대여소별 대여 통계
		</div>
	</div>
	
	<!-- 따릉이 대여 통계 정보 -->
	<div id="bikeRentFilter">
		<!-- 조회기간 선택 옵션 -->
		<div id="monthlySelect"></div>
		<div class="discript">*지난 달부터 최근 1년간의 데이터를 조회할 수 있습니다.</div>
		<div class="discript" style="color: red;">*기간 선택 후 3초 후에 데이터가 로드됩니다.</div>
		<!-- 행정구 선택 옵션 박스 -->
		<div class="station-container">
			<div>행정구 찾기</div>
			<div id="districtSelect"><span class="discript">*조회 기간을 선택하세요. </span></div>
		</div>
		<div>
			<table class="info-table bike-color">
				<tr>
					<th class="info-title">행정구</th>
					<td id="district"></td>
					<th class="info-title">대여소 개수</th>
					<td id="totStationCnt"></td>
					<th class="info-title">기간 내 대여 건수</th>
					<td id="districtTotRentCnt"></td>
				</tr>
			</table>
			<table class="info-table bike-color">
				<tr>
					<th class="info-title">대여소명</th>
					<td id="stationName"></td>
					<th class="info-title">기간 내 대여 건수</th>
					<td id="stationTotRentCnt"></td>
				</tr>
			</table>
		</div>
		<div class="discript">*선택한 월별 대여건수의 합계를 확인할 수 있습니다. </div>
	</div>
	
	<!-- 카카오 지도 -->
	<div id="map"></div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiJsKey }&libraries=clusterer"></script>
<script src="/static/js/mobility/mobilityCluster.js"></script>
</body>
</html>