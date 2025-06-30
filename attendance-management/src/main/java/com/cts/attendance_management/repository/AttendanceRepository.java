package com.cts.attendance_management.repository;

import com.cts.attendance_management.entity.Attendance;
import com.cts.attendance_management.entity.enums.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
    List<Attendance> findByEmployeeIdAndDateBetween(Long employeeId, LocalDate startDate, LocalDate endDate);
    List<Attendance> findByDateBetween(LocalDate startDate, LocalDate endDate); // For all employee reports

    Integer countByDateAndStatus(LocalDate date, AttendanceStatus status);

    Long countByDateAndStatusAndEmployeeIdIn(LocalDate date, AttendanceStatus status, Collection<Long> employeeIds);

    List<Attendance> findAttendanceByEmployeeIdAndDateBetween(Long employeeId, LocalDate dateStart, LocalDate dateEnd);

    long countByEmployeeIdIn(Collection<Long> employeeIds);

    long countByDate(LocalDate date);

    long countByDateAndEmployeeIdIn(LocalDate date, Collection<Long> employeeIds);

    long countByStatusAndEmployeeId(AttendanceStatus status, Long employeeId);

    long countByStatusAndEmployeeIdIn(AttendanceStatus status, Collection<Long> employeeIds);

    List<Attendance> findByDateAndEmployeeIdIn(LocalDate date, Collection<Long> employeeIds);

    List<Attendance> findByEmployeeIdInAndDateAndStatus(Collection<Long> employeeIds, LocalDate date, AttendanceStatus status);

    Long countByEmployeeIdInAndDateAndStatus(List<Long> emploeyeeIds, LocalDate date, AttendanceStatus attendanceStatus);

    Attendance deleteByEmployeeIdAndDate(Long employeeId, LocalDate date);

    Optional<Attendance> findAttendanceByEmployeeIdAndDate(Long employeeId, LocalDate date);

    Optional<Attendance> findFirstByEmployeeIdOrderByDateDesc(Long employeeId);

    List<Attendance> findByEmployeeId(Long employeeId);

    List<Attendance> getByEmployeeIdInAndDateAndStatus(List<Long> emploeyeeIds, LocalDate date, AttendanceStatus attendanceStatus);

    List<Attendance> getByEmployeeIdInAndDate(List<Long> emploeyeeIds, LocalDate date);
}