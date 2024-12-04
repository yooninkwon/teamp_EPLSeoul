<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">



<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/metro/metro3.css"> <!-- metro1 css파일 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/static/js/metro/metro3.js"></script> <!-- metro1 스크립트 파일 -->
<title>metro_body</title>
</head>

<body>
	<div class="box">
		<div id="search">
			<h1> 분실물 찾기 </h1>
			<div class="searchBox">
				<input type="text" class="searchInput" id="station" placeholder="지하철역을 입력하세요" />
				<input type="text" class="searchInput" id="lostItem" placeholder="분실물을 입력하세요" />
				<button class="searchBtn">검색하기</button>
			</div>
		</div>
		<div id="result">
			<div id="resultLostItem">
				<div id="lostItemTopic"></div>
				<div id="resultLostItemData"></div>
			</div> 
		</div>	
	</div>





  
</body>
</html>