<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/mobility/mobilityChart.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<title>mobility_body</title>
</head>
<body>
	<!-- 카테고리 옵션 버튼 -->
	<div class="category-box">
		<div class="category-btn" id="fetchBikeAccData" style="background-color: #d54e50;">
			<img src="/static/images/mobility/bikeAccident.png" class="category-img" /> 자전거 교통사고 통계
		</div>
	</div>
	
	<!-- 자전거 교통사고 정보 필터 -->
	<div id="bikeAccFilter">
		<div class="filter-container">
			<!-- 조회기간 선택 옵션 -->
			<div id="yearlySelect"></div>
			<div class="discript">*선택한 연도별 데이터의 합계를 확인할 수 있습니다.</div>
		</div>
	</div>
	
	<!-- 차트 -->
	<canvas id="chart"></canvas>
<script src="/static/js/mobility/mobilityChart.js"></script>
</body>
</html>