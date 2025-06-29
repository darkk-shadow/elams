package com.cts.attendance_management.service.impl;

import com.cts.attendance_management.client.EmployeeClient;
import com.cts.attendance_management.dto.AttendanceResponseDto;
import com.cts.attendance_management.entity.Attendance;
import com.cts.attendance_management.entity.enums.AttendanceStatus;
import com.cts.attendance_management.exception.AttendanceRegisterException;
import com.cts.attendance_management.exception.ResourceNotFoundException;
import com.cts.attendance_management.repository.AttendanceRepository;
import com.cts.attendance_management.service.AttendanceService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.Temporal;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceServiceImpl.class);

    @Autowired
    EmployeeClient employeeClient;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public AttendanceResponseDto clockIn(Long employeeId) {
        Optional<Attendance> checkAttendance = attendanceRepository.findByEmployeeIdAndDate(
                employeeId,
                LocalDate.now());
        if(checkAttendance.isPresent()){
            String msg = "Employee with id "+ employeeId
                    + " has already clocked in at "+ LocalTime.now();
            logger.error(msg);
            throw new AttendanceRegisterException(msg);
        }
        employeeClient.checkEmployeeExists(employeeId);
        Attendance attendance = new Attendance();
        attendance.setEmployeeId(employeeId);
        attendance.setClockInTime(LocalTime.now());
        attendance.setDate(LocalDate.now());

        Attendance savedAttendance = attendanceRepository.save(attendance);
        String msg = "Employee with id "+ employeeId
                +" has clocked in at " + savedAttendance.getClockInTime();
        logger.info(msg);
        AttendanceResponseDto mappedDto =  modelMapper.map(savedAttendance, AttendanceResponseDto.class);
        return mappedDto;
    }

    @Override
    public AttendanceResponseDto clockOut(Long employeeId) {
        logger.debug("Fetching employee from the database.");
        LocalTime now = LocalTime.now();
        Optional<Attendance> checkAttendance = attendanceRepository.findByEmployeeIdAndDate(
                employeeId,
                LocalDate.now());

        if(checkAttendance.isEmpty()){
            String msg = "Employee with id "+ employeeId
                    + " has to be clocked in inorder to clock out";
            logger.error(msg);
            throw new AttendanceRegisterException(msg);
        }

        if(checkAttendance.get().getClockOutTime()!=null){
            String msg = "Employee with id "+ employeeId
                    + " has already clocked out at "+ checkAttendance.get().getClockOutTime();
            logger.error(msg);
            throw new AttendanceRegisterException(msg);
        }
        Attendance attendance = checkAttendance.get();
        attendance.setClockOutTime(now);
        attendance.setWorkHours(calculateWorkHours(attendance.getClockInTime(),
                now));
        attendance.setStatus(determineAttendanceStatus(attendance.getWorkHours()));
        Attendance savedAttendance = attendanceRepository.save(attendance);
        String msg = "Employee with id "+ employeeId
                +" has clocked out at " + now;
        logger.info(msg);
        AttendanceResponseDto mappedDto =  modelMapper.map(savedAttendance, AttendanceResponseDto.class);
        mappedDto.setEmployeeId(employeeId);
        return mappedDto;
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    @Override
    public AttendanceResponseDto findAttendanceById(Long id) {
        Optional<Attendance> savedAttendance = attendanceRepository.findById(id);
        if(savedAttendance.isEmpty()){
            String msg = "Attendance with Id "+id+" not found.";
            logger.error(msg);
            throw new ResourceNotFoundException(msg);
        }
        logger.info("Attendance with id "+id+" Found");
        AttendanceResponseDto mappedDto = modelMapper.map(savedAttendance.get(), AttendanceResponseDto.class);
        return mappedDto;
    }

    @Override
    public List<AttendanceResponseDto> findAllAttendance() {
        logger.info("Fetching all attendances");
        return attendanceRepository.findAll()
                .stream().map((a) -> modelMapper.map(a, AttendanceResponseDto.class))
                .toList();
    }

    @Override
    public List<AttendanceResponseDto> getByEmployeeDateRange(Long employeeId, LocalDate startDate, LocalDate endDate) {
        List<Attendance> attendances
                = attendanceRepository.findAttendanceByEmployeeIdAndDateBetween(employeeId, startDate, endDate);
        return attendances
                .stream().map((a) -> modelMapper.map(a, AttendanceResponseDto.class))
                .toList();
    }

    @Override
    public boolean isClockedIn(Long employeeId) {
        Optional<Attendance> attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now());
        return attendance.isPresent();
    }

    @Override
    public boolean isClockedOut(Long employeeId) {
        Optional<Attendance> attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now());
        return attendance.isPresent() && attendance.get().getClockOutTime() != null;
    }

    @Override
    public AttendanceResponseDto deleteByEmployee(Long employeeId, LocalDate date) {
        Attendance attendance = attendanceRepository.findAttendanceByEmployeeIdAndDate(employeeId, date)
                .orElseThrow(()->new ResourceNotFoundException("Attendance Not found for "+employeeId+" on "+date));
        attendanceRepository.deleteById(attendance.getId());
        return modelMapper.map(attendance, AttendanceResponseDto.class);
    }

    @Override
    public AttendanceResponseDto deleteByEmployeeToday(Long employeeId) {
        Attendance attendance = attendanceRepository.findAttendanceByEmployeeIdAndDate(employeeId, LocalDate.now())
                .orElseThrow(()->new ResourceNotFoundException("Attendance Not found for "+employeeId+" on "+LocalDate.now()));
        attendanceRepository.deleteById(attendance.getId());
        return modelMapper.map(attendance, AttendanceResponseDto.class);
    }

    @Override
    public AttendanceResponseDto getAttendanceByEmployeeToday(Long employeeId) {
        Attendance attendance = attendanceRepository.findAttendanceByEmployeeIdAndDate(employeeId, LocalDate.now())
                .orElseThrow(()->new ResourceNotFoundException("Attendance Not found for "+employeeId+" on "+LocalDate.now()));

        return modelMapper.map(attendance, AttendanceResponseDto.class);
    }

    @Override
    public AttendanceResponseDto getLastAttendanceByEmployee(Long employeeId) {
        Attendance attendance = attendanceRepository.findFirstByEmployeeIdOrderByDateDesc(employeeId)
                .orElseThrow(()->new ResourceNotFoundException(
                        "Last Attendance for employee with id "+employeeId+" not found!"
                ));
        return modelMapper.map(attendance, AttendanceResponseDto.class);
    }

    private double calculateWorkHours(Temporal clockInTime, Temporal clockOutTime){
        logger.debug("Calculating working hours of "+clockInTime+" and "+clockOutTime);
        Duration duration = Duration.between(clockInTime, clockOutTime);
        double workHours =  (double)duration.toSeconds()/3600;
        return workHours;
    }

    private AttendanceStatus determineAttendanceStatus(double workHours) {

        if (workHours >= 7.5) {
            return AttendanceStatus.PRESENT;
        } else if (workHours >= 3.5) {
            return AttendanceStatus.HALF_DAY;
        } else if (workHours > 0) {
            return AttendanceStatus.ABNORMAL;
        } else {
            return AttendanceStatus.ABNORMAL;
        }
    }
}
