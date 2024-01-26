export const formattedDate = (date) => {
    const originalDate = new Date(date).toLocaleDateString('en-US');
    const parts = originalDate.split("/");
    const formattedDate = `${parts[2]}-${parts[0]?.padStart(2, '0')}-${parts[1]?.padStart(2, '0')}`;
    return formattedDate
}

export const formattedTime = (date) => new Date(date).toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
});

//get start_date and end_date for a specific month
export const getRange = (dateString) => {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate.getTime())) {
        console.error('Invalid date input');
        return null;
    }

    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1; // Months are zero-indexed

    // Create the first day of the month
    const firstDayOfMonth = formattedDate(new Date(year, month - 1, 1));

    // Calculate the last day of the month by setting the day to 0 (last day of the previous month)
    const lastDayOfMonth = formattedDate(new Date(year, month, 0));

    return { startDate: firstDayOfMonth, endDate: lastDayOfMonth };
}

export const setCurrentDate = (activeStartDate, selectedDate) => {
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth() + 1;
    const day = new Date(selectedDate).getDate();
    const selectedDateInCurrentMonth = new Date(year, month - 1, day);
    return formattedDate(selectedDateInCurrentMonth);
}

export const getDateInString = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    // Format the date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate.toUpperCase()
}