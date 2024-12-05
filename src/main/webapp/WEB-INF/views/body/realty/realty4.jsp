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
<link rel="stylesheet" href="/static/css/Realty/on_off.css" />
<title>realty_body</title>
</head>

<body>
	<h1>자치구 연도별 실거래가 등락 추이</h1>
	
	 <label for="buying">
		  <input type="radio" name="living-se" id="buying" value="buying-container" checked />
		  매매 
	 </label>
	 
	 <label for="rent">
		  <input type="radio" name="living-se" id="rent" value="rent-container" />
		  월세 		  
	 </label>
	 
	 <label for="jeonse">
		  <input type="radio" name="living-se" id="jeonse" value="jeonse-container" />
		  전세 보증금 
	 </label>
	 
	 
	<div id="all-chart-container">
		<div id="buying-container" class="on">
			<canvas id="gu-up-down-buying"></canvas>
		</div>
		<div id="rent-container" class="off">
			 <label for="rent-grfe">
				  <input type="radio" name="rent" id="rent-grfe" value="rent-grfe-container" />
				  월세 보증금 		  
			 </label>
			 
			 <label for="rent-rtfe">
				  <input type="radio" name="rent" id="rent-rtfe" value="rent-rtfe-container" />
				  월세 월납입금 
			 </label>
			<div id="rent-grfe-container" class="on">
				<canvas id="gu-up-down-rent-grfe"></canvas>
			</div>
			<div id="rent-rtfe-container" class="off">
				<canvas id="gu-up-down-rent-rtfe"></canvas>
			</div>
		</div>
		<div id="jeonse-container" class="off">
			<canvas id="gu-up-down-jeonse"></canvas>
		</div>
	</div>

<script src="/static/js/realty/realty_body4.js"></script>
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>