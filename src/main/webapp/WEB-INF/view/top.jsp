<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page session="true" %>
<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link media="screen" href="${contextPath}/css/main.css" type="text/css" rel="stylesheet">
</head>
<body id="cas" class="auth">
<div class="all clear">
    <div class="wrapper clear">
        <div class="container clear">
            <div class="outer clear">
                <div class="top box">
                    <div class="innerHead pr box" id="header">
                        <div class="startHeadGover">
                            EEG Labs
                        </div>
                        <img alt="" src="<c:url value=""/>" class="db startHeadTitle">

                        <div class="startHeadDelem1"></div>


                    </div>

                </div>
                <div class="inner clear">
                    <div id="content" class="box">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
