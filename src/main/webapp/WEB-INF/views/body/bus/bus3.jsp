<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>네이버 지도 예제</title>
    <script type="text/javascript" src="https://openapi.naver.com/openapi/maps.js?clientId=0ooec570bh"></script>
    <style>
        #map {
            width: 100%;
            height: 500px;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="text/javascript">
        // 지도 객체 생성
        var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.5665, 126.9780), // 서울의 위도와 경도
            zoom: 10
        });

        // 마커 추가
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.5665, 126.9780),
            map: map
        });
    </script>
</body>
</html>