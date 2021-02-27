<%--
  Created by IntelliJ IDEA.
  User: maks0
  Date: 15.02.2021
  Time: 22:17
  To change this template use File | Settings | File Templates.
--%>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
<head>
    <meta charset='UTF-8'>
    <meta name="robots" content="noindex">
    <link media="screen" href="${contextPath}/css/login.css" type="text/css" rel="stylesheet">
    <link rel="shortcut icon" type="image/x-icon"
          href="//production-assets.codepen.io/assets/favicon/favicon-8ea04875e70c4b0bb41da869e81236e54394d63638a1ef12fa558a4a835f1164.ico"/>
    <link rel="mask-icon" type=""
          href="//production-assets.codepen.io/assets/favicon/logo-pin-f2d2b6d2c61838f7e76325261b7195c27224080bc099486ddd6dccb469b8e8e6.svg"
          color="#111"/>
    <link rel="canonical" href="https://codepen.io/dpinnick/pen/LjdLmo?limit=all&page=21&q=service"/>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>

    <script src="${contextPath}/js/login.js" type="text/javascript"></script>

    <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>

    <title>Восстановление пароля</title>
</head>
<body>

<div class="user" style="border-radius: 10px 10px 10px 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);">
    <div class="form-wrap">
        <div class="tabs">
            <h3 class="login-tab">
                <a class="log-in active" style="
                   margin-left: 50px;
                       width: 250px;
                       }">
                    <span style="margin-left: 37px;">Введите новый пароль<span>
                </a>
            </h3>
        </div>
        <!-- TABS CONTENT -->
        <div class="tabs-content">
            <!-- TABS CONTENT LOGIN -->
            <div class="active">
                <form class="login-form" action="${contextPath}/reset_password" method="POST">
                    <input type="hidden" name="token" value="${token}"/>
                    <input type="password" name="password" id="passwordC" class="input"
                           placeholder="Введите пароль" required autofocus/>

                    <input type="password" class="input" placeholder="Повторите ввод пароля"
                           required oninput="checkPasswordMatch(this);"/>

                    <button type="submit" id="buttonReg" class="button">Изменить пароль</button>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>
