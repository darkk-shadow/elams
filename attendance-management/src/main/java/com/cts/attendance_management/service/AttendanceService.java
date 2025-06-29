package com.cts.attendance_management.service;

import com.cts.attendance_management.dto.AttendanceResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceResponseDto clockIn(Long attendanceClockInRequestDto);

    AttendanceResponseDto clockOut(Long attendanceClockOutRequestDto);

    void deleteAttendance(Long id);

    AttendanceResponseDto findAttendanceById(Long id);

    List<AttendanceResponseDto> findAllAttendance();

    List<AttendanceResponseDto> getByEmployeeDateRange(Long employeeId, LocalDate startDate, LocalDate endDate);

    boolean isClockedIn(Long employeeId);

    boolean isClockedOut(Long employeeId);

    AttendanceResponseDto deleteByEmployee(Long employeeId, LocalDate date);

    AttendanceResponseDto deleteByEmployeeToday(Long employeeId);

    AttendanceResponseDto getAttendanceByEmployeeToday(Long employeeId);

    AttendanceResponseDto getLastAttendanceByEmployee(Long employeeId);
}
