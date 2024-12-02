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
<title>realty_body</title>
</head>

<body>
	<script>
		$(document).ready(function(){
			let rentStat =  ${rentStat };
			
			chart(rentStat);
		});
	</script>
  <h1> 월세 실거래가 통계  </h1>
  <label for="rtfe">
  <input type="radio" name="avg" id="rtfe" checked value="rtfe" />
  월세 통계 </label>
  <label for="grfe">
  <input type="radio" name="avg" id="grfe" value="grfe" />
  보증금 통계 </label>
	<div id="rtfe-chart" class="on">
		<canvas id="chart-rent-rtfe"></canvas>
	</div>
	<div id="grfe-chart" class="off">
		<canvas id="chart-rent-grfe"></canvas>	
	</div>
<script src="/static/js/realty/realty_body2.js"></script>
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>