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
	        <li><a href="<c:url value='/epl/mobility/1' />">모빌리티내용1</a></li>
	        <li><a href="<c:url value='/epl/mobility/2' />">모빌리티내용2</a></li>
	        <li><a href="<c:url value='/epl/mobility/3' />">모빌리티내용3</a></li>
	        <li><a href="<c:url value='/epl/mobility/4' />">모빌리티내용4</a></li>
	    </ul>
    </div>

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
</body>
</html>