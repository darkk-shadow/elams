package com.cts.employee_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ShiftReportByManagerDto {
    private Long general;
    private Long morning;
    private Long evening;
    private Long night;
}
