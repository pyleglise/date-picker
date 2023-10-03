import logo from './logo.svg'
import './App.css'
import { DatePicker } from './lib/components/Datepicker'

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
    console.log(inputValue)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src={logo}
          className='App-logo'
          alt='logo'
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
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
    </div>
  )
}

export default App
