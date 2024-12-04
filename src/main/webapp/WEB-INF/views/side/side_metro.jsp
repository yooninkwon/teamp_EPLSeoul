<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tiles Side</title>
<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->

<script>
document.addEventListener('DOMContentLoaded', function () {
    const submenuLinks = document.querySelectorAll('.submenu a');
    const currentPath = window.location.pathname; // 현재 URL 경로 가져오기

    // 모든 링크에서 active 클래스 제거
    submenuLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 현재 경로에 맞는 링크에만 active 클래스 추가
    submenuLinks.forEach(link => {
        if (currentPath.startsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});


</script>



</head>
<body>
    <div id="sidebar-left">
	    <ul class="submenu">
	        <li><a href="/epl/metro1">지하철역 정보</a></li>
	        <li><a href="/epl/metro2">자하철내용2</a></li>
	        <li><a href="/epl/metro3">분실물 습득물 정보</a></li>
	        <li><a href="/epl/metro4">지하철 이용자 현황</a></li>
	        <li><a href="/epl/metro5">지하철 범죄 및 사고 현황</a></li>
	    </ul>
    </div>
</body>
</html>