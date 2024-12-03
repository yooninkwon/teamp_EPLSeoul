<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">



<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<link rel="stylesheet" href="/static/css/metro/metro5.css"> <!-- metro1 css파일 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/static/js/metro/metro5.js"></script> <!-- metro1 스크립트 파일 -->
<title>metro_body</title>




</head>

<body>
	<div class="box">
		<div id="search">
			<h1>지하철 범죄 및 사고 현황</h1>
		</div>
		<div id="result">
			<div id="resultCrime">
				<div id="crimeTopic">
					<p class="topic"><최근 5년간 범죄 현황></p>
				</div>
				<div>
					<canvas id="crimeChart"></canvas>
				</div>
				<div id="crimeData">
					<table>
						<thead>
							<tr>
								<th>연도</th>
								<th>성추행</th>
								<th>카메라촬영</th>
								<th>합계</th>
							</tr>
						</thead>
						<tbody class="crimeGraphData">
							<c:forEach var="item" items="${crime }">
							<tr data-year="${item.year}" 
				            data-scrime="${item.scrime}" 
				            data-camera="${item.camera}"> 
								<td>${item.year }</td>								
								<td><fmt:formatNumber value="${item.scrime }" pattern="#,###"/></td>								
								<td><fmt:formatNumber value="${item.camera }" pattern="#,###"/></td>								
								<td><fmt:formatNumber value="${item.total }" pattern="#,###"/></td>			
							</tr>
							</c:forEach>
						</tbody>
					</table>
				
				</div>
			</div>
			<div id="resultAccident">
				<div id="accidentTopic">
					<p class="topic"><최근 5년간 사고 현황></p>
				</div>
				<div>
					<canvas id="accidentChart"></canvas>
				</div>
				<div id="accidentData">
					<table>
						<thead>
							<tr>
								<th>연도</th>
								<th>기타</th>
								<th>발빠짐</th>
								<th>승강설비관련</th>
								<th>역내 사고</th>
								<th>열차내 사고</th>
								<th>출입문관련</th>
								<th>합계</th>
							</tr>
						</thead>
						<tbody class="accidentGraphData">
							<c:forEach var="item" items="${accident }">
							<tr data-year="${item.year}"
		                    data-others="${item.others}"
		                    data-slip="${item.slip}"
		                    data-elevator="${item.elevator}"
		                    data-station_accident="${item.station_accident}"
		                    data-train_accident="${item.train_accident}"
		                    data-door="${item.door}">
								<td>${item.year }</td>								
								<td><fmt:formatNumber value="${item.others }" pattern="#,###"/></td>								
								<td><fmt:formatNumber value="${item.slip }" pattern="#,###"/></td>								
								<td><fmt:formatNumber value="${item.elevator }" pattern="#,###"/></td>			
								<td><fmt:formatNumber value="${item.station_accident }" pattern="#,###"/></td>			
								<td><fmt:formatNumber value="${item.train_accident }" pattern="#,###"/></td>			
								<td><fmt:formatNumber value="${item.door }" pattern="#,###"/></td>			
								<td><fmt:formatNumber value="${item.stats }" pattern="#,###"/></td>			
							</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
			
		</div>	
	</div>
	
  
  
</body>
</html>