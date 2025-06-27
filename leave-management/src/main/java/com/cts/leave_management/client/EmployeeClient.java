package com.cts.leave_management.client;

import com.cts.leave_management.dto.EmployeeDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="employee-management")
public interface EmployeeClient {
    @GetMapping("api/employees/{id}/exists")
    boolean checkEmployeeExists(@PathVariable Long id);//
    //new empdto by emp id
    @GetMapping("api/employees/{id}")
    EmployeeDto getEmployeeById(@PathVariable Long id);

}