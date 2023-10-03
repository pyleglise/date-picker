# Simple Date Picker component created for Next.js projects

A datepicker component built with Next.js using FontAwesome

## Installation

```
npm i nextsj-date-picker
```

Or :

```
yarn add nextsj-date-picker
```

Or :

```
pnpm add nextsj-date-picker
```

## Importing the css stylesheet

For compatibility purpose with next.js projects, the css stylesheet needs to be imported in your project.
Import the date picker and his css as shown in the example below :

## Example of use

```js
import { DatePicker } from 'date-picker-nextjs'
import 'date-picker-nextjs/dist/components/Datepicker.css'
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
```

#

### props:

`setModalDateIsOpen` : This state function is mandatory and will allow the date picker modal to close itself | _**Required**_

`clickedInput` : The id of the input filed to attach the date picker modal to
| _**Required**_

`endYear` : The last year to display. Default : current year | _**Optional**_

`yearCount` : The nomber of years to display. Default : 100 | _**Optional**_
