import dayjs from 'dayjs';
// Plugins for advanced date manipulation (e.g., start of week relative to locale)
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"; // Ensure this is imported

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore); // Extend the plugin

// --- Configuration ---
// As per the prompt, current date is Sunday, June 29, 2025
const CURRENT_DATE_REF = dayjs('2025-06-29'); // This is your "today" for calculation purposes
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
 * Helper to get Monday of the week for a given dayjs object, assuming a Mon-Sun week.
 * This handles dayjs's default startOf('week') being Sunday.
 * @param {dayjs.Dayjs} date - Any dayjs object within the desired week.
 * @returns {dayjs.Dayjs} - A dayjs object representing the Monday of that week.
 */
function getMondayOfRelevantWeek(date) {
    let monday = dayjs(date).startOf('week'); // This usually gives Sunday
    if (monday.day() === 0) { // If it's Sunday, add 1 day to make it Monday
        monday = monday.add(1, 'day');
    }
    return monday;
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
    const periodAttendances = [];

    // Ensure fromDate is not after toDate, handle invalid ranges
    if (fromDate.isAfter(toDate)) {
        return {
            attendances: [],
            summary: {
                totalPresent: 0, totalAbsent: 0, percentage: 0,
                fromDate: fromDate.format('YYYY-MM-DD'), toDate: toDate.format('YYYY-MM-DD'),
                averageWorkHour: 0
            }
        };
    }

    let currentDate = dayjs(fromDate);
    while (currentDate.isBefore(toDate) || currentDate.isSame(toDate, 'day')) {
        const dateStr = currentDate.format('YYYY-MM-DD');

        if (!isWeekend(currentDate)) { // Only process workdays
            const attendance = attendancesMap[dateStr];

            if (attendance) {
                periodAttendances.push(attendance);

                if (attendance.status === 'PRESENT' || attendance.status === 'HALF_DAY' || attendance.status === 'ABNORMAL') {
                    totalPresent++;
                    totalWorkHours += attendance.workHours || 0;
                } else if (attendance.status === 'ABSENT') {
                    totalAbsent++;
                }
            } else {
                // No attendance record for a workday implies Absent
                totalAbsent++;
                periodAttendances.push({
                    date: dateStr,
                    status: 'ABSENT',
                    workHours: 0,
                    // Optionally add default employeeId if available from context
                });
            }
        }
        currentDate = currentDate.add(1, 'day');
    }

    const totalWorkingDays = totalPresent + totalAbsent;
    const percentage = totalWorkingDays > 0 ? (totalPresent / totalWorkingDays) * 100 : 0;
    const averageWorkHour = totalPresent > 0 ? totalWorkHours / totalPresent : 0;

    return {
        attendances: periodAttendances,
        summary: {
            totalPresent,
            totalAbsent,
            percentage: parseFloat(percentage.toFixed(2)),
            fromDate: fromDate.format('YYYY-MM-DD'),
            toDate: toDate.format('YYYY-MM-DD'),
            averageWorkHour: parseFloat(averageWorkHour.toFixed(2))
        }
    };
}


/**
 * Generates various predefined attendance reports and their summaries.
 * Includes reports for the current week/month (up to yesterday), last full week, last full month, and yearly.
 * @param {Array<Object>} rawAttendances - An array of raw attendance objects.
 * @returns {Object} - An object containing attendance data and summaries for each report type.
 */
