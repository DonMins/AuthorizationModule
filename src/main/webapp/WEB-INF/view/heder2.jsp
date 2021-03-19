<%--
  Created by IntelliJ IDEA.
  User: maks0
  Date: 27.02.2021
  Time: 21:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div>
    <div style="
    display: -webkit-box;
     height: 80px;
     background: linear-gradient(90deg, rgba(28,29,34,1), rgba(34,46,64,1), rgba(81,195,184,1));
">
        <ul class="menu">
            <li><a href="#!">Home</a></li>
            <li><a href="#!">About</a></li>
            <li><a href="#!">Contact</a></li>
            <li><a href="#!">Faq</a></li>
        </ul>
        <h3 style="margin-top: 40px;margin-left: auto;margin-right: 1em; ">
            ${pageContext.request.userPrincipal.name}</h3>

        <form action="${pageContext.request.contextPath}/logout" method="post">
            <input style=" margin-left: auto;
                     margin-top: 30px;
                     height: 40px;
                     margin-right: 1em;" type="submit" value="Выйти"/>
        </form>
    </div>
</div>
