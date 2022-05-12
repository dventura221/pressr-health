//import { useState } from 'react'
import axios from 'axios'
import { Input, Button } from 'react-rainbow-components'

const ReadingForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios
      .post(`http://localhost:8000/readings/`, props.bpValue)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    props.setBpValue({
      user_id: props.user.id,
      systolic: '',
      diastolic: ''
    })
  }

  const handleChange = (e) => {
    props.setBpValue({ ...props.bpValue, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h3>Add new blood pressure Reading</h3>
      <form onSubmit={handleSubmit}>
        <Input
          label="Systolic"
          placeholder="123"
          type="number"
          name="systolic"
          value={props.setBpValue.systolic}
          onChange={handleChange}
        />
        <Input
          label="Diastolic"
          placeholder="123"
          type="number"
          name="diastolic"
          value={props.setBpValue.diastolic}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

export default ReadingForm
