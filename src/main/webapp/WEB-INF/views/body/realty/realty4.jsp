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
	<h1>자치구 연도별 실거래가 등락 추이</h1>
	
	 <label for="apt">
		  <input type="radio" name="bldg-usg" id="apt" value="apt" checked />
		  아파트 
	 </label>
	 
	 <label for="single">
		  <input type="radio" name="bldg-usg" id="single" value="single" />
		  단독다가구 		  
	 </label>
	 
	 <label for="multi">
		  <input type="radio" name="bldg-usg" id="multi" value="multi" />
		  연립다세대  
	 </label>
	 
	 <label for="office">
		  <input type="radio" name="bldg-usg" id="office" value="office" />
		  오피스텔  
	 </label>

	<br />
	
	<!--  -->	
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
			<div id="buying-apt-container" class="on">
				<h3>아파트 매매가 평균 </h3>
				<canvas id="gu-up-down-buying-apt"></canvas>
			</div>
			<div id="buying-single-container" class="off">
				<h3>단독다가구 매매가 평균 </h3>
				<canvas id="gu-up-down-buying-single"></canvas>
			</div>
			<div id="buying-multi-container" class="off">
				<h3>연립다세대 매매가 평균 </h3>
				<canvas id="gu-up-down-buying-multi"></canvas>
			</div>
			<div id="buying-office-container" class="off">
				<h3>오피스텔 매매가 평균 </h3>
				<canvas id="gu-up-down-buying-office"></canvas>
			</div>
		</div>
		<div id="rent-container" class="off">
			 <label for="rent-grfe">
				  <input type="radio" name="rent-se" id="rent-grfe" value="rent-grfe-container" checked />
				  월세 보증금 		  
			 </label>
			 
			 <label for="rent-rtfe">
				  <input type="radio" name="rent-se" id="rent-rtfe" value="rent-rtfe-container" />
				  월세 월납입금 
			 </label>
			<div id="rent-grfe-container" class="on">
				<div id="rent-grfe-apt-container" class="on">
					<h3>아파트 월세 보증금 평균</h3>
					<canvas id="gu-up-down-rent-grfe-apt"></canvas>
				</div>
				<div id="rent-grfe-single-container" class="off">
					<h3>단독다가구 월세 보증금 평균</h3>
					<canvas id="gu-up-down-rent-grfe-single"></canvas>
				</div>
				<div id="rent-grfe-multi-container" class="off">
					<h3>연립다세대 월세 보증금 평균</h3>
					<canvas id="gu-up-down-rent-grfe-multi"></canvas>
				</div>
				<div id="rent-grfe-office-container" class="off">
					<h3>오피스텔 월세 보증금 평균</h3>
					<canvas id="gu-up-down-rent-grfe-office"></canvas>
				</div>
			</div>
			<div id="rent-rtfe-container" class="off">
				<div id="rent-rtfe-apt-container" class="on">
					<h3>아파트 월세 월납입금 평균</h3>
					<canvas id="gu-up-down-rent-rtfe-apt"></canvas>
				</div>
				<div id="rent-rtfe-single-container" class="off">
					<h3>단독다가구 월세 월납입금 평균</h3>
					<canvas id="gu-up-down-rent-rtfe-single"></canvas>
				</div>
				<div id="rent-rtfe-multi-container" class="off">
					<h3>연립다세대 월세 월납입금 평균</h3>
					<canvas id="gu-up-down-rent-rtfe-multi"></canvas>
				</div>
				<div id="rent-rtfe-office-container" class="off">
					<h3>오피스텔 월세 월납입금 평균</h3>
					<canvas id="gu-up-down-rent-rtfe-office"></canvas>
				</div>
			</div>
		</div>
		<div id="jeonse-container" class="off">
			<div id="jeonse-apt-container" class="on">
				<h3>아파트 전세 보증금 평균</h3>
				<canvas id="gu-up-down-jeonse-apt"></canvas>
			</div>
			<div id="jeonse-single-container" class="on">
				<h3>단독다가구 전세 보증금 평균</h3>
				<canvas id="gu-up-down-jeonse-single"></canvas>
			</div>
			<div id="jeonse-multi-container" class="on">
				<h3>연립다세대 전세 보증금 평균</h3>
				<canvas id="gu-up-down-jeonse-multi"></canvas>
			</div>
			<div id="jeonse-office-container" class="on">
				<h3>오피스텔 전세 보증금 평균</h3>
				<canvas id="gu-up-down-jeonse-office"></canvas>
			</div>
		</div>
	</div>

<script src="/static/js/realty/realty_body4.js"></script>
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>