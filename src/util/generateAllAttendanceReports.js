import dayjs from 'dayjs';
// Plugins for advanced date manipulation (e.g., start of week relative to locale)
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore)

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
 * (This function remains largely the same, as the date range logic is handled upstream)
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

// --- Main Report Generation Function ---

/**
 * Generates weekly, monthly, and yearly attendance reports and their summaries based on past days.
 * @param {Array<Object>} rawAttendances - An array of raw attendance objects.
 * @returns {Object} - An object containing weeklyReport, monthlyReport, yearlyReport, and attendanceReportSummary.
 */
export default function generateAllAttendanceReports(rawAttendances) {
    const attendancesMap = rawAttendances.reduce((acc, att) => {
        acc[att.date] = att;
        return acc;
    }, {});

    const today = CURRENT_DATE_REF; // Our fixed "current date" (Sunday, June 29, 2025)
    const companyStartDate = COMPANY_START_DATE;

    // The universal end date for all reports is always yesterday
    const reportEndDate = today.subtract(1, 'day'); // For '2025-06-29' (Sunday), this is '2025-06-28' (Saturday)

    // --- Weekly Report Period ---
    let weeklyReportFrom;
    let weeklyReportTo;

    const isTodayWeekend = (today.day() === 0 || today.day() === 6); // 0=Sunday, 6=Saturday

    if (isTodayWeekend) {
        // If today is a weekend, report on the *entire last full Monday-Sunday week*
        // Get Monday of the week *before* the current one
        weeklyReportFrom = getMondayOfRelevantWeek(today.subtract(7, 'day'));
        // Get Sunday of the week *before* the current one
        weeklyReportTo = dayjs(weeklyReportFrom).add(6, 'day');

    } else {
        // If today is a weekday (Mon-Fri), report on the *current week up to yesterday*
        weeklyReportFrom = getMondayOfRelevantWeek(today); // Monday of the current week
        weeklyReportTo = reportEndDate; // Yesterday
    }
    const weeklyData = generatePeriodData(attendancesMap, weeklyReportFrom, weeklyReportTo);


    // --- Monthly Report Period ---
    let monthlyReportFrom;
    let monthlyReportTo;

    if (today.date() === 1) { // If today is the 1st of the month
        // Report on the *entire last month*
        monthlyReportFrom = dayjs(today).subtract(1, 'month').startOf('month');
        monthlyReportTo = dayjs(monthlyReportFrom).endOf('month'); // Last day of last month
    } else {
        // Report current month from the 1st up to yesterday
        monthlyReportFrom = dayjs(today).startOf('month');
        monthlyReportTo = reportEndDate;
    }
    const monthlyData = generatePeriodData(attendancesMap, monthlyReportFrom, monthlyReportTo);


    // --- Yearly Report Period ---
    // From company start date up to yesterday
    const yearlyReportFrom = companyStartDate;
    const yearlyReportTo = reportEndDate;
    const yearlyData = generatePeriodData(attendancesMap, yearlyReportFrom, yearlyReportTo);


    // Ensure valid date ranges before including in reports (e.g., if company just started yesterday)
    const hasWeeklyData = weeklyReportFrom.isSameOrBefore(weeklyReportTo);
    const hasMonthlyData = monthlyReportFrom.isSameOrBefore(monthlyReportTo);
    const hasYearlyData = yearlyReportFrom.isSameOrBefore(yearlyReportTo);

    return {
        weeklyReport: hasWeeklyData ? weeklyData.attendances : [],
        monthlyReport: hasMonthlyData ? monthlyData.attendances : [],
        yearlyReport: hasYearlyData ? yearlyData.attendances : [],
        attendanceReportSummary: [
            hasWeeklyData ? { type: 'WEEKLY', ...weeklyData.summary } : null,
            hasMonthlyData ? { type: 'MONTHLY', ...monthlyData.summary } : null,
            hasYearlyData ? { type: 'YEARLY', ...yearlyData.summary } : null,
        ].filter(Boolean) // Filter out any null entries if a report period is invalid
    };
}

// --- Example Usage ---

// Your example raw attendances data
const exampleAttendances = [
    { "id": 1, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-23", "status": "PRESENT", "employeeId": 101 }, // Mon, Jun 23
    { "id": 2, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-24", "status": "PRESENT", "employeeId": 101 }, // Tue, Jun 24
    { "id": 3, "clockInTime": "09:00", "clockOutTime": "13:00", "workHours": 4, "date": "2025-06-25", "status": "HALF_DAY", "employeeId": 101 }, // Wed, Jun 25
    { "id": 4, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-27", "status": "PRESENT", "employeeId": 101 }, // Fri, Jun 27
    // NO RECORD for 2025-06-26 (Thursday) -> Will be counted as ABSENT by logic
    // 2025-06-28 (Saturday) - Weekend, will be excluded from working days
    // 2025-06-29 (Sunday) - Weekend, will be excluded from working days

    // Monthly data (June 2025 - current month)
    { "id": 5, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-02", "status": "PRESENT", "employeeId": 101 }, // Mon, Jun 2
    { "id": 6, "clockInTime": "00:00", "clockOutTime": "00:00", "workHours": 0, "date": "2025-06-03", "status": "ABSENT", "employeeId": 101 }, // Tue, Jun 3 (explicitly absent)
    { "id": 7, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 7.5, "date": "2025-06-10", "status": "PRESENT", "employeeId": 101 },
    { "id": 8, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8.0, "date": "2025-06-11", "status": "PRESENT", "employeeId": 101 },
    // Missing: 2025-06-04 (Wed), 2025-06-12 (Thu) -> will be ABSENT

    // Yearly data (from 2025-01-01)
    { "id": 9, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-01-01", "status": "PRESENT", "employeeId": 101 }, // Company start date
    { "id": 10, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-01-02", "status": "PRESENT", "employeeId": 101 },
    { "id": 11, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-05-20", "status": "PRESENT", "employeeId": 101 },
    { "id": 12, "clockInTime": "00:00", "clockOutTime": "00:00", "workHours": 0, "date": "2025-05-21", "status": "ABSENT", "employeeId": 101 }, // Explicitly absent in May

    // Data for last full week (June 16-22) to test weekend logic:
    { "id": 13, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-16", "status": "PRESENT", "employeeId": 101 }, // Mon, Jun 16
    { "id": 14, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-17", "status": "PRESENT", "employeeId": 101 }, // Tue, Jun 17
    // Missing Jun 18, 19, 20
    { "id": 15, "clockInTime": "09:00", "clockOutTime": "17:00", "workHours": 8, "date": "2025-06-22", "status": "PRESENT", "employeeId": 101 }, // Sun, Jun 22 (This will be correctly ignored as a weekend)
];