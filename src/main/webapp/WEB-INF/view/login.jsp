<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!DOCTYPE html><html class=''>
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



    <title>Авторизация</title>

</head>
<body>
<!-- LOGIN MODULE -->
<div class="login">
    <div class="wrap">
        <!-- TOGGLE -->
        <div id="toggle-wrap">
            <div id="toggle-terms">
                <div id="cross">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <!-- RECOVERY -->
        <div class="recovery">
            <h2>Восстановление пароля</h2>
            <p>Введите<strong> адрес эл. почты </strong> или <strong>логин</strong> от вашего аккаунта
                <strong>и нажмите войти</strong></p>
            <p>Мы отправим вам электронное письмо с инструкциями по изменению пароля.</p>
            <form class="recovery-form" action="${contextPath}/forgot_password" method="post">
                <input type="email" class="input" id="user_recover" name="email" placeholder="Введите логин или адрес эл. почты"
                       required>
                <input type="submit" class="button" value="Восстановить пароль">
            </form>
            <p class="mssg">Вам было отправлено электронное письмо с дальнейшими инструкциями.</p>
        </div>

        <!-- SLIDER -->
        <div class="content">
            <!-- LOGO -->
            <div class="logo">
                <a href="#">
                    <img src="https://res.cloudinary.com/dpcloudinary/image/upload/v1506186248/logo.png" alt=""></a>
                <h2><span style="padding-left: 40vm;font-size: 30px;color: white">ЭЭГ</span></h2>

            </div>
            <!-- SLIDESHOW -->
            <div id="slideshow">
                <div class="one">
                    <h2><span>Анализ</span></h2>
                    <p>Анализируйте ваши ЭЭГ записи на наличие заболеваний</p>
                </div>
                <div class="two">
                    <h2><span>Обработка</span></h2>
                    <p>Обрабатывайте ваши ЭЭГ записи</p>
                </div>
                <%--                <div class="three">--%>
                <%--                    <h2><span>GROUPS</span></h2>--%>
                <%--                    <p>Create your own groups and connect with others that share your interests</p>--%>
                <%--                </div>--%>
                <%--                <div class="four">--%>
                <%--                    <h2><span>SHARING</span></h2>--%>
                <%--                    <p>Share your works and knowledge with the community on the public showcase section</p>--%>
                <%--                </div>--%>
            </div>
        </div>
        <!-- LOGIN FORM -->
        <div class="user">
            <div class="form-wrap">
                <!-- TABS -->
                <div class="tabs">
                    <h3 class="login-tab">
                        <a class="log-in${usernameError==null ? ' active' : ''}"
                           href="#login-tab-content">
                            <span>Вход<span>
                        </a>
                    </h3>
                    <h3 class="signup-tab">
                        <a class="sign-up${usernameError==null ? '' : ' active'}"
                           href="#signup-tab-content">
                            <span>Регистрация</span>
                        </a>
                    </h3>
                </div>
                <!-- TABS CONTENT -->
                <div class="tabs-content">
                    <!-- TABS CONTENT LOGIN -->
                    <div id="login-tab-content" class="${usernameError==null ? 'active' : ''}">
                        <form class="login-form" id="login-form" action="${contextPath}/login" method="POST">
                            <input type="text" class="input" name="username" autocomplete="off" placeholder="Логин"
                                   required>
                            <input type="password" class="input" name="password" autocomplete="off" placeholder="Пароль"
                                   required>
                            <%--                            <input type="checkbox" class="checkbox" checked id="remember_me">--%>
                            <%--                            <label for="remember_me">Remember me</label>--%>
                            <input type="submit" id="buttonOpen" class="button" value="Войти">
                        </form>
                        <div class="help-action">
                            <p><i class="fa fa-arrow-left" aria-hidden="true"></i><a class="forgot" href="#">Забыли
                                пароль?</a></p>
                        </div>
                    </div>
                    <!-- TABS CONTENT SIGNUP -->
                    <div id="signup-tab-content" class="${usernameError==null ? '' : 'active'}">
                        <form:form method="POST" modelAttribute="userForm" action="${contextPath}/registration"
                                   cssClass="signup-form" name="signup-form">
                            <form:input type="text" path="userName" cssClass="input" id="user_fio" autocomplete="off"
                                        placeholder="ФИО"></form:input>
                            <form:input type="email" path="email" cssClass="input" id="email" autocomplete="off"
                                        placeholder="Email"></form:input>
                            <form:input type="text" path="login" cssClass="input" id="user_name" autocomplete="off"
                                        placeholder="Логин"></form:input>
                            <form:errors path="login">
                            </form:errors>
                            ${usernameError}
                            <%--    <form:input type="email" path="email" class="input"  id="user_email" autocomplete="off" placeholder="Адрес эл.почты" required></form:input>--%>
                            <form:input type="password" path="password" cssClass="input" id="user_pass"
                                        autocomplete="off"
                                        placeholder="Пароль"></form:input>
                            <button type="submit" id="buttonReg" class="button">Зарегистрироваться</button>
                        </form:form>
                        <div class="help-action">
                            <p>Регистрируясь, вы соглашаетесь с нашими правилами</p>
                            <%--                            <p><i class="fa fa-arrow-left" aria-hidden="true"></i><a class="agree" href="#">Условия использования</a></p>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>