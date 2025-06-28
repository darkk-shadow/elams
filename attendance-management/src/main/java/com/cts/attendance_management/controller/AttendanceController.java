package com.cts.attendance_management.controller;

import com.cts.attendance_management.dto.AttendanceClockInRequestDto;
import com.cts.attendance_management.dto.AttendanceClockOutRequestDto;
import com.cts.attendance_management.dto.AttendanceResponseDto;
import com.cts.attendance_management.service.AttendanceService;
import jakarta.ws.rs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/attendances")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping
    public List<AttendanceResponseDto> getAllAttendance(){
        return attendanceService.findAllAttendance();
    }

    @PostMapping("clock-in/{employeeId}")
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceResponseDto clockIn(@PathVariable Long employeeId){
        return attendanceService.clockIn(employeeId);
    }

    @PostMapping("clock-out/")
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceResponseDto clockOut(@RequestBody AttendanceClockOutRequestDto attendanceClockOutRequestDto){
        return attendanceService.clockOut(attendanceClockOutRequestDto);
    }

    @DeleteMapping("{id}/delete")
    public void deleteAttendance(@PathVariable Long id){
        attendanceService.deleteAttendance(id);
    }

    @GetMapping("{id}")
    public AttendanceResponseDto getById(@PathVariable Long id){
        return attendanceService.findAttendanceById(id);
    }

    @GetMapping("{employeeId}/range/")
    public List<AttendanceResponseDto> getByEmployeeDateRange(@PathVariable Long employeeId,
                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
                    ){
        return attendanceService.getByEmployeeDateRange(employeeId, startDate, endDate);
    }

    @GetMapping("is-clocked-in/{employeeId}")
    public boolean isClockedIn(@PathVariable Long employeeId){
        return attendanceService.isClockedIn(employeeId);
    }

    @GetMapping("is-clocked-out/{employeeId}")
    public boolean isClockedOut(@PathVariable Long employeeId){
        return attendanceService.isClockedOut(employeeId);
    }

    @DeleteMapping("delete-employee/{employeeId}/date/{date}")
    public AttendanceResponseDto deleteByEmployee(@PathVariable Long employeeId, @PathVariable LocalDate date){
        return attendanceService.deleteByEmployee(employeeId, date);
    }

    @DeleteMapping("delete-employee-today/{employeeId}")
    public AttendanceResponseDto deleteByEmployeeToday(@PathVariable Long employeeId){
        return attendanceService.deleteByEmployeeToday(employeeId);
    }
}
