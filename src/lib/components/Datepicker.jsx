import React from 'react'
import { useState } from 'react'
import {createUseStyles} from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons'
import formatDateUS from '../dateFormat'

const dateNow = new Date()
const yearNow = dateNow.getFullYear()

/**
 * CSS definition of the date picker /
 * Using package react-jss
 *
 * @namespace
 * @author  Pierre-Yves Léglise <pleglise@pm.me>
 * 
 */
const useStyles = createUseStyles({
  "cal-button": {
    "font-family": 'sans-serif',
    "align-self": "center",
    "padding": "0.25rem",
    "font-size": "0.75rem",
    // "line-height": "1rem",
    "border-radius": "0.25rem",
    "background-color": "#3a33a4",
    "color": "white"
  },
  "cal-button:hover": {
    "background-color": "white",
    "color": "black",
    "box-shadow": "0 2px 10px 5px #bcbcbc"
  },
  "darkBG": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "background-color": "rgba(0, 0, 0, 0.2)",
    "width": "100%",
    "height": "100%",
    "overflow": "hidden",
    "z-index": "0",
    "position": "absolute",
    "top": "0",
    "left": "0"
  },
  "cal-cell": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "cursor": "pointer",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "100%",
    "border-radius": "0.25rem"
  },
  "cal-cell:hover": {
    "background-color": "#082450",
    "color": "white"
  },
  "year-grid": {
    "font-family": 'sans-serif',
    "display": "grid",
    "grid-template-columns": "repeat(5, minmax(0, 1fr))",
    "width": "100%",
    "padding-right": "0.25rem",
    "cursor": "default",
    "font-size": "1rem",
    "line-height": "1.5rem",
    "text-align": "center",
    "height": "9.6em",
    "overflow-y": "auto"
  },
  "days-header": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "display": "grid",
    "grid-template-columns": "repeat(7, minmax(0, 1fr))",
    "gap": "0.25rem",
    "border-bottom-width": "2px",
    "text-align": "center",
    "cursor": "default"
  },
  "days-grid": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "display": "grid",
    "margin-top": "0.25rem",
    "grid-template-columns": "repeat(7, minmax(0, 1fr))",
    "gap": "0.25rem",
    "text-align": "center"
  },
  "day-selected": {
    "font-weight": "700",
    "background-color": "rgba(0, 0, 0, 0.2)"
  },
  "year-selected": {
    "font-weight": "700",
    "background-color": "rgba(0, 0, 0, 0.2)"
  },
  "month-grid": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "display": "grid",
    "grid-template-columns": "repeat(3, minmax(0, 1fr))",
    "width": "100%",
    "padding-right": "0.25rem",
    "cursor": "default",
    "line-height": "1.5rem",
    "text-align": "center",
    "height": "9em",
    "overflow-y": "auto"
  },
  "month-selected": {
    "font-size": ".95em",
    "font-weight": "700",
    "background-color": "rgba(0, 0, 0, 0.2)"
  },
  "italic": {
    "font-style": "italic"
  },
  "nav-container": {
    "font-family": 'sans-serif',
  "font-size": "1em",
    'margin-bottom':'0.5em',
    "display": "flex",
    "justify-content": "space-between"
  },
  "nav-buttons": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    margin:0,
    "display": "flex",
    "gap": "0.5rem",
    "align-self": "center",
    "font-weight": "700"
  },
  "nav-button": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    margin:'0.5em',
    "padding-left": "0.25rem",
    "padding-right": "0.25rem",
    "cursor": "pointer"
  },
  "nav-button:hover": {
    "border-radius": "0.25rem",
    "color": "#ffffff",
    "background-color": "#082450"
  },
  "main-container": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "position": "fixed",
    "border-radius": "0.5rem",
    "width": "auto",
    "height": "auto",
    "background-color": "white",
    "box-shadow": "0 5px 20px 0px #00011c"
  },
  "date-picker-container": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "padding-top": "0.5rem",
    "padding-bottom": "0.5rem",
    "margin-left": "0.75rem",
    "margin-right": "0.75rem",
    "text-align": "left",
    "width": "16.3em",
    "height": "auto"
  },
  "margin-left": {
    "margin-left": "0.25rem"
  }
}
)

/**
 * Component that displays a date picker
 *
 * @namespace
 * @component
 * @author  Pierre-Yves Léglise <pleglise@pm.me>
 * @example
 * import { DatePicker } from 'date-picker-nextjs'
import { useState } from 'react'

const Example = () => {
  const [modalDateIsOpen, setModalDateIsOpen] = useState(false)
  const [clickedInput, setClickedInput] = useState(null)

  const handleDatePicker = (e) => {
    setClickedInput(e.target.id)
    setModalDateIsOpen(true)
  }

  const submit = (e) => {
    e.preventDefault()
    // your logic
    console.log(inputValue)
  }

  return (
    <form
      className='test'
      onSubmit={submit}
    >
      <label htmlFor='birthdate'>Birthdate</label>
      <input
        className='input-field outline-none'
        type='text'
        id='dateOfBirth'
        placeholder='Date of birth'
        onClick={handleDatePicker}
      />

      <input
        type='submit'
        value='Submit'
      />
    </form>
    {modalDateIsOpen && (
        <DatePicker
          setModalDateIsOpen={setModalDateIsOpen}
          clickedInput={clickedInput}
        />
      )}
  )
}

export default Example
 * @prop {Object}     setModalIsOpen                 State function used to close the modal.
 * @prop {String}     clickedInput                   The id of the input filed to attach the date picker modal to
 * @prop {Number}     endYear                    (optionnal) The last year to display. Default : current year
 * @prop {Number}     yearCount                    (optionnal) The number of years to display. Default : 100
 * 
 * @returns {JSX.Element}   A JSX.Element that contains the modal.
 */
