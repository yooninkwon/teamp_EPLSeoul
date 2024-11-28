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
  <h1> realty_body 1 </h1>
	<form action="/epl/rent-file" method="post">
		<p>전, 월세</p>
		<input type="hidden" name="type" value="전월세" />
		<input name="fileName" type="text" size="50" />
		<input type="submit" />
	</form>

	<form action="/epl/buy-file" method="post">
		<p>매매</p>
		<input type="hidden" name="type" value="매매" />
		<input name="fileName" type="text" size="50" />
		<input type="submit" />
	</form>
	
<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>