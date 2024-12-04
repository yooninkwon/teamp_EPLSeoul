<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<link rel="icon" href="/static/icon/favicon.ico" />
<link rel="stylesheet" href="/static/css/tiles.css"> <!-- 외부 CSS 파일 -->
<title>
	<tiles:insertAttribute name="epl_title" />
</title>
</head>
<body>
<div id="container">
    <div>
        <tiles:insertAttribute name="epl_header" />
    </div>
    <div id="content-wrapper">
        <div id="epl_side">
            <tiles:insertAttribute name="epl_side" />
        </div>
        <div id="epl_body">
            <tiles:insertAttribute name="epl_body" />
        </div>
    </div>
</div>
</body>
</html>