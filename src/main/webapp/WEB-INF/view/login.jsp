<jsp:directive.include file="base.jsp" />
<jsp:directive.include file="top.jsp" />

<form:form method="post" id="authForm" cssClass="fm-v clearfix" modelAttribute ="userForm" htmlEscape="true">
    <form:errors path="*" id="msg" cssClass="errors loginMsg" element="div" />
    <div class="authForm">

        <div class="authFormInner">

            <h2><span class="lbl"><spring:message code="screen.welcome.instructions" /></span></h2>
            <div>
                <label for="login" class="db txtWrap"><span class="lbl"><spring:message code="screen.welcome.label.netid" /></span>
                    <c:if test="${not empty sessionScope.openIdLocalId}">
                        <span><strong>${sessionScope.openIdLocalId}</strong></span>
                        <input type="text" id="login" name="login" value="${sessionScope.openIdLocalId}" />
                    </c:if>

                    <c:if test="${empty sessionScope.openIdLocalId}">
                        <span><spring:message code="screen.welcome.label.netid.accesskey" var="userNameAccessKey" /></span>
                        <form:input cssClass="required" cssErrorClass="error" id="login" size="25" tabindex="1" accesskey="${userNameAccessKey}" path="login" autocomplete="false" htmlEscape="true" />
                    </c:if>
                </label>
            </div>
            <div>
                <label for="password" class="db txtWrap"><span class="lbl"><spring:message code="screen.welcome.label.password" /></span>
                        <%--
                           NOTE: Certain browsers will offer the option of caching passwords for a user.  There is a non-standard attribute,
                           "autocomplete" that when set to "off" will tell certain browsers not to prompt to cache credentials.  For more
                           information, see the following web page:
                           http://www.geocities.com/technofundo/tech/web/ie_autocomplete.html
                           --%>
                    <spring:message code="screen.welcome.label.password.accesskey" var="passwordAccessKey" />
                    <form:password cssClass="required" cssErrorClass="error" id="password" size="25" tabindex="2" path="password"  accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" />
                </label>
            </div>
                <%--<div>--%>
                <%--<input id="warn" name="warn" value="true" tabindex="3" accesskey="<spring:message code="screen.welcome.label.warn.accesskey" />" type="checkbox" />--%>
                <%--<label for="warn"><span class="lbl"><spring:message code="screen.welcome.label.warn" /></span></label>--%>
                <%--</div>--%>
            <div>
                <input type="hidden" name="lt" value="${loginTicket}" />
                <input type="hidden" name="execution" value="${flowExecutionKey}" />
                <input type="hidden" name="_eventId" value="submit" />
            </div>

            <div>
                <input class="btn-submit enter" name="submit" accesskey="l" tabindex="4" type="submit" value=""/>
                    <%--<input class="btn-submit enter" name="submit" accesskey="l" value="<spring:message code="screen.welcome.button.login" />" tabindex="4" type="submit" />--%>
                    <%--<input class="btn-reset" name="reset" accesskey="c" value="<spring:message code="screen.welcome.button.clear" />" tabindex="5" type="reset" />--%>
            </div>
        </div>
    </div>
</form:form>
<%--</body>--%>
<%--</html>--%>

