<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">



<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->

<title>realty_body</title>
</head>

<body>
  <h1> realty_body 6 </h1>
  	<form action="/epl/rent-file" method="post">
		<p>전, 월세</p>
		<input type="hidden" name="type" value="전월세" />
		<input name="fileName" type="text" size="120" />
		<input type="submit" />
	</form>

	<form action="/epl/buy-file" method="post">
		<p>매매</p>
		<input type="hidden" name="type" value="매매" />
		<input name="fileName" type="text" size="120" />
		<input type="submit" />
	</form>
 	<br />
	<br />
	<p>매매, 월세, 전세 데이터 AVG, MIN, MAX 데이터베이스 INSERT</p>
	<form action="/epl/realty2" method="post">
		<input type="submit" value="버튼" />
	</form>

<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>