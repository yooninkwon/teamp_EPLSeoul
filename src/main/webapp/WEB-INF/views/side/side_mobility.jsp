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
	const menuItems = document.querySelectorAll('.submenu div');

    // 모든 메뉴에서 active 클래스 제거
    function clearActiveClass() {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    // 클릭한 메뉴에만 active 클래스 추가
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            clearActiveClass();
            this.classList.add('active');
        });
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