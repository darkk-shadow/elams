import dayjs from 'dayjs';
// Plugins for advanced date manipulation (e.g., start of week relative to locale)
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);

// --- Configuration ---
// NOTE: CURRENT_DATE_REF is now ONLY for testing/demonstration.
// For production, `today` will be `dayjs()`.
const CURRENT_DATE_REF = dayjs('2025-06-29'); // Example: Sunday, June 29, 2025
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
 * This handles dayjs's default startOf('week') being Sunday (day 0).
 * @param {dayjs.Dayjs} date - Any dayjs object within the desired week.
 * @returns {dayjs.Dayjs} - A dayjs object representing the Monday of that week.
 */
function getMondayOfRelevantWeek(date) {
    let monday = dayjs(date).startOf('week'); // This usually gives Sunday if week starts Sunday
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
    while (currentDate.isSameOrBefore(toDate, 'day')) { // Use isSameOrBefore for safety
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
                totalAbsent++;
                periodAttendances.push({
                    date: dateStr,
                    status: 'ABSENT',
                    workHours: 0,
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

    // Use the actual current date for calculations
    const today = dayjs(); // IMPORTANT: This is the primary change!
    // For testing with the fixed date provided:
    // const today = CURRENT_DATE_REF; 
    const companyStartDate = COMPANY_START_DATE;

    const reportEndDate = today.subtract(1, 'day'); // Always yesterday

    // Get the Monday of the current *calendar* week (Mon-Sun)
    const mondayOfCurrentCalendarWeek = getMondayOfRelevantWeek(today);

    // --- CURRENT WEEKLY REPORT ---
    let currentWeeklyReportFrom;
    let currentWeeklyReportTo;

    if (isWeekend(today)) {
        // If today is a weekend, Current Week is the full Mon-Sun of the *previous* calendar week
        currentWeeklyReportFrom = mondayOfCurrentCalendarWeek.subtract(7, 'day');
        currentWeeklyReportTo = currentWeeklyReportFrom.add(6, 'day'); // Sunday of that same previous week
    } else {
        // If today is a weekday, Current Week is Mon of *this* week up to yesterday
        currentWeeklyReportFrom = mondayOfCurrentCalendarWeek;
        currentWeeklyReportTo = reportEndDate;
    }
    const currentWeeklyData = generatePeriodData(attendancesMap, currentWeeklyReportFrom, currentWeeklyReportTo);


    // --- LAST FULL WEEKLY REPORT ---
    // This should always be the week before the "Current Weekly" report.
    let lastFullWeekMonday;
    let lastFullWeekSunday;

    if (isWeekend(today)) {
        // If today is a weekend, Current Weekly is (Last Week), so Last Full Weekly is (Two Weeks Ago)
        lastFullWeekMonday = mondayOfCurrentCalendarWeek.subtract(14, 'day');
        lastFullWeekSunday = lastFullWeekMonday.add(6, 'day');
    } else {
        // If today is a weekday, Current Weekly is (This Week), so Last Full Weekly is (Last Week)
        lastFullWeekMonday = mondayOfCurrentCalendarWeek.subtract(7, 'day');
        lastFullWeekSunday = lastFullWeekMonday.add(6, 'day');
    }
    const lastFullWeekData = generatePeriodData(attendancesMap, lastFullWeekMonday, lastFullWeekSunday);


    // --- CURRENT MONTHLY REPORT ---
    let currentMonthlyReportFrom;
    let currentMonthlyReportTo;

    if (today.date() === 1) { // If today is the 1st of the month
        // Report on the *entire last month*
        currentMonthlyReportFrom = dayjs(today).subtract(1, 'month').startOf('month');
        currentMonthlyReportTo = dayjs(currentMonthlyReportFrom).endOf('month');
    } else {
        // Report current month from the 1st up to yesterday
        currentMonthlyReportFrom = dayjs(today).startOf('month');
        currentMonthlyReportTo = reportEndDate;
    }
    const currentMonthlyData = generatePeriodData(attendancesMap, currentMonthlyReportFrom, currentMonthlyReportTo);

    // --- LAST FULL MONTHLY REPORT ---
    // This should always be the full calendar month immediately preceding the current calendar month.
    const lastFullMonthEnd = dayjs(today).subtract(1, 'month').endOf('month');
    const lastFullMonthStart = dayjs(lastFullMonthEnd).startOf('month');
    const lastFullMonthData = generatePeriodData(attendancesMap, lastFullMonthStart, lastFullMonthEnd);


    // --- YEARLY REPORT ---
    const yearlyReportFrom = companyStartDate;
    const yearlyReportTo = reportEndDate;
    const yearlyData = generatePeriodData(attendancesMap, yearlyReportFrom, yearlyReportTo);


    // --- Compile Summaries ---
    const hasCurrentWeeklyData = currentWeeklyReportFrom.isSameOrBefore(currentWeeklyReportTo);
    const hasCurrentMonthlyData = currentMonthlyReportFrom.isSameOrBefore(currentMonthlyReportTo);
    const hasYearlyData = yearlyReportFrom.isSameOrBefore(yearlyReportTo);
    const hasLastFullWeekData = lastFullWeekMonday.isSameOrBefore(lastFullWeekSunday);
    const hasLastFullMonthData = lastFullMonthStart.isSameOrBefore(lastFullMonthEnd);

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