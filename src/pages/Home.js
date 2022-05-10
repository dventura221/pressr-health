import { VisualPicker, VisualPickerOption } from 'react-rainbow-components'
import { useState } from 'react'

const Home = () => {
  const [selected, setSelected] = useState(null)

  const handleOnChange = (selected) => {
    setSelected(selected)
    console.log(selected)
  }

  return (
    <div>
      <h1>HOME FILLER</h1>
      <div>
        <VisualPicker onChange={handleOnChange} value={selected}>
          <VisualPickerOption>
            <h4>Patient User</h4>
          </VisualPickerOption>
          <VisualPickerOption>
            <h4>Provider User</h4>
          </VisualPickerOption>
        </VisualPicker>
      </div>
      <div>
        <h2>Get Started FILLER</h2>
      </div>
    </div>
  )
}

export default Home
