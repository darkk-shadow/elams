import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

/**
 * Generates a daily attendance report for a manager's team.
 * @param {Array<Object>} rawAttendances - Array of attendance records from getAttendanceByManager.
 * @param {number} employeeCount - Total number of employees in the team.
 * @returns {Array<Object>} - Array of daily report objects.
 */
export function generateManagerDailyAttendanceReport(rawAttendances, employeeCount) {
  const COMPANY_START_DATE = dayjs("2025-01-01");
  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  // Group attendances by date
  const attendanceByDate = {};
  rawAttendances.forEach((att) => {
    if (!attendanceByDate[att.date]) attendanceByDate[att.date] = [];
    attendanceByDate[att.date].push(att);
  });

  const reports = [];
  let current = COMPANY_START_DATE;

  while (current.isSameOrBefore(yesterday, "day")) {
    // Skip weekends
    const dayOfWeek = current.day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = current.format("YYYY-MM-DD");
      const attendances = attendanceByDate[dateStr] || [];

      // Get unique employee IDs present that day
      const uniqueEmployeeIds = new Set(attendances.map((a) => a.employeeId));
      const totalEmployeesForDay = Math.max(employeeCount, uniqueEmployeeIds.size);

      const present = attendances.filter(
        (a) => a.status === "PRESENT" || a.status === "HALF_DAY" || a.status === "ABNORMAL"
      ).length;

      const totalWorkHours = attendances.reduce(
        (sum, a) =>
          a.status === "PRESENT" || a.status === "HALF_DAY" || a.status === "ABNORMAL"
            ? sum + (a.workHours || 0)
            : sum,
        0
      );

      const averageWorkHour = present > 0 ? totalWorkHours / present : 0;
      const absent = totalEmployeesForDay - present;
      const percentage = totalEmployeesForDay > 0 ? (present / totalEmployeesForDay) * 100 : 0;

      reports.push({
        date: dateStr,
        present,
        absent,
        averageWorkHour: parseFloat(averageWorkHour.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
      });
    }
    current = current.add(1, "day");
  }

  return reports;
}