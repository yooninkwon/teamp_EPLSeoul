<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta charset="UTF-8">
<script	src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
<link rel="stylesheet" href="/static/css/tiles.css">
<title>realty_body</title>
</head>

<body>
  <h1> realty_body 4 </h1>
	<script>
		$(document).ready(function(){
		
			let guAvgBuying = ${guAvgBuying };
			let guAvgRent = ${guAvgRent };
			let guAvgJeonse = ${guAvgJeonse };
			
			chart(guAvgBuying, guAvgRent, guAvgJeonse);
		});
	</script>
  <h1> 전세 실거래가 통계 </h1>
  
	<canvas id="chart-gu-buying"></canvas>
	<canvas id="chart-gu-rent"></canvas>
	<canvas id="chart-gu-jeonse"></canvas>

<script src="/static/js/realty/realty_body4.js"></script>
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>