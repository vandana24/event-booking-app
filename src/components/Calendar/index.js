import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

const CustomCalendar = ({ onSelectDate, handleActiveStartDateChange, selectedDate }) => {

  return (
    <div className="calendar-container">
      <Calendar
        className="custom-calendar"
        value={selectedDate}
        onChange={(newDate) => onSelectDate(newDate)}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </div>
  );
};

export default CustomCalendar;