const DatePicker=({
  setModalDateIsOpen,
  clickedInput,
  endYear = yearNow,
  yearCount = 100,
}) =>{
  const styles=useStyles()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [yearSelectIsOpen, setYearSelectIsOpen] = useState(false)
  const [monthSelectIsOpen, setMonthSelectIsOpen] = useState(false)

  /**
   * Change the selected month by a specified amount.
   *
   * @param {number} amount - The amount to change the month by.
   */
  const changeMonth = (amount) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(selectedDate.getMonth() + amount)
    setSelectedDate(newDate)
  }
/**
   * Change the selected year to a specific year.
   *
   * @param {number} year - The year to set as the selected year.
   */
  const changeYear = (year) => {
    const newDate = new Date(selectedDate)
    newDate.setFullYear(year)
    setSelectedDate(newDate)
    toggleYearScreen()
  }
 /**
   * Select a specific month.
   *
   * @param {number} month - The month to select.
   */
  const selectMonth = (month) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(month)
    setSelectedDate(newDate)
    toggleMonthScreen()
  }
/**
   * Select a specific date and set it as the input value.
   *
   * @param {Date} date - The selected date.
   */
  const selectDate = (date) => {
    document.getElementById(clickedInput).value = formatDateUS(date)
    setModalDateIsOpen(false)
  }
  /**
   * Toggle the year selection screen.
   */
  const toggleYearScreen = () => {
    setYearSelectIsOpen(!yearSelectIsOpen)
    setMonthSelectIsOpen(false)
  }
  /**
   * Toggle the month selection screen.
   */
  const toggleMonthScreen = () => {
    setMonthSelectIsOpen(!monthSelectIsOpen)
    setYearSelectIsOpen(false)
  }
/**
   * Get the day of the week for the first day of the selected month.
   *
   * @returns {number} The day of the week for the first day.
   */
  const getFirstDayOfWeek = () => {
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    )
    if (firstDay.getDay() === 0) return 7
    else return firstDay.getDay()
  }

  /**
   * Generate the years to be displayed.
   *
   * @returns {JSX.Element} JSX elements representing the years.
   */
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
          className={styles['cal-cell'] + (yearToday === year ? ' '+styles['year-selected'] : '')}
        >
          {year}
        </div>
      )
    }
    return <div className={styles["year-grid"]}>{years.reverse()}</div>
  }

   /**
   * Generate the months to be displayed.
   *
   * @returns {JSX.Element} JSX elements representing the months.
   */
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
            styles['cal-cell'] +
            (monthToday === month - 1 && yearToday === selectedYear
              ? ' '+styles['month-selected']
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
        className={styles["month-grid"]}
      >
        {months}
      </div>
    )
  }

  /**
   * Generate the days to be displayed.
   *
   * @returns {JSX.Element} JSX elements representing the days.
   */
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
            styles['cal-cell'] +
            (dayToday === date &&
            monthToday === selectedMonth &&
            yearToday === selectedYear
              ? ' '+styles['day-selected']
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
        <div className={styles["days-header"]}>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div className="italic">Sat</div>
          <div className="italic">Sun</div>
        </div>
        <div className={styles["days-grid"]}>{days}</div>
      </>
    )
  }
  /**
   * Render the navigator for the date picker.
   *
   * @returns {JSX.Element} JSX elements for the date picker navigator.
   */
  const datePickerNavigator = () => {
    return (
      <div className={styles["nav-container"]}>
        <FontAwesomeIcon
          className={styles["cal-button"]}
          icon={faArrowLeft}
          onClick={() => changeMonth(-1)}
        />
        <div className={styles["nav-buttons"]}>
          <div>
            <p className={styles["nav-button"]} onClick={toggleMonthScreen}>
              {selectedDate.toLocaleDateString('default', {
                month: 'long',
              })}
              <span className={styles["margin-left"]}>
                <FontAwesomeIcon
                  icon={monthSelectIsOpen ? faCaretDown : faCaretUp}
                />
              </span>
            </p>
          </div>
          <div>
            <p className={styles["nav-button"]} onClick={toggleYearScreen}>
              {selectedDate.toLocaleDateString('default', {
                year: 'numeric',
              })}
              <span className={styles["margin-left"]}>
                <FontAwesomeIcon
                  icon={yearSelectIsOpen ? faCaretDown : faCaretUp}
                />
              </span>
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          className={styles["cal-button"]}
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
        className={styles["darkBG"]}
        onClick={(e) => {
          e.target.className === styles['darkBG'] && setModalDateIsOpen(false)
        }}
      >
        <div
          className={styles["main-container"]}
          style={{ top: topOffset, left: leftOffset }}
        >
          <div className={styles["date-picker-container"]}>
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
export default DatePicker
