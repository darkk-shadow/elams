package com.cts.api_gateway.service.impl;

import com.cts.api_gateway.client.EmployeeClient;
import com.cts.api_gateway.dto.EmployeeAuthDto;
import com.cts.api_gateway.dto.EmployeeAuthResponseDto;
import com.cts.api_gateway.dto.UserLoginDto;
import com.cts.api_gateway.entity.AuthUser;
import com.cts.api_gateway.exception.InvalidJwtTokenException;
import com.cts.api_gateway.repository.AuthRepository;
import com.cts.api_gateway.security.JwtUtil;
import com.cts.api_gateway.service.AuthService;
import com.cts.api_gateway.service.CustomUserDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private EmployeeClient employeeClient;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    public void createAuth(Long employeeId, String email) {
        AuthUser user  = new AuthUser();
        user.setEmployeeId(employeeId);
        user.setPassword(passwordEncoder.encode(email));
        authRepository.save(user);
    }

    @Override
    public EmployeeAuthResponseDto login(UserLoginDto user) {
        try {
            Authentication authentication = authManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            user.getEmail(), user.getPassword()
                    ));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String token = jwtUtil.generateToken(userDetails);

            EmployeeAuthDto employee = employeeClient.loadEmployeeByEmail(user.getEmail());

            EmployeeAuthResponseDto employeeAuthResponseDto = modelMapper.map(employee, EmployeeAuthResponseDto.class);
            employeeAuthResponseDto.setJwtToken(token);
            return employeeAuthResponseDto;
        } catch (Exception e) {
            throw new InvalidJwtTokenException("Invalid username or password");
        }
    }
}
