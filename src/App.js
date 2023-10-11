import { DatePicker } from 'date-picker-nextjs'
import './App.css'
// import DatePicker from './lib/components/Datepicker'
import { useState } from 'react'

function App() {
  const [modalDateIsOpen, setModalDateIsOpen] = useState(false)
  const [clickedInput, setClickedInput] = useState(null)

  const handleDatePicker = (e) => {
    setClickedInput(e.target.id)
    setModalDateIsOpen(true)
  }

  const submit = (e) => {
    e.preventDefault()
    // your logic
    // console.log(inputValue)
  }

  return (
    <>
      <form className="test" onSubmit={submit}>
        <label htmlFor="birthdate">Birthdate</label>
        <input
          className="input-field outline-none"
          type="text"
          id="dateOfBirth"
          placeholder="Date of birth"
          onClick={handleDatePicker}
        />

        <input type="submit" value="Submit" />
      </form>
      {modalDateIsOpen && (
        <DatePicker
          setModalDateIsOpen={setModalDateIsOpen}
          clickedInput={clickedInput}
        />
      )}
    </>
  )
}

export default App
