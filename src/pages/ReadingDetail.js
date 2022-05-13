import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  Avatar,
  Accordion,
  AccordionSection,
  Input
} from 'react-rainbow-components'
import axios from 'axios'

const ReadingDetail = () => {
  let navigate = useNavigate()
  let { readingId } = useParams()
  const location = useLocation()
  const user = location.state.user.user
  //console.log('Location', location)
  //console.log('User', user)

  const [reading, setReading] = useState()
  const [counter, setCounter] = useState(1000)
  const [updateReading, setUpdateReading] = useState({
    user_id: user.id,
    systolic: '',
    diastolic: ''
  })

  useEffect(() => {
    const getReading = async () => {
      let res_reading = await axios.get(
        `http://localhost:8000/readings/${readingId}`
      )
      setReading(res_reading.data)
    }
    getReading()
  }, [counter])

  //console.log('Reading', reading)

  const deleteReadingHandler = async () => {
    const res = await axios
      .delete(`http://localhost:8000/readings/${readingId}`)
      .then((res) => console.log('delete street successful'))
      .catch((err) => console.log(err.data))
    setCounter(counter + 1)
    navigate(`/users/${user.id}`)
  }

  const updateReadingHandleChange = async (e) => {
    e.preventDefault()
    const res = await axios
      .put(`http://localhost:8000/readings/${readingId}`, updateReading)
      .then((res) => console.log('update street successful'))
      .catch((err) => console.log(err.data))
    setUpdateReading({
      ...updateReading,
      systolic: '',
      diastolic: ''
    })
    setCounter(counter + 1)
  }

  const handleChange = (e) => {
    setUpdateReading({ ...updateReading, [e.target.name]: e.target.value })
  }

  return user && reading ? (
    <div>
      <h1>Reading Details</h1>
      <div>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate(`/users/${user.id}`)}>
          Back to User
        </Button>
      </div>
      <div>
        <Card>
          <Avatar src={user.photo_url} size="large" />
          <h2>
            {user.last_name}, {user.first_name}
          </h2>
          <h3>Date of Birth: {user.dob}</h3>
        </Card>
      </div>
      <div>
        <Card>
          <h4>
            {reading.systolic}/{reading.diastolic}
          </h4>
          <p>{reading.created_at}</p>
          <Button onClick={() => deleteReadingHandler(reading.id)}>
            <box-icon name="x" color="#fb0000"></box-icon>
          </Button>
        </Card>
      </div>
      <div>
        <Accordion>
          <AccordionSection label="Edit Blood Pressure Reading">
            <form onSubmit={updateReadingHandleChange}>
              <Input
                label="Systolic"
                placeholder="123"
                type="number"
                name="systolic"
                value={setUpdateReading.systolic}
                onChange={handleChange}
              />
              <Input
                label="Diastolic"
                placeholder="123"
                type="number"
                name="diastolic"
                value={setUpdateReading.diastolic}
                onChange={handleChange}
              />
              <Button onClick={updateReadingHandleChange}>Submit</Button>
            </form>
          </AccordionSection>
        </Accordion>
      </div>
    </div>
  ) : null
}

export default ReadingDetail
