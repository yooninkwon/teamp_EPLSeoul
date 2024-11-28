<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/date/date.css" />
<title>date_body</title>
</head>
<body>
	<div class="expContainer">
		<input type="button" id="expSubmit" value="다음으로"/>
	</div>
	
	<div class="seoulMap">
		<h1>데이트할 구를 선택해 주세요!</h1>
		<object id="seoulSvg" type="image/svg+xml" data="/static/data/date/Seoul_districts.svg"></object>
		<div class="mapSide">
			fdfdss
		</div>
	</div>
	
	

<script src="/static/js/date/date.js" ></script>
</body>
</html>