<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script	src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
<link rel="stylesheet" href="/static/css/tiles.css">
<link rel="stylesheet" href="/static/css/realty/on_off.css">
<link rel="stylesheet" href="/static/css/realty/realty.css">
<link rel="stylesheet" href="/static/css/realty/tables.css">
<title>realty_body</title>
</head>

<body>
	<div id="title-radio-div">
		<h1 class="body-title"> 자치구 실거래가 랭킹 (전체 데이터 평균치) </h1>
		<br />
		<label for="buying-max" class="g_box _1">
			<input type="radio" name="tableType" id="buying-max" value="buying-rank-max" checked />
			매매 최고가 
		</label>
		<label for="buying-min" class="g_box _1">
			<input type="radio" name="tableType" id="buying-min" value="buying-rank-min" />
			매매 최저가 
		</label>
		
		<label for="jeonse-grfe-max" class="g_box _1">
			<input type="radio" name="tableType" id="jeonse-grfe-max" value="jeonse-rank-max" />
			전세 보증금 최고가 
		</label>
		<label for="jeonse-grfe-min" class="g_box _1">
			<input type="radio" name="tableType" id="jeonse-grfe-min" value="jeonse-rank-min" />
			전세 보증금 최저가 
		</label>
		
		<br />
		<br />
		<br />
				<label for="rent-grfe-max" class="g_box _1">
			<input type="radio" name="tableType" id="rent-grfe-max" value="rent-rank-grfe-max" />
			월세 보증금 최고가 
		</label>
		<label for="rent-grfe-min" class="g_box _1">
			<input type="radio" name="tableType" id="rent-grfe-min" value="rent-rank-grfe-min" />
			월세 보증금 최저가 
		</label>
		<label for="rent-rtfe-max" class="g_box _1">
			<input type="radio" name="tableType" id="rent-rtfe-max" value="rent-rank-rtfe-max" />
			월세 월납입금 최고가 
		</label>
		<label for="rent-rtfe-min" class="g_box _1">
			<input type="radio" name="tableType" id="rent-rtfe-min" value="rent-rank-rtfe-min" />
			월세 월납입금 최저가 
		</label>
	</div>
	<br />
	<br />
	<div id="all-table-container">
		<div id="buying-rank-max" class="on">
	  		<span class="table-span">매매 평균 최고가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>매매가 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="buying-rank-min" class="off">
	  		<span class="table-span">매매 평균 최저가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>매매가 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="rent-rank-grfe-max" class="off">
	  		<span class="table-span">월세 보증금 평균 최고가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>월세 보증금 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="rent-rank-grfe-min" class="off">
	  		<span class="table-span">월세 보증금 평균 최저가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>월세 보증금 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="rent-rank-rtfe-max" class="off">
	  		<span class="table-span">월세 월납입금 평균 최고가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>월세 월납입금 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="rent-rank-rtfe-min" class="off">
	  		<span class="table-span">월세 월납입금 평균 최저가 TOP 3</span>	
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>월세 월납입금 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="jeonse-rank-max" class="off">
			<span class="table-span">전세 보증금 평균 최고가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>전세 보증금 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		
		<div id="jeonse-rank-min" class="off">
			<span class="table-span">전세 보증금 평균 최저가 TOP 3</span>
			<table border="1">
				<thead>
					<tr>
						<th>순위</th>
						<th>자치구</th>
						<th>법정동</th>
						<th>건물유형</th>
						<th>전세 보증금 평균</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
	</div>
	
	
<script src="/static/js/realty/realty_body3.js"></script>
</body>
</html>