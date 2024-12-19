<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script	src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
<link rel="stylesheet" href="/static/css/tiles.css">
<link rel="stylesheet" href="/static/css/Realty/on_off.css" />
<link rel="stylesheet" href="/static/css/Realty/realty.css" />
<title>realty_body</title>
</head>

<body>
	<div id="title-radio-div">
		<h1 class="body-title"> 연도별 서울시 인구수 통계 (2007 - 2023) </h1>
		<br />
		 <label for="seoul" class="g_box _1">
			  <input type="radio" name="chart-type" id="seoul" value="seoul-chart-container" checked />
			  서울시 종합 
		 </label>
		 
		 <label for="gu" class="g_box _1">
			  <input type="radio" name="chart-type" id="gu" value="jumin-chart-container" />
			  자치구 	  
		 </label>
	</div>
	
	<!--  -->
	<div id="all-chart-container">
		<div id="seoul-chart-container" class="on">
			<canvas id="jumin-chart-seoul"></canvas>
		</div>
		<div id="gu-chart-container" class="off">
			<canvas id="jumin-chart-gu"></canvas>
		</div>
	</div>
	
	<script src="/static/js/realty/realty_body5.js"></script>
</body>
</html>