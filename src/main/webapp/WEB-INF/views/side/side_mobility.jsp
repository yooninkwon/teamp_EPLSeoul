<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tiles Side</title>
</head>
<script>
// document.addEventListener('DOMContentLoaded', function () {
//     const submenuLinks = document.querySelectorAll('.submenu a');
//     const currentPath = window.location.pathname; // 현재 URL 경로 가져오기

//     // 모든 링크에서 active 클래스 제거
//     submenuLinks.forEach(link => {
//         link.classList.remove('active');
//     });

//     // 현재 경로에 맞는 링크에만 active 클래스 추가
//     submenuLinks.forEach(link => {
//         if (currentPath.startsWith(link.getAttribute('href'))) {
//             link.classList.add('active');
//         }
//     });
// });
</script>
</head>
<body>
    <div id="sidebar-left">
	    <ul class="submenu">	        
	        <li><a href="/epl/mobility/info">역주변 대여소 찾기</a></li>
	        <li><a href="/epl/mobility/cluster">행정구별 통계 지도</a></li>
	        <li><a href="/epl/mobility/chart">통계 그래프</a></li>
	    </ul>
    </div>
</body>
</html>