import flatpickr from "flatpickr";
import  "flatpickr/dist/themes/material_orange.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrl from '../img/icon.svg';

const selectInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);

let userSelectedDate;
    
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error!',
        titleColor: '#fff', 
        message: 'Please choose a date in the future!',
        messageSize: '16',
        messageColor: '#fff',        
        backgroundColor: '#ef4040',
        imageWidth: 302,
        position: 'topRight',
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#b51b1b',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
        iconUrl: imageUrl,
        iconColor: '#FAFAFB',
      });
      console.log('Wrong Date! \nPlease choose a date in the future!');
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
    };
  },
};

flatpickr(selectInput, options);

let timeLeft;
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled', true);
    selectInput.setAttribute('disabled', true);
    timeLeft = setInterval(convertMs, 1000);
});

function convertMs(ms) {
  const endTime = userSelectedDate.getTime();
  const currentTime = Date.now();
  ms = endTime - currentTime;
  if (ms < 0) {
    clearInterval(timeLeft);
    console.log('Time Is Up!');
    iziToast.info({
      title: 'Hey!',
      titleColor: '#fff',
      message: 'Time Is Up!',
      messageSize: '16',
      messageColor: '#fff',
      backgroundColor: 'green',
      position: 'center',
      close: false,
      closeOnEscape: true,
      closeOnClick: true,
      transitionIn: 'bounceInLeft',
      transitionOut: 'fadeOutLeft',
    });
    selectInput.removeAttribute('disabled');
    return;
    };

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

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };

  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}