import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomCalendar from './components/Calendar';
import AppointmentForm from './components/AppointmentForm';
import Loader from './components/Loader';
import { getSlotData } from './redux/actions';
import { formattedDate, getRange, setCurrentDate } from './helper';
import { slotURL } from './constant';

import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [allSlots, setAllSlots] = useState([]);

  const dispatch = useDispatch();
  const availableSlots = useSelector((state) => state.slotData);

  //To get slot data
  const fetchData = async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await fetch(`${slotURL}?start_date=${startDate}&end_date=${endDate}`);
      const result = await response.json();
      dispatch(getSlotData(result));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    setSelectedDate(formattedDate(currentDate))
    fetchData(getRange(currentDate)?.startDate, getRange(currentDate)?.endDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    //To get all slots for a specific date
    if (availableSlots.length) {
      const getAllSlots = availableSlots
        .filter(item => item.date === selectedDate)
        .flatMap(item => item.slots);
      setAllSlots(getAllSlots)
    }

  }, [availableSlots, selectedDate])


  const handleActiveStartDateChange = ({ activeStartDate }) => {
    // To set currentDate on change of month and year 
    const selectedDateInCurrentMonth = setCurrentDate(activeStartDate, selectedDate)
    setSelectedDate(selectedDateInCurrentMonth);
    fetchData(getRange(activeStartDate)?.startDate, getRange(activeStartDate)?.endDate);
  };

  return (
    <div className="app-booking-container">
      <div className="card-container">
        <div className='card-element'>
          <div className='card-element-h1'>Test Service</div>
          <div className='card-element-h2'>
            <span className='timezone-heading'>Timezone:</span>&nbsp;
            <span className='timezone-label'>Asia/Calcutta</span>
          </div>
          <CustomCalendar
            selectedDate={selectedDate}
            handleActiveStartDateChange={handleActiveStartDateChange}
            onSelectDate={(date) => setSelectedDate(formattedDate(date))} />
        </div>
        <div className='card-element'>
          {loading && <Loader />}
          <AppointmentForm selectedDate={selectedDate} allSlots={allSlots} />
        </div>
      </div>
    </div>
  );
}

export default App;
