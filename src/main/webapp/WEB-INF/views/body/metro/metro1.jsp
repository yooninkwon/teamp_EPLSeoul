<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">


<%-- <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao }&&libraries=services&&autoload=false"></script> --%>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao }&libraries=services&autoload=false"></script>
<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/metro/metro1.css"> <!-- metro1 css파일 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/static/js/metro/metro1.js"></script> <!-- metro1 스크립트 파일 -->

<title>metro_body</title>
</head>


<body>
	<div class="box">
		<div id="search">
			<h1>지하철역 정보</h1>
			<div class="searchBox">
				<input type="text" class="searchInput" placeholder="지하철역을 입력하세요" />
				<button class="searchBtn">검색하기</button>
			</div>
			<div class="resultNameBox">
			</div>
		</div>
		<div id="result">
			<div id="resultStation"></div> <!-- 지하철역명 + 호선 -->
			<div id="resultHistory"></div> <!-- 지하철역명 유래 -->
			<div id="resultMapName"></div>
			<div id="resultMap" style="width:70%;height:550px;"></div>
			<div id="resultInfo"></div> <!-- 지하철역 기본정보 넣는곳 -->
				
			
		</div>	
	
	
	
	</div>



  
</body>
</html>