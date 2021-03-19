<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <script src="<c:url value="/extjs/ext-all-debug.js"/>" type="text/javascript"></script>
    <link href="<c:url value="/extjs/ext-theme-neptune/ext-theme-neptune-all-debug.css"/>" rel="stylesheet"
          type="text/css">
    <script>
        BASE_HTTP = "http://localhost:8000"
    </script>
</head>
</html>