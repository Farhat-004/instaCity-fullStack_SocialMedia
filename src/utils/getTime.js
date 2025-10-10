export const getDateDifferenceFromNow = (fromDate) => {
    // 1. Calculate difference in milliseconds
    const differenceMs = new Date().getTime() - new Date(fromDate).getTime();

    // Define constants for time in milliseconds
    const MS_IN_SECOND = 1000;
    const MS_IN_MINUTE = MS_IN_SECOND * 60;
    const MS_IN_HOUR = MS_IN_MINUTE * 60;
    const MS_IN_DAY = MS_IN_HOUR * 24;
    const MS_IN_MONTH = MS_IN_DAY * 30; // Approximation: 30 days
    const MS_IN_YEAR = MS_IN_DAY * 365; // Approximation: 365 days

    // 2. Calculate differences in all relevant units (using Math.floor)
    const differenceYears = Math.floor(differenceMs / MS_IN_YEAR);
    const differenceMonths = Math.floor(differenceMs / MS_IN_MONTH);
    const differenceDays = Math.floor(differenceMs / MS_IN_DAY);
    const differenceHours = Math.floor(differenceMs / MS_IN_HOUR);
    const differenceMinutes = Math.floor(differenceMs / MS_IN_MINUTE);

    let message;

    // 3. Conditional Logic (Largest unit first)
    // NOTE: We only display the largest non-zero unit.

    if (differenceYears >= 1) {
        message = `${differenceYears} year${
            differenceYears !== 1 ? "s" : ""
        } ago`;
    } else if (differenceMonths >= 1) {
        // Since it's less than a year, we show months
        // To prevent showing '12 months' instead of '1 year', this logic only runs if differenceYears < 1.
        message = `${differenceMonths} month${
            differenceMonths !== 1 ? "s" : ""
        } ago`;
    } else if (differenceDays >= 1) {
        // Since it's less than a month, we show days
        message = `${differenceDays} day${differenceDays !== 1 ? "s" : ""} ago`;
    } else if (differenceHours >= 1) {
        // Less than 1 day, show only hours
        message = `${differenceHours} hour${
            differenceHours !== 1 ? "s" : ""
        } ago`;
    } else if (differenceMinutes >= 1) {
        // Less than 1 hour, show only minutes
        message = `${differenceMinutes} minute${
            differenceMinutes !== 1 ? "s" : ""
        } ago`;
    } else {
        // Less than 1 minute
        message = "just now"; // or "less than a minute"
    }

    return message;
};
