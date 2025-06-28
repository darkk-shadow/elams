package com.cts.attendance_management.service;

import com.cts.attendance_management.dto.AttendanceClockInRequestDto;
import com.cts.attendance_management.dto.AttendanceClockOutRequestDto;
import com.cts.attendance_management.dto.AttendanceResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceResponseDto clockIn(AttendanceClockInRequestDto attendanceClockInRequestDto);

    AttendanceResponseDto clockOut(AttendanceClockOutRequestDto attendanceClockOutRequestDto);

    void deleteAttendance(Long id);

    AttendanceResponseDto findAttendanceById(Long id);

    List<AttendanceResponseDto> findAllAttendance();

    List<AttendanceResponseDto> getByEmployeeDateRange(Long employeeId, LocalDate startDate, LocalDate endDate);
}
