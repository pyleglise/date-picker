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
import utilStyles from './styles/utils.module.scss'
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
      1,
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
          className={
            utilStyles['cal-cell'] +
            (yearToday === year ? ' font-bold bg-[rgba(0,0,0,0.2)]' : '')
          }
        >
          {year}
        </div>,
      )
    }
    return (
      <div
        className={
          'grid grid-cols-5 w-full pr-1 text-base text-center cursor-default h-[10.4em] overflow-y-auto'
        }
      >
        {years.reverse()}
      </div>
    )
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
            utilStyles['cal-cell'] +
            (monthToday === month - 1 && yearToday === selectedYear
              ? ' text-[.95em] font-bold bg-[rgba(0,0,0,0.2)]'
              : '')
          }
        >
          {monthString}
        </div>,
      )
    }
    return (
      <div
        // ref={refYearsList}
        className={
          'grid grid-cols-3 w-full text-base cursor-default h-[10.4em] overflow-y-auto'
        }
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
      0,
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
            utilStyles['cal-cell'] +
            (dayToday === date &&
            monthToday === selectedMonth &&
            yearToday === selectedYear
              ? ' font-bold bg-[rgba(0,0,0,0.2)]'
              : '')
          }
          onClick={() =>
            selectDate(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                date,
              ),
            )
          }
        >
          {date}
        </div>,
      )
    }

    return (
      <>
        <div className='grid grid-cols-7 gap-1 text-center border-b-2 cursor-default'>
          <div className=''>Mon</div>
          <div className=''>Tue</div>
          <div className=''>Wed</div>
          <div className=''>Thu</div>
          <div className=''>Fri</div>
          <div className='italic '>Sat</div>
          <div className='italic '>Sun</div>
        </div>
        <div className='grid grid-cols-7 gap-1 text-center mt-1'>{days}</div>
      </>
    )
  }
  const datePickerNavigator = () => {
    return (
      <div className='flex justify-between mb-1'>
        <FontAwesomeIcon
          className={utilStyles['cal-button']}
          icon={faArrowLeft}
          onClick={() => changeMonth(-1)}
        />
        <div className='flex self-center font-bold gap-2'>
          <div>
            <p
              className='px-1 cursor-pointer hover:bg-bg-color-light hover:text-white hover:rounded '
              onClick={toggleMonthScreen}
            >
              {selectedDate.toLocaleDateString('default', {
                month: 'long',
              })}
              <span className='ml-1'>
                <FontAwesomeIcon
                  icon={monthSelectIsOpen ? faCaretDown : faCaretUp}
                />
              </span>
            </p>
          </div>
          <div>
            <p
              className='px-1 cursor-pointer hover:bg-bg-color-light hover:text-white hover:rounded '
              onClick={toggleYearScreen}
            >
              {selectedDate.toLocaleDateString('default', {
                year: 'numeric',
              })}
              <span className='ml-1'>
                <FontAwesomeIcon
                  icon={yearSelectIsOpen ? faCaretDown : faCaretUp}
                />
              </span>
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          className={utilStyles['cal-button']}
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
        className={utilStyles['darkBG']}
        onClick={(e) => {
          e.target.className === utilStyles['darkBG'] &&
            setModalDateIsOpen(false)
        }}
      >
        <div
          className='fixed h-auto w-auto  bg-white rounded-lg shadow-[0_5px_20px_0] really-dark'
          style={{ top: topOffset, left: leftOffset }}
        >
          <div className='text-left mx-3 py-2 w-[16.3em] h-[13.1em] '>
            {datePickerNavigator()}
            <div className=''>
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
