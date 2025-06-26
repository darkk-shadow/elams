package com.cts.leave_management.client;

import com.cts.leave_management.dto.EmployeeResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="employee-management")
public interface EmployeeClient {
    @GetMapping("api/employees/{id}/exists")
    boolean checkEmployeeExists(@PathVariable Long id);

    @GetMapping("get-employees-by-manager/{managerId}")
    List<EmployeeResponseDto> getEmployeesByManager(@PathVariable Long managerId);
}