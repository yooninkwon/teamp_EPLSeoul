<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>epl Header</title>
<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->


<script>
// document.addEventListener('DOMContentLoaded', function () {
//     const navLinks = document.querySelectorAll('.nav-menu a');
//     const submenuLinks = document.querySelectorAll('.submenu a');
//     const currentPath = window.location.pathname;


    // 메뉴별 첫 번째 사이드바 경로 설정
    const firstSubmenuLinks = {
        '/epl/bus': '/epl/bus/', // 버스 길찾기
        '/epl/metro': '/epl/metro1', // 지하철 첫 메뉴
        '/epl/mobility': '/epl/mobility/info', // 워크 & 모빌리티 첫 메뉴
        '/epl/date': '/epl/date/', // 데이트 첫 메뉴
        '/epl/realty1': '/epl/realty1', // 부동산 첫 메뉴
    };

//     // nav-menu 클릭 이벤트 추가
//     navLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault(); // 기본 링크 동작 방지
//             const targetPath = link.getAttribute('href');
//             const firstSubmenuPath = firstSubmenuLinks[targetPath];

//             if (firstSubmenuPath) {
//                 const baseUrl = window.location.origin; // 현재 도메인 가져오기
//                 window.location.href = baseUrl + firstSubmenuPath; // 절대경로 생성하여 이동
//             } else {
//                 window.location.href = targetPath; // 경로가 없으면 기본 경로로 이동
//             }
//         });
//     });

//     // 기존 active 클래스 설정
//     navLinks.forEach(link => {
//         if (currentPath.startsWith(link.getAttribute('href'))) {
//             link.classList.add('active');
//             updateBreadcrumb(link);
//         }
//     });

//     submenuLinks.forEach(link => {
//         if (currentPath.startsWith(link.getAttribute('href'))) {
//             link.classList.add('active');
//             updateBreadcrumb(link);
//         }
//     });
// });

// // breadcrumb를 URL에 맞게 설정하는 함수
// function updateBreadcrumb(link) {
//     const breadcrumbLeft = document.querySelector('.breadcrumb .left');
//     const breadcrumbRight = document.querySelector('.breadcrumb .right');

//     const currentPath = window.location.pathname;

//     // nav-menu에서 활성화된 링크의 텍스트를 가져옵니다.
//     const activeNavLink = document.querySelector('.nav-menu a.active');
//     const pageName = activeNavLink ? activeNavLink.textContent.toUpperCase() : '';

//     // submenu 항목을 클릭했을 경우, 그에 맞는 상위 메뉴를 찾아서 breadcrumbLeft에 반영
//     const activeSubmenuLink = document.querySelector('.submenu a.active');
//     const submenuPageName = activeSubmenuLink ? activeSubmenuLink.textContent.toUpperCase() : '';

//     // breadcrumbLeft에는 nav-menu 또는 submenu의 이름을 반영
//     breadcrumbLeft.textContent = submenuPageName;

//     // breadcrumbRight에는 상위 메뉴와 현재 경로를 포함한 경로 설정
//     breadcrumbRight.textContent = `EPL 서울 > \${pageName} > \${submenuPageName}`;
// }
</script>

</head>
<body>
	<div class="header">
	     	       <!-- Logo Section -->
	       <div class="logo-section">
	           <!-- 로고와 제목 -->
	           <div class="logo">
	               <a href="/epl"><img src="/static/images/logo.png" alt="Logo"></a>
	               <div><a href="/epl"><img class="title_img" src="/static/images/EatPlayLoveSeoul.png" alt="Eat, Play, Love Seoul" /></a></div>
	           </div>
	           <!-- 오른쪽 끝 제목 -->
	           <div class="sub-title">서울의 모든 것</div>
	       </div>
	       
	       <!-- Navigation Menu -->
	       <div class="nav-menu">
	           <a href="/epl/bus" >BUS</a>
	           <a href="/epl/metro">METRO</a>
	           <a href="/epl/mobility">MOBILITY</a>
	           <a href="/epl/date">DATE</a>
	           <a class="realty" href="/epl/realty">REALTY</a>
	       </div>
	   </div>

	   <!-- Breadcrumb -->
			   
	   <div class="breadcrumb">
	       <div class="left">BUS</div>
	       <div class="right"></div>
	   </div>
	   <script src="/static/js/tiles_header.js"></script> 
</body>
</html>