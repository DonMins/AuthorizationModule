//package com.example.testspring.demo.config;
//
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
////@Configuration
////@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//
////    @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        http
////                .authorizeRequests()
////                .antMatchers("/log").permitAll()
////                .anyRequest().authenticated()
////                .and()
////                .formLogin().permitAll()
////                .and()
////                .logout().permitAll();
////    }
//
////    @Autowired
////    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
////        auth.userDetailsService(U)
////        auth.inMemoryAuthentication().withUser("2").password("{noop}2").roles("USER");
////    }
//
//}
