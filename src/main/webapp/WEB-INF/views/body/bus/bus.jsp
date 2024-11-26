<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
    <title>실시간 버스 위치 추적</title>
     <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoBus }"></script>
    <style>
        #map {
            width: 50%;
            height: 500px; /* 지도 높이 설정 */
        }
    </style>
</head>

<body>
    <h1>실시간 버스 위치 추적</h1>
    <div id="map"></div> <!-- 카카오 지도 영역 -->

    <script>
        // 카카오 지도 초기화
        var container = document.getElementById('map'); // 지도를 표시할 div
        var options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 좌표 (서울 시청)
            level: 3 // 지도 확대 레벨
        };
        var map = new kakao.maps.Map(container, options);

        // 마커 추가
        var markerPosition = new kakao.maps.LatLng(37.5665, 126.9780); // 마커가 표시될 위치
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 지도 클릭 이벤트 (좌표 표시)
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            var latlng = mouseEvent.latLng;
            alert('위도: ' + latlng.getLat() + ', 경도: ' + latlng.getLng());
        });
    </script>
</body>
</html>