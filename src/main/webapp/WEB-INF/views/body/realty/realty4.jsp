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
	<h1> 구별 실거래가 통계 (2020 - 2024) </h1>
	
	<label for="apt">
		 <input type="radio" name="avg" id="apt" value="apt" checked />
		 아파트 
	</label>
	
	<label for="single">
		 <input type="radio" name="avg" id="single" value="single" />
		 단독다가구 
	</label>
	
	<label for="multi">
		 <input type="radio" name="avg" id="multi" value="multi" />
		 연립다세대 
	</label>
	
	<label for="office">
		 <input type="radio" name="avg" id="office" value="office" />
		 오피스텔 
	</label>
	 
	<br />
	
	<!--  -->
	 <label for="buying">
		  <input type="radio" name="living-se" id="buying" value="buying" checked />
		  매매 
	 </label>
	 
	 <label for="rent-grfe">
		  <input type="radio" name="living-se" id="rent-grfe" value="rent-grfe" />
		  월세 보증금 		  
	 </label>
	 
	 <label for="rent-rtfe">
		  <input type="radio" name="living-se" id="rent-rtfe" value="rent-rtfe" />
		  월세 월납입금 
	 </label>
	 
	 <label for="jeonse">
		  <input type="radio" name="living-se" id="jeonse" value="jeonse" />
		  전세 보증금 
	 </label>
	 
	<br />
	
	<!--  -->
	<label for="avg">
		 <input type="radio" name="chart-type" id="avg" value="avg" checked />
		 평균가 
	</label>
	
	<label for="max">
		 <input type="radio" name="chart-type" id="max" value="max" />
		 최고가 
	</label>
	
	<label for="min">
		 <input type="radio" name="chart-type" id="min" value="min" />
		 최저가 
	</label>
	
	<!--  -->
	<div id="buying-container" class="on">
		<div id="buy-avg-div" class="on">
			<canvas id="chart-gu-buying-avg"></canvas>			
		</div>
		<div id="buy-max-div" class="off">
			<canvas id="chart-gu-buying-max"></canvas>
		</div>
		<div id="buy-min-div" class="off">
			<canvas id="chart-gu-buying-min"></canvas>
		</div>
	</div>
	<div id="rent-rtfe-container" class="off">
		<div id="rent-rtfe-avg-div" class="on">
			<canvas id="chart-gu-rent-rtfe-avg"></canvas>		
		</div>
		<div id="rent-rtfe-max-div" class="off">
			<canvas id="chart-gu-rent-rtfe-max"></canvas>
		</div>
		<div id="rent-rtfe-min-div" class="off">
			<canvas id="chart-gu-rent-rtfe-min"></canvas>
		</div>
	</div>
	<div id="rent-grfe-container" class="off">
		<div id="rent-grfe-avg-div" class="on">
			<canvas id="chart-gu-rent-grfe-avg"></canvas>
		</div>
		<div id="rent-grfe-max-div" class="off">
			<canvas id="chart-gu-rent-grfe-max"></canvas>
		</div>
		<div id="rent-grfe-min-div" class="off">
			<canvas id="chart-gu-rent-grfe-min"></canvas>
		</div>
	</div>
	<div id="jeonse-container" class="off">
		<div id="jeonse-avg-div" class="on">
			<canvas id="chart-gu-jeonse-avg"></canvas>
		</div>
		<div id="jeonse-max-div" class="off">
			<canvas id="chart-gu-jeonse-max"></canvas>
		</div>
		<div id="jeonse-min-div" class="off">
			<canvas id="chart-gu-jeonse-min"></canvas>
		</div>
	</div>

<script src="/static/js/realty/realty_body4.js"></script>
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>