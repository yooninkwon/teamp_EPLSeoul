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
	               <a href="/epl"><img src="/static/images/logo.png" alt="Logo"></a>
	               <div><a href="/epl"><img class="title_img" src="/static/images/EatPlayLoveSeoul.png" alt="Eat, Play, Love Seoul" /></a></div>
	           </div>
	           <!-- 오른쪽 끝 제목 -->
	           <div class="sub-title">서울의 모든 것</div>
	       </div>
	       
	       <!-- Navigation Menu -->
	       <div class="nav-menu">
	           <a href="/epl/busNearby" >BUS</a>
	           <a href="/epl/metro">METRO</a>
	           <a href="/epl/mobility/info">MOBILITY</a>
	           <a href="/epl/date">DATE</a>
	           <a class="realty" href="/epl/realty">REALTY</a>
	       </div>
	   </div>

	   <!-- Breadcrumb -->
			   
	   <div class="breadcrumb">
	       <div class="left">BUS</div>
	       <div class="right"></div>
	   </div>
	   <script src="/static/js/tiles_header.js"></script> 
</body>
</html>