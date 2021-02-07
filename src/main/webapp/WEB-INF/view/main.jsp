<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:directive.include file="base.jsp" />



<html>
<head>
    <title>Главная страница</title>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link media="screen" href="${contextPath}/css/main.css" type="text/css" rel="stylesheet">
</head>
<body>
<div>
    <div>
        <jsp:directive.include file="header.jsp"/>
        <form action="${pageContext.request.contextPath}/logout" method="post">
            <input type="submit" value="Выйти"/>
        </form>
    </div>
    <div id="main_content" style="height: 600px"> </div>
</div>

<script type="text/javascript">
    Ext.onReady(function () {

        var reports = Ext.create('Ext.panel.Panel', {
            title: 'Hello',
            width: "100%",
            renderTo: 'main_content'
        });
        window.onresize = function (event) {
            reports.setHeight(400);
        }
    });
</script>


</body>
</html>



<%--<html>--%>
<%--<head>--%>
<%--    <title>Главная страница</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<div>--%>
<%--    <div>--%>
<%--        <jsp:directive.include file="header.jsp"/>--%>
<%--    </div>--%>
<%--    <div id="main_content"> </div>--%>
<%--</div>--%>
<%--        <script>--%>
<%--            Ext.onReady(function () {--%>
<%--                var menuStore = Ext.create('Ext.data.TreeStore', {--%>
<%--                    root: {--%>
<%--                        expanded: true,--%>
<%--                        children: [--%>
<%--                            {text: "Конструктор анкет", leaf: true,id: 'groupOfProfile'},--%>
<%--                            {text: "Пройти анкетирование",  leaf: true,id: 'passSurvey'},--%>
<%--                        ]--%>
<%--                    }--%>
<%--                });--%>
<%--                viewport = Ext.create('Ext.container.Viewport', {--%>
<%--                    renderTo: "main_content",--%>
<%--                    layout: 'border',--%>
<%--                    items: [--%>
<%--                        {--%>
<%--                            title: 'Анкетник',--%>
<%--                            region: 'north',--%>
<%--                            collapsible: true,--%>
<%--                        },--%>
<%--                        {--%>
<%--                            xtype: 'panel',--%>
<%--                            region: 'center',--%>
<%--                            layout:'fit',--%>
<%--                            id:'globalWorkArea'--%>
<%--                        },--%>
<%--                        {--%>
<%--                            title: 'Левая панель',--%>
<%--                            width: 150,--%>
<%--                            region: 'west',--%>
<%--                            split: true,--%>
<%--                            collapsible: true,--%>
<%--                            xtype: 'treepanel',--%>
<%--                            rootVisible: false,--%>
<%--                            autoScroll: true,--%>
<%--                            store: menuStore,--%>
<%--                        }--%>
<%--                    ]--%>
<%--                });--%>
<%--            });--%>
<%--            function renderToWorkArea( cmp )--%>
<%--            {--%>
<%--                var workArea = Ext.getCmp( 'globalWorkArea' );--%>
<%--                workArea.removeAll();--%>
<%--                workArea.add( cmp );--%>
<%--            }--%>
<%--            function addToWorkArea( cmp )--%>
<%--            {--%>
<%--                var workArea = Ext.getCmp( 'globalWorkArea' );--%>
<%--                workArea.add( cmp );--%>
<%--            }--%>
<%--        </script>--%>
<%--</body>--%>
<%--</html>--%>