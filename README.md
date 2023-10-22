# Simple Date Picker component created for Next.js projects

A datepicker component built with Next.js using FontAwesome

## Installation

```
npm i date-picker-nextjs
```

Or :

```
yarn add date-picker-nextjs
```

Or :

```
pnpm add date-picker-nextjs
```

## Example of use

```js
import { DatePicker } from 'date-picker-nextjs'
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

export default Example
```

#

### props:

`setModalDateIsOpen` : This state function is mandatory and will allow the date picker modal to close itself | _**Required**_

`clickedInput` : The id of the input filed to attach the date picker modal to
| _**Required**_

`endYear` : The last year to display. Default : current year | _**Optional**_

`yearCount` : The nomber of years to display. Default : 100 | _**Optional**_

#

### Additional informations:

[Developper documentation](https://pyleglise.github.io/date-picker/)

Author : [Pierre-Yves Léglise](https://github.com/pyleglise/)
