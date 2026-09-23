package com.cts.attendance_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class EmployeesAttendanceDailyReportDto {

    private Long totalEmployees;
    private Long totalPresents;
    private Long totalAbsent;
    private LocalDate date;
}
