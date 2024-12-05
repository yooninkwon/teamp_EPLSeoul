<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/metro/metro2.css"> <!-- metro1 css파일 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/static/js/metro/metro2.js"></script> <!-- metro1 스크립트 파일 -->
<title>metro_body</title>

</head>
<h1> 지하철 길안내 </h1>

<body>
	<div id="box">
	 	<div id="app">
	 		<object class="mapImage" alt="서울지하철노선도" data="/static/data/metro/mapimage.svg" id="mapObject"></object>
	    </div>    
	    <div id="inputBox">
	    	<span>출발지 <input class="searchInput" id="departure" type="text" placeholder="지하철역명을 입력하세요"/> 역</span> 
	    	<span>도착지 <input class="searchInput" id="destination" type="text" placeholder="ex)서울" /> 역</span>
	    	 <button class="searchBtn">검색</button>
	    </div>
    </div>
</body>
</html>

