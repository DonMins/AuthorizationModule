<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%--<jsp:directive.include file="base.jsp" />--%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<jsp:include page="base.jsp"/>


<html>
<head>
    <title>Главная страница</title>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link media="screen" href="${contextPath}/css/login.css" type="text/css" rel="stylesheet">
    <%--    <link media="screen" href="${contextPath}/css/main.css" type="text/css" rel="stylesheet">--%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link media="screen" href="${contextPath}/css/menu.css" type="text/css" rel="stylesheet">
    <script src="${contextPath}/js/plottingEEG.js" type="text/javascript"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.4/chartist.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.4/chartist.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.4/chartist.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.4/chartist.min.js.map"></script>

</head>
<body>
<div>
    <div>
    <jsp:include page="heder2.jsp"/>

        <div sec:authorize="isAuthenticated()">
            Text visible only to authenticated users.
        </div>

        <sec:authorize access="hasRole('ROLE_ADMIN')">
            <p>Must have ROLE_ADMIN</p>
        </sec:authorize>
        <div id="myfirstchart" style="height: 250px; width: 1000px; background:white"></div>
        <script>
            plotEEG()
        </script>

    <jsp:include page="footer.jsp"/>

    </div>
</div>

</body>
</html>
