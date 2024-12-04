<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">



<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/metro/metro4.css"> <!-- metro1 css파일 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/static/js/metro/metro4.js"></script> <!-- metro1 스크립트 파일 -->
<title>metro_body</title>
</head>

<body>
	<div class="box">
		<div id="search">
			<h1>지하철 이용자 현황</h1>
			<div class="searchBox">
				<input type="date" id="startDate" name="startDate">
				<input type="text" class="searchInput" placeholder="지하철역을 입력하세요 ex)서울역 " />
				<button class="searchBtn">검색하기</button>
			</div>
		</div>
		<div class="resultNameBox">
			<!-- 지하철명 검색결과 -->
		</div>
		<div id="resultStation"></div> <!-- 지하철역명 + 호선 -->
		<div id="result">
			<div id="resultDay">
				<div id="dayTopic"></div>
				<div>
				<canvas id="dayChart"></canvas>
				</div>
				<div id="resultDayData"></div>
			
			</div> <!-- 일별 승하차 수 -->
			<div id="resultMonth">
				<div id="monthTopic"></div>
				<div>
				<canvas id="monthChart"></canvas>
				</div>
				<div id="resultMonthData"></div>
			</div> <!-- 월별+시간별 승하차 수 -->
			<div id="resultCongestion">
				<div id="congestionTopic">
				</div>
				<canvas id="congestionChart"></canvas>
				<div id="congestionData"></div>
			</div>
		</div>	
	</div>
	
  
  
  
</body>
</html>