export default function generateAllAttendanceReports(rawAttendances) {
    const attendancesMap = rawAttendances.reduce((acc, att) => {
        acc[att.date] = att;
        return acc;
    }, {});

    const today = CURRENT_DATE_REF; // Our fixed "current date" (Sunday, June 29, 2025)
    const companyStartDate = COMPANY_START_DATE;

    // The universal end date for all "up to yesterday" reports
    const reportEndDate = today.subtract(1, 'day'); // For '2025-06-29' (Sunday), this is '2025-06-28' (Saturday)

    // --- Reports for the period ending yesterday (or last full period if today is a boundary) ---

    // Current Weekly Report Period (current week up to yesterday, or last full week if today is a weekend)
    let currentWeeklyReportFrom;
    let currentWeeklyReportTo;
    const isTodayWeekend = (today.day() === 0 || today.day() === 6);

    if (isTodayWeekend) {
        // If today is a weekend, report on the *entire last full Monday-Sunday week*
        currentWeeklyReportFrom = getMondayOfRelevantWeek(today.subtract(7, 'day'));
        currentWeeklyReportTo = dayjs(currentWeeklyReportFrom).add(6, 'day'); // Sunday of last week
    } else {
        // If today is a weekday (Mon-Fri), report on the *current week up to yesterday*
        currentWeeklyReportFrom = getMondayOfRelevantWeek(today); // Monday of current week
        currentWeeklyReportTo = reportEndDate; // Yesterday
    }
    const currentWeeklyData = generatePeriodData(attendancesMap, currentWeeklyReportFrom, currentWeeklyReportTo);

    // Current Monthly Report Period (current month up to yesterday, or last full month if today is 1st)
    let currentMonthlyReportFrom;
    let currentMonthlyReportTo;

    if (today.date() === 1) { // If today is the 1st of the month
        // Report on the *entire last month*
        currentMonthlyReportFrom = dayjs(today).subtract(1, 'month').startOf('month');
        currentMonthlyReportTo = dayjs(currentMonthlyReportFrom).endOf('month'); // Last day of last month
    } else {
        // Report current month from the 1st up to yesterday
        currentMonthlyReportFrom = dayjs(today).startOf('month');
        currentMonthlyReportTo = reportEndDate;
    }
    const currentMonthlyData = generatePeriodData(attendancesMap, currentMonthlyReportFrom, currentMonthlyReportTo);

    // Yearly Report Period (from company start date up to yesterday)
    const yearlyReportFrom = companyStartDate;
    const yearlyReportTo = reportEndDate;
    const yearlyData = generatePeriodData(attendancesMap, yearlyReportFrom, yearlyReportTo);

    // --- Explicit Last Full Period Reports (independent of today's date) ---

    // Last Full Week (Monday-Sunday of the week immediately preceding the current week)
    const lastFullWeekMonday = getMondayOfRelevantWeek(today).subtract(7, 'day');
    const lastFullWeekSunday = lastFullWeekMonday.add(6, 'day');
    const lastFullWeekData = generatePeriodData(attendancesMap, lastFullWeekMonday, lastFullWeekSunday);

    // Last Full Month
    const lastMonthEnd = dayjs(today).subtract(1, 'month').endOf('month');
    const lastMonthStart = lastMonthEnd.startOf('month');
    const lastFullMonthData = generatePeriodData(attendancesMap, lastMonthStart, lastMonthEnd);

    // --- Check Validity and Compile Summaries ---
    const hasCurrentWeeklyData = currentWeeklyReportFrom.isSameOrBefore(currentWeeklyReportTo);
    const hasCurrentMonthlyData = currentMonthlyReportFrom.isSameOrBefore(currentMonthlyReportTo);
    const hasYearlyData = yearlyReportFrom.isSameOrBefore(yearlyReportTo);
    const hasLastFullWeekData = lastFullWeekMonday.isSameOrBefore(lastFullWeekSunday);
    const hasLastFullMonthData = lastMonthStart.isSameOrBefore(lastMonthEnd);

    const allSummaries = [];

    if (hasCurrentWeeklyData) {
        allSummaries.push({ type: 'CURRENT_WEEKLY', ...currentWeeklyData.summary });
    }
    if (hasCurrentMonthlyData) {
        allSummaries.push({ type: 'CURRENT_MONTHLY', ...currentMonthlyData.summary });
    }
    if (hasLastFullWeekData) {
        allSummaries.push({ type: 'LAST_FULL_WEEK', ...lastFullWeekData.summary });
    }
    if (hasLastFullMonthData) {
        allSummaries.push({ type: 'LAST_FULL_MONTH', ...lastFullMonthData.summary });
    }
    if (hasYearlyData) {
        allSummaries.push({ type: 'YEARLY', ...yearlyData.summary });
    }

    return {
        currentWeeklyReport: hasCurrentWeeklyData ? currentWeeklyData.attendances : [],
        currentMonthlyReport: hasCurrentMonthlyData ? currentMonthlyData.attendances : [],
        yearlyReport: hasYearlyData ? yearlyData.attendances : [],
        lastFullWeeklyReport: hasLastFullWeekData ? lastFullWeekData.attendances : [],
        lastFullMonthlyReport: hasLastFullMonthData ? lastFullMonthData.attendances : [],
        attendanceReportSummary: allSummaries,
    };
}