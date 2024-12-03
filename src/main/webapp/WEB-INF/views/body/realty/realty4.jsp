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
  <h1> 구별 실거래가 통계 </h1>
  
  <label for="apt">
	  <input type="radio" name="avg" id="apt" value="apt" checked />
	  아파트 통계 
  </label>
  
  <label for="single">
	  <input type="radio" name="avg" id="single" value="single" />
	  단독다가구 통계 
  </label>
  
  <label for="multi">
	  <input type="radio" name="avg" id="multi" value="multi" />
	  연립다세대 통계 
  </label>
  
  <label for="office">
	  <input type="radio" name="avg" id="office" value="office" />
	  오피스텔 통계 
  </label>
  	<div id="buying-container">
		<canvas id="chart-gu-buying"></canvas>
  	</div>
  	<div id="rent-rtfe-container">
		<canvas id="chart-gu-rent-rtfe"></canvas>
  	</div>
  	<div id="rent-grfe-container">
		<canvas id="chart-gu-rent-grfe"></canvas>
  	</div>
  	<div id="jeonse-container">
		<canvas id="chart-gu-jeonse"></canvas>
  	</div>

<script src="/static/js/realty/realty_body4.js"></script>
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>