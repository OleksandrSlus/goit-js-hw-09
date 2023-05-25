import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'
const ref = {
    dataEl: document.querySelector(".value[data-days]"),
    hoursEl: document.querySelector(".value[data-hours]"),
    minutesEl: document.querySelector(".value[data-minutes]"),
    secondsEl: document.querySelector(".value[data-seconds]"),
    startBtnEl: document.querySelector("button[data-start]"),
    timerEl: document.querySelector(".timer")
}
const dataPicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedData = dataPicker.selectedDates[0];
            if (selectedData <= Date.now()) {
                Notiflix.Report.failure('Error', 'Please select a future date and time.', 'OK');
            } else if (selectedData > Date.now()) {
                ref.startBtnEl.disabled = false;
            }
        },
});
let timerId = null;
function timer() {
    const selectedData = dataPicker.selectedDates[0];
    const targetDate = new Date(selectedData);
    let distanceToTarget = 0;
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(() => {
        const currentDateInMs = Date.now();
        const targetDateInMs = targetDate.getTime();
        distanceToTarget = targetDateInMs - currentDateInMs;
        console.log(convertMs(distanceToTarget));
        timerMarkup(distanceToTarget);
        if (distanceToTarget <= 1000 ) {
            clearInterval(timerId);
            ref.startBtnEl.disabled = false;
        }
    }, 1000);
    ref.startBtnEl.disabled = true;
}
function timerMarkup(distanceToTarget) {
    const { days, hours, minutes, seconds } = convertMs(distanceToTarget);
    ref.dataEl.textContent = days;
    ref.hoursEl.textContent = hours;
    ref.minutesEl.textContent = minutes;
    ref.secondsEl.textContent = seconds;
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}
ref.startBtnEl.addEventListener('click', timer);