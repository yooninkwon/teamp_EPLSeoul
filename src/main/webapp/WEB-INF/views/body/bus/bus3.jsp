<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>simpleMap</title>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

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

                // 카카오 맵에 경로를 그리기 위한 Polyline 객체 생성
                var kakaoPath = [];
                for (var i in resultData) {
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
                            
                            // 카카오맵 좌표 형식으로 변환하여 배열에 추가
                            kakaoPath.push(new kakao.maps.LatLng(convertChange.lat(), convertChange.lng()));
                        }
                    }
                }

                // 카카오 맵에 경로 추가
                var polyline = new kakao.maps.Polyline({
                    path: kakaoPath,  // 카카오 맵에 그릴 경로
                    strokeWeight: 6,  // 선의 두께
                    strokeColor: '#FF0000',  // 선의 색
                    strokeOpacity: 0.7,  // 선의 투명도
                    strokeStyle: 'solid'  // 선 스타일
                });

                // 카카오 맵에 경로 추가
                polyline.setMap(kakaoMap);

                // 카카오 맵에서 그린 경로 배열에 추가
                resultdrawArr.push(polyline);
            },
            error: function(request, status, error) {
                console.log("code:" + request.status + "\n"
                        + "message:" + request.responseText + "\n"
                        + "error:" + error);
            }
        });
    }

    // 페이지가 로드되면 KakaoMap 초기화
    window.onload = function() {
        initKakaoMap();
    };
</script>
</head>
<body onload="initKakaoMap();">
   
    <!-- 190430 기존 지도를 모두 이미지 처리 위해 주석 처리 S -->
    <div id="map_wrap" class="map_wrap3">
        <div id="map_div" style="width: 100%; height: 400px;"></div>
    </div>
    <div class="map_act_btn_wrap clear_box"></div>
    <p id="result"></p>
    <br />
</body>
</html>