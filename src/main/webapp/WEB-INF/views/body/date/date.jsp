<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/static/css/tiles.css">
<!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/date/date.css" />
<script src="/static/js/date/date.js"></script>
<title>date_body</title>
</head>
<body>
	
	<div class="expContainer">
		<input type="button" id="expSubmit" value="다음으로" />
	</div>

	<div class="seoulMap">
		<h1>데이트할 구를 선택해 주세요!</h1>
		<object id="seoulSvg" type="image/svg+xml"
			data="/static/data/date/Seoul_districts.svg"></object>

		<div class="mapSide">
			<div id="districtImg"></div>
			<h3 id="districtSlogan"></h3>
			<h1 id="districtName"></h1>
			<div class="memoDiv">
				<h3 id="districtMemo"></h3>
				<input type="button" id="distSubmit" value="여기로 정했어요!" />
			</div>
			<div class="landmarkDiv">
				<h2 id="landmark"></h2>
				<div id="landmarkImg"></div>
			</div>
		</div>
	</div>

	<div class="liking">
		<h1>취향을 알려주세요!</h1>
		<div id="likeStatic">
			<div class="likeTop">
				<h1>차분하고</h1>
				<h1>조용한 데이트가</h1>
				<h1>좋아요!</h1>
			</div>
			<div class="likeBottom">
				<h2>-맛집 탐방</h2>
				<h2>-산책로 산책</h2>
				<h2>-분위기 좋은 카페</h2>
				<h2>-영화관</h2>
			</div>
		</div>
		<div id="likeDynamic">
			<div class="likeTop">
				<h1>신나고</h1>
				<h1>활동적인 데이트가</h1>
				<h1>좋아요!</h1>
			</div>
			<div class="likeBottom">
				<h2>-액티비티</h2>
				<h2>-각종 체험 클래스</h2>
				<h2>-보드게임 카페</h2>
				<h2>-이색 테마 체험</h2>
			</div>
		</div>
	</div>

	<div class="localList">
		<div class="filterDiv">
			<input type="button" class="filterButtonLeft" value="맛집/카페" /> <input
				type="button" class="filterButtonRight" value="활동" />
		</div>
		<br />
		<div class="restaurantDiv">
			<div class="SubFilter">
				<select id="searchFilter">
					<option value="가게명">가게명</option>
					<option value="주소">주소</option>
				</select> <input type="search" id="searchInput" /> <input type="button"
					id="searchSubmit" value="검색" /> <br /> <input type="button"
					class="restaurantFilter" id="korean" value="한식" /> <input
					type="button" class="restaurantFilter" id="western" value="양식" />
				<input type="button" class="restaurantFilter" id="chinese"
					value="중식" /> <input type="button" class="restaurantFilter"
					id="japanese" value="일식" /> <input type="button"
					class="restaurantFilter" id="cafe" value="까페" /> <input
					type="button" class="restaurantFilter" id="extra" value="기타" />
			</div>
			<div class="listUp">
				<table id="listTable">
					<thead>
					</thead>
					<tbody>
						<!-- 데이터가 여기에 추가됩니다 -->
					</tbody>
				</table>
			</div>
			<div class="restaurantSide">
				<div id="restaurantImg"></div>
				<div id="restaurantInfo">
					<div id="restaurantSideName"></div>
					<div id="restaurantSideRate"></div>
				</div>
				<div id="restaurantMap">map</div>
				<input type="button" id="restaurantSubmit" value="경유지에 추가하기">
			</div>
		</div>
		
		<div class="activityDiv">
			<div id="activityMap"></div>
			<div id="activitySide">
				<div id="activityImg"></div>
				<div id="activityName"></div>
				<div id="activityCategory"></div>
				<div id="activitySideRating"></div>
				<div id="activityAddress"></div>
				<div id="activityWebsite"></div>
				<input type="button" id="activitySubmit" value="경유지에 추가하기">
			</div>
		</div>


	</div>



</body>
</html>