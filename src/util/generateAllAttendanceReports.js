import dayjs from 'dayjs';
// Plugins for advanced date manipulation (e.g., start of week relative to locale)
import weekday from 'dayjs/plugin/weekday'; // To get specific day of week
import weekOfYear from 'dayjs/plugin/weekOfYear'; // Useful for startOf/endOf week, though we'll define week start manually

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

// --- Configuration ---
// As per the prompt, current date is Sunday, June 29, 2025
const CURRENT_DATE = dayjs('2025-06-29');
const COMPANY_START_DATE = dayjs('2025-01-01');

// --- Helper Functions ---

/**
 * Checks if a given dayjs date is a Saturday or Sunday.
 * @param {dayjs.Dayjs} date - The dayjs object to check.
 * @returns {boolean} - True if it's a weekend, false otherwise.
 */
function isWeekend(date) {
    const dayOfWeek = date.day(); // Sunday is 0, Saturday is 6
    return dayOfWeek === 0 || dayOfWeek === 6;
}

/**
 * Generates attendance data and summary for a specified period.
 * @param {Object.<string, Object>} attendancesMap - A map of attendance records, keyed by date string (YYYY-MM-DD).
 * @param {dayjs.Dayjs} fromDate - The start date of the period (inclusive).
 * @param {dayjs.Dayjs} toDate - The end date of the period (inclusive).
 * @returns {{attendances: Array<Object>, summary: Object}} - An object containing the list of attendance records for the period and its summary.
 */
function generatePeriodData(attendancesMap, fromDate, toDate) {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalWorkHours = 0;
    const periodAttendances = []; // This will hold the actual attendance objects or generated "ABSENT" objects

    let currentDate = dayjs(fromDate);
    while (currentDate.isBefore(toDate) || currentDate.isSame(toDate, 'day')) {
        const dateStr = currentDate.format('YYYY-MM-DD');

        if (!isWeekend(currentDate)) { // Only process workdays
            const attendance = attendancesMap[dateStr];

            if (attendance) {
                // An attendance record exists for this workday
                periodAttendances.push(attendance);

                if (attendance.status === 'PRESENT' || attendance.status === 'HALF_DAY' || attendance.status === 'ABNORMAL') {
                    totalPresent++;
                    totalWorkHours += attendance.workHours || 0; // Ensure workHours is treated as 0 if undefined
                } else if (attendance.status === 'ABSENT') {
                    totalAbsent++;
                }
                // Other statuses could be handled here if they exist (e.g., LEAVE, HOLIDAY if explicitly marked)
            } else {
                // No attendance record for a workday implies Absent
                totalAbsent++;
                // Add a placeholder "ABSENT" record to the list for completeness
                periodAttendances.push({
                    date: dateStr,
                    status: 'ABSENT',
                    workHours: 0,
                    // You might want to add default employeeId or other relevant info here
                    // e.g., employeeId: Object.values(attendancesMap)[0]?.employeeId || null,
                });
            }
        }
        currentDate = currentDate.add(1, 'day'); // Move to the next day
    }

    // Calculate summary statistics
    const totalWorkingDays = totalPresent + totalAbsent;
    const percentage = totalWorkingDays > 0 ? (totalPresent / totalWorkingDays) * 100 : 0;
    const averageWorkHour = totalPresent > 0 ? totalWorkHours / totalPresent : 0;

    return {
        attendances: periodAttendances,
        summary: {
            totalPresent,
            totalAbsent,
            percentage: parseFloat(percentage.toFixed(2)), // Format to 2 decimal places
            fromDate: fromDate.format('YYYY-MM-DD'),
            toDate: toDate.format('YYYY-MM-DD'),
            averageWorkHour: parseFloat(averageWorkHour.toFixed(2)) // Format to 2 decimal places
        }
    };
}

// --- Main Report Generation Function ---

/**
 * Generates weekly, monthly, and yearly attendance reports and their summaries.
 * @param {Array<Object>} rawAttendances - An array of raw attendance objects.
 * @returns {Object} - An object containing weeklyReport, monthlyReport, yearlyReport, and attendanceReportSummary.
 */
export default function generateAllAttendanceReports(rawAttendances) {
    // Convert raw attendances into a map for quick lookups by date
    const attendancesMap = rawAttendances.reduce((acc, att) => {
        acc[att.date] = att;
        return acc;
    }, {});

    const today = CURRENT_DATE; // Use the predefined current date
    const companyStartDate = COMPANY_START_DATE;

    // --- Weekly Report Period (Monday of current week up to today) ---
    // dayjs().startOf('week') typically returns Sunday in 'en' locale.
    // To get Monday of the current week:
    let weeklyReportFrom = dayjs(today).startOf('week');
    if (weeklyReportFrom.day() === 0) { // If startOf('week') returns Sunday
        weeklyReportFrom = weeklyReportFrom.add(1, 'day'); // Move to Monday
    }
    // If today is a Sunday (like '2025-06-29'), weeklyReportFrom will be '2025-06-23' (Monday)
    // If today is a Wednesday, weeklyReportFrom will be the Monday of that week.
    const weeklyReportTo = today;
    const weeklyData = generatePeriodData(attendancesMap, weeklyReportFrom, weeklyReportTo);

    // --- Monthly Report Period (1st of current month up to today) ---
    const monthlyReportFrom = dayjs(today).startOf('month');
    const monthlyReportTo = today;
    const monthlyData = generatePeriodData(attendancesMap, monthlyReportFrom, monthlyReportTo);

    // --- Yearly Report Period (Company start date up to today) ---
    const yearlyReportFrom = companyStartDate;
    const yearlyReportTo = today;
    const yearlyData = generatePeriodData(attendancesMap, yearlyReportFrom, yearlyReportTo);

    return {
        weeklyReport: weeklyData.attendances,
        monthlyReport: monthlyData.attendances,
        yearlyReport: yearlyData.attendances,
        attendanceReportSummary: [
            { type: 'WEEKLY', ...weeklyData.summary },
            { type: 'MONTHLY', ...monthlyData.summary },
            { type: 'YEARLY', ...yearlyData.summary },
        ]
    };
}
