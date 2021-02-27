package com.example.testspring.demo.controller;

import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Objects;

@Controller
public class ForgotPasswordController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/forgot_password")
    public String processForgotPassword(HttpServletRequest request, Model model) {
        String email = request.getParameter("email");
        String token = RandomString.make(30);

        try {
            userService.updateResetPasswordToken(token, email);
            String resetPasswordLink = getSiteURL(request) + "/reset_password?token=" + token;
            sendEmail(email, resetPasswordLink);
            model.addAttribute("message", "We have sent a reset password link to your email. Please check.");

        } catch (Exception ex) {
            model.addAttribute("error", ex.getMessage());
        }
        model.addAttribute("userForm", new User());

        return "login";
    }

    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom(new InternetAddress("eegservice@support.com","EEG Service Support"));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));

        String subject = "Ссылка для сброса пароля";

        String content = "<p>Привет,</p>"
                + "<p>Вы запросили сброс пароля.</p>"
                + "<p>Нажмите на ссылку ниже, чтобы изменить свой пароль:</p>"
                + "<p><a href=\"" + link + "\">Сбросить пароль</a></p>"
                + "<br>"
                + "<p>Игнорируйте это письмо, если вы помните свой пароль или еще не сделали запрос.</p>";

        message.setSubject(subject, "UTF-8");
        message.setContent(content, "text/html; charset=UTF-8");

        mailSender.send(message);
    }

@GetMapping("/reset_password")
public String showResetPasswordForm(@Param(value = "token") String token, Model model) {
    User customer = userService.getByResetPasswordToken(token);
    model.addAttribute("token", token);

    if (customer == null) {
        model.addAttribute("message", "Invalid Token");
        return "messagePage";
    }

    return "resetPasswordForm";
}


    @PostMapping("/reset_password")
    public String processResetPassword(HttpServletRequest request, Model model) {
        String token = request.getParameter("token");
        String password = request.getParameter("password");

        User user = userService.getByResetPasswordToken(token);
        model.addAttribute("title", "Reset your password");

        if (Objects.isNull(user)) {
            model.addAttribute("message", "Invalid Token");
            return "messagePage";
        } else {
            userService.updatePassword(user, password);

            model.addAttribute("message", "You have successfully changed your password.");
        }

        return "login";
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}