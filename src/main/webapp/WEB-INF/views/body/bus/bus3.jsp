<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>simpleMap</title>

<!-- Tmap API -->
<script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${tmapBusKey}"></script>

<!-- KakaoMap API -->
<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoBus}&libraries=services"></script>

<script type="text/javascript">
    var kakaoMap;
    var totalMarkerArr = [];
    var resultdrawArr = [];

    // KakaoMap 초기화 함수
    function initKakaoMap() {
        // Kakao 지도 생성
        var container = document.getElementById('map_div');
        var options = {
            center: new kakao.maps.LatLng(37.56520450, 126.98702028),
            level: 3
        };

        kakaoMap = new kakao.maps.Map(container, options);

        // Kakao 지도 클릭 이벤트 리스너 추가
        kakao.maps.event.addListener(kakaoMap, 'click', function(mouseEvent) {
            var latlng = mouseEvent.latLng;
            handleMapClick(latlng);
        });
    }

    // 지도 클릭 시 호출되는 함수
    function handleMapClick(latLng) {
        if (totalMarkerArr.length < 2) {
            totalMarkerArr.push(latLng); // 클릭한 좌표를 배열에 저장

            var marker = new kakao.maps.Marker({
                position: latLng,
                map: kakaoMap
            });

            // 두 좌표가 모두 클릭되면 경로를 그리기
            if (totalMarkerArr.length === 2) {
                var startCoordinate = totalMarkerArr[0];
                var endCoordinate = totalMarkerArr[1];

                // 경로 요청을 위한 AJAX 호출
                requestRoute(startCoordinate, endCoordinate);
            }
        }
    }

    // 서울역과 경복궁의 좌표 설정
    var seoulStation = new kakao.maps.LatLng(37.556195, 126.970797);  // 서울역 좌표
    var gyeongbokgung = new kakao.maps.LatLng(37.579617, 126.977041); // 경복궁 좌표

    // 길찾기 버튼 클릭 시 경로를 그리는 함수
    function findRoute() {
        requestRoute(seoulStation, gyeongbokgung);
    }

    // 경로 탐색 요청 함수 (Tmap API)
    function requestRoute(startCoordinate, endCoordinate) {
        var startX = startCoordinate.getLng();
        var startY = startCoordinate.getLat();
        var endX = endCoordinate.getLng();
        var endY = endCoordinate.getLat();

        var headers = {};
        headers["appKey"] = "${tmapBusKey}";

        $.ajax({
            method: "POST",
            headers: headers,
            url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
            async: false,
            data: {
                "startX": startX,
                "startY": startY,
                "endX": endX,
                "endY": endY,
                "reqCoordType": "WGS84GEO",
                "resCoordType": "EPSG3857",
                "startName": "출발지",
                "endName": "도착지"
            },
            success: function(response) {
                var resultData = response.features;

                // 소요 시간 및 거리 계산
                var totalTime = 0;  // 초 단위
                var totalDistance = 0;  // m 단위

                var kakaoPath = [];
                for (var i in resultData) {
                    var properties = resultData[i].properties;
                    if (properties && properties.totalTime) {
                        totalTime = properties.totalTime;  // 소요 시간 (초)
                        totalDistance = properties.totalDistance;  // 거리 (m)
                    }

                    var geometry = resultData[i].geometry;
                    if (geometry.type == "LineString") {
                        for (var j in geometry.coordinates) {
                            var latlng = new Tmapv2.Point(
                                geometry.coordinates[j][0],
                                geometry.coordinates[j][1]);
                            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                            var convertChange = new Tmapv2.LatLng(
                                convertPoint._lat,
                                convertPoint._lng);
                                  
                            kakaoPath.push(new kakao.maps.LatLng(convertChange.lat(), convertChange.lng()));
                        }
                    }
                }

                // 경로를 그리는 Polyline
                var polyline = new kakao.maps.Polyline({
                    path: kakaoPath,
                    strokeWeight: 6,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.7,
                    strokeStyle: 'solid'
                });
                polyline.setMap(kakaoMap);
                resultdrawArr.push(polyline);

                // 소요 시간과 거리 표시
                displayRouteInfo(totalTime, totalDistance);
            },
            error: function(request, status, error) {
                console.log("code:" + request.status + "\n"
                        + "message:" + request.responseText + "\n"
                        + "error:" + error);
            }
        });
    }

    // 소요 시간과 거리를 표시하는 함수
    function displayRouteInfo(time, distance) {
        var resultElement = document.getElementById('result');
        var minutes = Math.floor(time / 60);  // 초를 분으로 변환
        var seconds = time % 60;  // 남은 초
        var kilometers = (distance / 1000).toFixed(2);  // m를 km로 변환

        resultElement.innerHTML = `
            <b>소요 시간:</b> ${minutes}분 ${seconds}초<br>
            <b>총 거리:</b> ${kilometers} km
        `;
    }

    // 페이지가 로드되면 KakaoMap 초기화
    window.onload = function() {
        initKakaoMap();
    };
</script>
</head>
<body onload="initKakaoMap();">
   
    <!-- 지도와 버튼 추가 -->
    <div id="map_wrap" class="map_wrap3">
        <div id="map_div" style="width: 100%; height: 400px;"></div>
    </div>
    <button onclick="findRoute()">서울역 -> 경복궁 경로 찾기</button>
    <div class="map_act_btn_wrap clear_box"></div>
    <p id="result"></p>
    <br />
</body>
</html>