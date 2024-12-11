<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script	src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
<link rel="stylesheet" href="/static/css/tiles.css">
<link rel="stylesheet" href="/static/css/realty/on_off.css" />
<title>realty_body</title>
</head>

<body>

	<h1>INFORMATION </h1>

    <section>
        <p>
            서울시의 인구 변화와 분포를 한눈에 파악할 수 있는 통계 자료와 함께,  
            아파트, 단독다가구, 연립다세대, 오피스텔의 매매, 전세, 월세 실거래가 정보를 차트로 제공합니다.
        </p>
    </section>

    <section>
        <h2>&loz; 제공 기능</h2>
        <h3>인구 통계</h3>
        <ul>
            <li>연도별 서울시 인구수</li>
            <li>연도별 자치구별 인구수</li>
        </ul>

        <h3>주거 실거래 통계</h3>
        <ul>
            <li>거래 형태(매매/전세/월세) 및 주택 유형별 평균 거래가</li>
            <li>자치구별 주택 유형별 및 거래 형태별 평균 거래가</li>
            <li>자치구별 주택 유형별 및 거래 형태별 평균 거래가 등락 추이</li>
        </ul>
    </section>

    <section>
        <h2>&loz; 데이터 출처</h2>
        <p>본 페이지는 신뢰할 수 있는 공공데이터를 기반으로 차트를 제공합니다.</p>
        <ul>
            <li>
                <a href="https://data.seoul.go.kr/dataList/OA-21276/S/1/datasetView.do" target="_blank">
                    서울 열린데이터 광장 - 서울시 부동산 전월세가 정보
                </a>
            </li>
            <li>
                <a href="https://data.seoul.go.kr/dataList/OA-21275/S/1/datasetView.do" target="_blank">
                    서울 열린데이터 광장 - 서울시 부동산 실거래가 정보
                </a>
            </li>
            <li>
                <a href="https://data.seoul.go.kr/dataList/10790/S/2/datasetView.do" target="_blank">
                    서울 열린데이터 광장 - 서울시 인구밀도 (구별) 통계
                </a>
            </li>
        </ul>
    </section>

    <section>
        <h2>&loz; 사용 방법</h2>
        <p>사이드 메뉴에서 원하는 페이지를 선택하여 차트를 확인하실 수 있습니다.</p>
    </section>

    <section>
        <h2>&loz; 메뉴별 기능 설명</h2>
        <ul>
            <li>
                <strong>연도별 실거래가 통계</strong> <br />
                &nbsp;&nbsp;- 연도별로 거래 형태와 주택 유형별 평균 실거래가를 나타내는 차트를 제공합니다.
            </li>
            <li>
                <strong>자치구별 실거래가 통계</strong> <br />
                &nbsp;&nbsp;- 자치구별 거래 유형 및 주택 유형별 평균, 최고, 최저가를 2021년부터 2024년 11월까지의 데이터로 열람할 수 있습니다.
            </li>
            <li>
                <strong>자치구 실거래가 랭킹</strong> <br />
                &nbsp;&nbsp;- 2007년부터 2024년까지 실거래가 평균치의 최고, 최저가 기준으로 TOP 3 자치구를 확인할 수 있습니다.
            </li>
            <li>
                <strong>자치구 연도별 실거래가 등락 추이</strong> <br />
                &nbsp;&nbsp;- 자치구, 연도, 거래 유형별로 평균 실거래가를 꺾은선 그래프로 시각화합니다.
            </li>
            <li>
                <strong>연도별 서울시 인구수</strong> <br />
                &nbsp;&nbsp;- 서울시 전체 및 자치구별 연도별 인구수를 꺾은선 그래프로 제공합니다.
            </li>
        </ul>
    </section>

	<script src="/static/js/realty/realty_body0.js"></script>
	<script src="/static/js/realty/realty_navbar.js"></script>
</body>
</html>
