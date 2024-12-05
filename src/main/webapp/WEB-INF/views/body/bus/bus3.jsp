<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>네이버 블로그</title>
</head>
<body>
    <h1>네이버 블로그 글</h1>

<c:if test="${not empty blogPosts}">
    <ul>
        <c:forEach var="post" items="${blogPosts}">
            <li>
                <a href="${post.link}" target="_blank">${post.title}</a>
                <p>${post.description}</p>

                <!-- 본문에 포함된 첫 번째 이미지를 보여주기 -->
                <c:if test="${not empty post.thumbnail}">
                    <img src="${post.thumbnail}" alt="블로그 이미지">
                </c:if>
                <c:if test="${empty post.thumbnail}">
                    <p>이미지를 찾을 수 없습니다.</p> <!-- 이미지가 없을 경우 처리 -->
                </c:if>
            </li>
        </c:forEach>
    </ul>
</c:if>

    <c:if test="${not empty error}">
        <p style="color:red">${error}</p>
    </c:if>
</body>
</html>