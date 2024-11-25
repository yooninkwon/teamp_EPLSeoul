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
	<div class="header">
	       <!-- Logo Section -->
	       <div class="logo-section">
	           <!-- 로고와 제목 -->
	           <div class="logo">
	               <a href="/"><img src="/static/images/logo.png" alt="Logo"></a>
	               <h1>Eat Play Love, 서울</h1>
	           </div>
	           <!-- 오른쪽 끝 제목 -->
	           <div class="sub-title">서울의 모든 것</div>
	       </div>
	       
	       <!-- Navigation Menu -->
	       <div class="nav-menu">
	           <a href="/bus" class="active">BUS</a>
	           <a href="/metro">METRO</a>
	           <a href="/walk-minimobility">WALK & MINIMOBILITY</a>
	           <a href="/play">PLAY</a>
	           <a href="/history">HISTORY</a>
	       </div>
	   </div>

	   <!-- Breadcrumb -->
			   
	   <div class="breadcrumb">
	       <div class="left">BUS</div>
	       <div class="right">EPL 서울 > home > BUS</div>
	   </div>
</body>
</html>