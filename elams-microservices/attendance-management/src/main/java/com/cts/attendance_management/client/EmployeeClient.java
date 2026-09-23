package com.cts.attendance_management.client;

import com.cts.attendance_management.dto.EmployeeDto;
import com.cts.attendance_management.dto.EmployeesAttendanceDailyReportDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="employee-management", path = "api/employees")
public interface EmployeeClient {
    @GetMapping("{id}/exists")
    boolean checkEmployeeExists(@PathVariable Long id);

    @GetMapping("get-employees-by-manager/{managerId}")
    List<EmployeeDto> getEmployeesByManager(@PathVariable Long managerId);
}
