import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons'
import formatDateUS from '../dateFormat'
// import './Datepicker.css'
const dateNow = new Date()
const yearNow = dateNow.getFullYear()

export default function DatePicker({
  setModalDateIsOpen,
  clickedInput,
  endYear = yearNow,
  yearCount = 100,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [yearSelectIsOpen, setYearSelectIsOpen] = useState(false)
  const [monthSelectIsOpen, setMonthSelectIsOpen] = useState(false)

  const changeMonth = (amount) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(selectedDate.getMonth() + amount)
    setSelectedDate(newDate)
  }

  const changeYear = (year) => {
    const newDate = new Date(selectedDate)
    newDate.setFullYear(year)
    setSelectedDate(newDate)
    toggleYearScreen()
  }

  const selectMonth = (month) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(month)
    setSelectedDate(newDate)
    toggleMonthScreen()
  }

  const selectDate = (date) => {
    document.getElementById(clickedInput).value = formatDateUS(date)
    setModalDateIsOpen(false)
  }
  const toggleYearScreen = () => {
    setYearSelectIsOpen(!yearSelectIsOpen)
    setMonthSelectIsOpen(false)
  }
  const toggleMonthScreen = () => {
    setMonthSelectIsOpen(!monthSelectIsOpen)
    setYearSelectIsOpen(false)
  }

  const getFirstDayOfWeek = () => {
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    )
    return firstDay.getDay()
  }
  const generateYears = () => {
    const today = new Date()
    const yearToday = today.getFullYear()
    const years = []
    for (let year = endYear - yearCount; year <= endYear; year++) {
      years.push(
        <div
          key={`year-${year}`}
          id={`year-${year}`}
          onClick={() => changeYear(year)}
          className={'cal-cell' + (yearToday === year ? ' year-selected' : '')}
        >
          {year}
        </div>
      )
    }
    return <div className="year-grid">{years.reverse()}</div>
  }
  const generateMonths = () => {
    const today = new Date()
    const monthToday = today.getMonth()
    const months = []
    const yearToday = today.getFullYear()
    const selectedYear = selectedDate.getFullYear()
    for (let month = 1; month <= 12; month++) {
      const date = new Date(Date.UTC(2000, month, 1))
      const monthString = date.toLocaleString('default', { month: 'long' })
      months.push(
        <div
          key={`month-${month}`}
          id={`month-${month}`}
          onClick={() => selectMonth(month - 1)}
          className={
            'cal-cell' +
            (monthToday === month - 1 && yearToday === selectedYear
              ? ' month-selected'
              : '')
          }
        >
          {monthString}
        </div>
      )
    }
    return (
      <div
        // ref={refYearsList}
        className="month-grid"
      >
        {months}
      </div>
    )
  }
  const generateDays = () => {
    const days = []
    const firstDayOfWeek = getFirstDayOfWeek()
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    )
    const today = new Date()
    const dayToday = today.getDate()
    const yearToday = today.getFullYear()
    const selectedYear = selectedDate.getFullYear()
    const monthToday = today.getMonth()
    const selectedMonth = selectedDate.getMonth()

    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`}></div>)
    }

    for (let date = 1; date <= lastDay.getDate(); date++) {
      days.push(
        <div
          key={date}
          className={
            'cal-cell' +
            (dayToday === date &&
            monthToday === selectedMonth &&
            yearToday === selectedYear
              ? ' day-selected'
              : '')
          }
          onClick={() =>
            selectDate(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                date
              )
            )
          }
        >
          {date}
        </div>
      )
    }

    return (
      <>
        <div className="days-header">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div className="italic">Sat</div>
          <div className="italic">Sun</div>
        </div>
        <div className="days-grid">{days}</div>
      </>
    )
  }
  const datePickerNavigator = () => {
    return (
      <div className="nav-container">
        <FontAwesomeIcon
          className="cal-button"
          icon={faArrowLeft}
          onClick={() => changeMonth(-1)}
        />
        <div className="nav-buttons">
          <div>
            <p className="nav-button" onClick={toggleMonthScreen}>
              {selectedDate.toLocaleDateString('default', {
                month: 'long',
              })}
              <span className="margin-left">
                <FontAwesomeIcon
                  icon={monthSelectIsOpen ? faCaretDown : faCaretUp}
                />
              </span>
            </p>
          </div>
          <div>
            <p className="nav-button" onClick={toggleYearScreen}>
              {selectedDate.toLocaleDateString('default', {
                year: 'numeric',
              })}
              <span className="margin-left">
                <FontAwesomeIcon
                  icon={yearSelectIsOpen ? faCaretDown : faCaretUp}
                />
              </span>
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          className="cal-button"
          icon={faArrowRight}
          onClick={() => changeMonth(1)}
        />
      </div>
    )
  }

  if (clickedInput) {
    const inputElement = document.getElementById(clickedInput)
    const inputRect = inputElement.getBoundingClientRect()
    const topOffset = inputRect.top + window.scrollY + 32
    const leftOffset = inputRect.left + window.scrollX

    return (
      <div
        className="darkBG"
        onClick={(e) => {
          e.target.className === 'darkBG' && setModalDateIsOpen(false)
        }}
      >
        <div
          className="main-container"
          style={{ top: topOffset, left: leftOffset }}
        >
          <div className="date-picker-container">
            {datePickerNavigator()}
            <div>
              {yearSelectIsOpen
                ? generateYears()
                : monthSelectIsOpen
                ? generateMonths()
                : generateDays()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
