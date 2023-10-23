package com.example.jwtprj.Security;

import com.example.jwtprj.filter.customAuthFilter;
import com.example.jwtprj.filter.customAuthoriszationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class securityConfig extends WebSecurityConfigurerAdapter {
private final UserDetailsService userDetailsService;
private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final WebClient.Builder webClientBuilder;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        customAuthFilter customauthFilter = new customAuthFilter(authenticationManagerBean());
        customauthFilter.setFilterProcessesUrl("/api/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/api/login/**","/api/token/refresh/**","/api/users","/api/checkEmail","/api/oauth/**","/api/user/save","/api/user/{id}").permitAll();
//        http.authorizeRequests().antMatchers(GET,"/api/role/**").permitAll();
//        http.authorizeRequests().antMatchers(POST,"/api/role/**").permitAll();
//        http.authorizeRequests().antMatchers(GET,"/api/users").permitAll();
//        http.authorizeRequests().antMatchers(GET,"/api/roles").permitAll();
        http.authorizeRequests().antMatchers(GET,"/api/**").permitAll();
        http.authorizeRequests().antMatchers(PUT,"/api/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/api/**").permitAll();
        http.authorizeRequests().antMatchers(DELETE,"/api/**").permitAll();
        http.authorizeRequests().antMatchers(DELETE,"/api/deleteRole{id}").permitAll();
        http.authorizeRequests().anyRequest().permitAll();
        http.addFilter(customauthFilter);
        http.addFilterBefore(new customAuthoriszationFilter(), UsernamePasswordAuthenticationFilter.class);


    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); // allow all origins
        configuration.addAllowedMethod("*"); // allow all HTTP methods
        configuration.addAllowedHeader("*"); // allow all headers
        configuration.setAllowCredentials(true); // allow sending cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // apply the configuration to all paths

        return source;
    }


}
