package com.cts.employee_management.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "leave-management", path = "api/leave-balances")
public interface LeaveBalanceClient {

    @PostMapping("/initialize/{employeeId}")
    void initializeLeaveBalances(@PathVariable Long employeeId);
}
