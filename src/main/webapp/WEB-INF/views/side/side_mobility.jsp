<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tiles Side</title>
</head>
<body>
    <div id="sidebar-left">
	    <ul class="submenu">
	        <li><div id="fetchBikeData">따릉이</div></li>
	        <li><div id="fetchScooterData">전동킥보드</div></li>
	        <li><hr></li>
	        <li>안전주의!</li>
	    </ul>
    </div>

<script src="/static/js/mobility.js"></script>
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
    
 	// 따릉이 대여소 정보 호출
	document.getElementById('fetchBikeData').addEventListener('click', function () {
		fetchAndDisplayData('/static/images/mobility/marker_bike.png', 'bikeStationMaster');
	});
	
	// 전동킥보드 주차구역 정보 호출
	document.getElementById('fetchScooterData').addEventListener('click', function () {
		fetchAndDisplayData('/static/images/mobility/marker_kickboard.png', 'parkingKickboard', true);
	});
});
</script>
</body>
</html>