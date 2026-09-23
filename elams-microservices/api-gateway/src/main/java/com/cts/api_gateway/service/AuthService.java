package com.cts.api_gateway.service;

import com.cts.api_gateway.dto.EmployeeAuthResponseDto;
import com.cts.api_gateway.dto.UserLoginDto;

public interface AuthService {

    void createAuth(Long employeeId, String email);

    EmployeeAuthResponseDto login(UserLoginDto user);
}
