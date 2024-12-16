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
    // 페이지 로드 시 중앙으로 스크롤 이동
    window.onload = function() {
        if (localStorage.getItem("scrollToCenter") === "true") {
            window.scrollTo({
                top: document.body.scrollHeight / 2 - window.innerHeight / 2,
                behavior: 'smooth'
            });
            localStorage.removeItem("scrollToCenter"); // 스크롤 후 저장된 정보 삭제
        }
    };

    // 서브메뉴 클릭 시 스크롤 중앙으로 이동
    function scrollToCenter() {
        localStorage.setItem("scrollToCenter", "true");
    }
</script>
</head>

<body>
    <div id="sidebar-left">
        <ul class="submenu">
            <li><a href="/epl/bus" onclick="scrollToCenter()">버스 길찾기</a></li>
            <li><a href="/epl/busNearby" onclick="scrollToCenter()">정류장 주변 시설</a></li>
            <li><a href="/epl/bus3" onclick="scrollToCenter()">버스내용3</a></li>
            <li><a href="#4" onclick="scrollToCenter()">버스내용4</a></li>
        </ul>
    </div>
</body>
</html>