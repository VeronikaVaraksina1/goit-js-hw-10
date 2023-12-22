'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minsTimer = document.querySelector('span[data-minutes]');
const secsTimer = document.querySelector('span[data-seconds]');

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (options.defaultDate > selectedDates[0]) {
      btnStart.disabled = true;
      return window.alert('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

const datePicker = flatpickr(input, options);

input.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
  console.log(datePicker.config.defaultDate);
});

btnStart.addEventListener('click', () => {
  const currentDateTime = new Date().getTime();
  const selectedDateTime = userSelectedDate.getTime();

  setInterval(() => {
    let different = selectedDateTime - currentDateTime - 1000;
    console.log(different);

    const result = convertMs(different);

    daysTimer.textContent = `${result.days}`;
    hoursTimer.textContent = `${result.hours}`;
    minsTimer.textContent = `${result.minutes}`;
    secsTimer.textContent = `${result.seconds}`;
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
