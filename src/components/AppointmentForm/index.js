import React, { useState } from 'react';
import { formattedTime, getDateInString } from '../../helper';
import './index.css';

const AppointmentForm = ({ selectedDate, allSlots }) => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const gettimeSlot = (item) => `${formattedTime(item.start_time)} - ${formattedTime(item.end_time)}`

  return (
    <div className="appointment-form-container">
      <form className="appointment-form">
        <div className='appointment-form-label'>SELECT FROM VARIANTS</div>
        <div>

          <div className="custom-select">
            <select disabled>
              <option value="option1">30 Min</option>
            </select>
            <div className="custom-arrow"></div>
          </div>
        </div>
        <br/><hr/><br/>
        <div>
          <div className='appointment-form-label'>
            {getDateInString(selectedDate)} - AVAILABLE SLOTS
          </div>
          <div className='available-slots'>
            {allSlots?.map((item, key) =>
              <button key={key} type="button" className={selectedSlot === gettimeSlot(item) ? 'select-slot selected' : 'select-slot'} onClick={() => setSelectedSlot(gettimeSlot(item))}>
                {gettimeSlot(item)}
                {selectedSlot === gettimeSlot(item) && <span className="tick-mark">&#10003;</span>}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
