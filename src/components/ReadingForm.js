import { useState } from 'react'
import axios from 'axios'
import { Input, Button } from 'react-rainbow-components'

const ReadingForm = (props) => {
  const [bpValue, setBpValue] = useState({
    user_id: props.user.id,
    systolic: '',
    diastolic: ''
  })

  const handleSubmit = async (e) => {
    console.log('Submit working')
    e.preventDefault()
    const res = await axios
      .post(`http://localhost:8000/readings/`, bpValue)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setBpValue({
      systolic: '',
      diastolic: ''
    })
  }

  const handleChange = (e) => {
    setBpValue({ ...bpValue, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1>Add new blood pressure Reading</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Systolic"
          placeholder="123"
          type="number"
          name="systolic"
          value={setBpValue.systolic}
          onChange={handleChange}
        />
        <Input
          label="Diastolic"
          placeholder="123"
          type="number"
          name="diastolic"
          value={setBpValue.diastolic}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

export default ReadingForm
