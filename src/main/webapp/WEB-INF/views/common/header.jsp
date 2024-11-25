<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>epl Header</title>
<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
</head>
<body>
	<div id="header">
		<div class="logo">
			<a href="/"><img src="logo.png" alt="Logo" /></a>
		</div>
		<div class="icons">
			<a href="/" class="home-icon"><i class="fa-solid fa-house"></i></a>
			<a href="#" class="power-icon"><i class="fa-solid fa-power-off"></i></a>
		</div>
	</div>
</body>
</html>