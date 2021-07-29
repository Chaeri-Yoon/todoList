import { resetToDoList } from "./toDoList";

// currentYear: put the text of currently displayed year on it
// currentMonth: put the text of currently displayed month on it
const currentYear = document.querySelector('.jsYear');
const currentMonth = document.querySelector('.jsMonth');

const dayParent = document.querySelector('.jsDays');

const btnPrevMonth = document.querySelector('.jsBtnPrevMonth');
const btnNextMonth = document.querySelector('.jsBtnNextMonth');

const active = "active";

//displayYear: value of currently displayed year e.g. 2021
//displayMonth: value of currently displayed month e.g. January
//displayDate: value of currently displayed date e.g. 20200123
let displayYear;
let displayMonth;
let displayDate;

export const getDisplayDate = () => {
    return displayDate;
}
const setDisplayDate = (_year, _month, _day = 1) => {
    displayYear = _year;
    displayMonth = _month;

    displayDate = getDateKey(displayYear, displayMonth, _day);
}
//firstDayOfDisplayDate: information about the day of the week for the first day of this month.
//lastDayOfDisplayDate: information about the last day of this month
let firstDayOfDisplayDate;
let lastDayOfDisplayDate;

//lastDisplayDate: the last date we clicked to see to-Do list
let lastDisplayDate;

const alphabetMonth = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function resetCalender() {
    const thisMonthDays = Array.from(dayParent.querySelectorAll('li'));
    thisMonthDays.forEach((thisMonthDay) => dayParent.removeChild(thisMonthDay));
}
function getCurrentCalender() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    setDisplayDate(year, month, day)
    setCalender();
    resetToDoList();
}
function getDateKey(_year, _month, _day, isFirstSetting = true) {
    return `${_year}${(_month + 1) < 10 ? "0" + (_month + 1).toString() : (_month + 1)}${_day < 10 ? "0" + _day.toString() : _day}`;
}
function onDateClicked(_button, _key) {
    // 1. Change displayyear,month,date: changeDisplayDate(_key)
    // 2. Remove 'active' class from lastDisplayDate
    // 3. Add 'active' class to the date on the button clicked.
    // 4. Display To-Do List of that date.

    const year = parseInt(_key.substring(0, 4));
    const month = parseInt(_key.substring(4, 6));
    const day = parseInt(_key.substring(6, 8));

    setDisplayDate(year, month - 1, day);
    lastDisplayDate.classList.remove(active);
    _button.parentNode.classList.add(active);
    lastDisplayDate = _button.parentNode;

    resetToDoList();
}
function setFirstAndLastDay() {
    firstDayOfDisplayDate = new Date(displayYear, displayMonth, 1).getDay();
    // numOfDays: How many days in this month?
    const numOfDays = new Date(displayYear, displayMonth + 1, 0).getDate();
    lastDayOfDisplayDate = firstDayOfDisplayDate + numOfDays - 1;
}
function setCalender() {
    if (currentYear) currentYear.innerText = displayYear;
    if (currentMonth) currentMonth.innerText = alphabetMonth[displayMonth];
    setFirstAndLastDay();

    for (let i = 0; i < Math.trunc(lastDayOfDisplayDate / 7) + 1; i++) {
        for (let j = 0; j < 7; j++) {
            if ((7 * i) + j > lastDayOfDisplayDate) break;

            const li = document.createElement('li');
            const button = document.createElement('button');

            let day = 0;
            if (i == 0 && j < firstDayOfDisplayDate) button.innerText = "";
            else {
                day = ((7 * i) + j) - (firstDayOfDisplayDate - 1);
                button.innerText = day;
            }

            const key = getDateKey(displayYear, displayMonth, day);

            if (day != 0) li.classList.add(key);
            if (key == displayDate) {
                li.classList.add('active');
                lastDisplayDate = li;
            }

            // When a date on the calender is clicked,
            // 1. Change displayyear,month,date: changeDisplayDate(_key)
            // 2. Remove 'active' class from lastDisplayDate
            // 3. Add 'active' class to the date on the button clicked.
            // 4. Display To-Do List of that date.
            button.addEventListener('click', function (event) { onDateClicked(event.target, key) });
            li.appendChild(button);
            dayParent.appendChild(li);
        }
    }
}
function onNextMonthButtonClicked() {
    resetCalender();

    displayMonth++;
    if (displayMonth > 11) setDisplayDate(++displayYear, displayMonth - 12);
    else setDisplayDate(displayYear, displayMonth);

    setCalender();
    resetToDoList();
}
function onPrevMonthButtonClicked() {
    resetCalender();

    displayMonth--;
    if (displayMonth < 0) setDisplayDate(--displayYear, displayMonth + 12);
    else setDisplayDate(displayYear, displayMonth);

    setCalender();
    resetToDoList();
}
function init() {
    if (btnPrevMonth != null) btnPrevMonth.addEventListener('click', onPrevMonthButtonClicked);
    if (btnNextMonth != null) btnNextMonth.addEventListener('click', onNextMonthButtonClicked);
    getCurrentCalender();
}
init();