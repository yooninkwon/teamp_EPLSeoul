<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>공공데이터</title>
</head>
<body>
    <h1>공공데이터 결과</h1>
    <pre>${publicData}</pre>  <!-- API에서 받은 JSON 데이터 출력 -->
   <button onclick="location.href='/epl/bus3'">공공데이터 가져오기</button>
</body>
</html>