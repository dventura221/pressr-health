import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Card,
  Avatar,
  Button,
  Chart,
  Dataset,
  Input,
  Accordion,
  AccordionSection
} from 'react-rainbow-components'
import 'boxicons'

const UserDetail = () => {
  let navigate = useNavigate()
  let { userId } = useParams()

  const [user, setUser] = useState([])
  const [readings, setReadings] = useState([])
  const [sysReadings, setSysReadings] = useState([])
  const [diasReadings, setDiasReadings] = useState([])
  const [labels, setLabels] = useState([])
  const [toggle, setToggle] = useState(false)
  const [bpValue, setBpValue] = useState({
    user_id: userId,
    systolic: '',
    diastolic: ''
  })
  const [counter, setCounter] = useState(1000)
  const [updateReading, setUpdateReading] = useState({
    user_id: userId,
    systolic: '',
    diastolic: ''
  })

  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get(`http://localhost:8000/users/${userId}`)
      let readingres = await axios.get(`http://localhost:8000/readings/`)
      let readingsfiltered = readingres.data.filter(
        (reading) => reading.user_id === parseInt(`${userId}`)
      )
      setUser(res.data)
      setReadings(readingsfiltered)
      setSysReadings(
        readingsfiltered.map((sys_reading) => sys_reading.systolic)
      )
      setDiasReadings(
        readingsfiltered.map((dias_reading) => dias_reading.diastolic)
      )
      setLabels(
        readingsfiltered.map((reading_dates) => reading_dates.created_at)
      )
    }
    getUser()
  }, [userId, counter])

  const datasets = [
    {
      title: 'Systolic',
      borderColor: '#fe4849',
      values: sysReadings
    },
    {
      title: 'Diastolic',
      borderColor: '#01b6f5',
      values: diasReadings
    }
  ]

  const renderDatasets = () => {
    return datasets.map(({ title, values, borderColor }) => (
      <Dataset
        key={title}
        title={title}
        values={values}
        borderColor={borderColor}
        backgroundColor={borderColor}
      />
    ))
  }

  const changeToggle = () => {
    if (toggle === true) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  const handleSubmit = async (e) => {
    //e.preventDefault()
    const res = await axios
      .post(`http://localhost:8000/readings/`, bpValue)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setBpValue({
      user_id: userId,
      systolic: '',
      diastolic: ''
    })
    setCounter(counter + 1)
  }

  const handleChange = (e) => {
    setBpValue({ ...bpValue, [e.target.name]: e.target.value })
  }

  const deleteReadingHandler = async (id) => {
    const res = await axios
      .delete(`http://localhost:8000/readings/${id}`)
      .then((res) => console.log('delete street successful'))
      .catch((err) => console.log(err.data))
    setCounter(counter + 1)
  }

  const updateReadingHandleChange = async (e, id) => {
    e.preventDefault()
    const res = await axios
      .put(`http://localhost:8000/readings/${id}`, updateReading)
      .then((res) => console.log('update street successful'))
      .catch((err) => console.log(err.data))
    setUpdateReading({
      user_id: userId,
      systolic: '',
      diastolic: ''
    })
    setCounter(counter + 1)
  }

  return user && readings ? (
    <div>
      <div>
        <div>
          <Button onClick={() => navigate('/')}>Home</Button>
          <Button onClick={() => navigate('/users')}>Users</Button>
        </div>
        <h1>Patient Details</h1>
        <Card>
          <Avatar src={user.photo_url} size="large" />
          <h2>
            {user.last_name}, {user.first_name}
          </h2>
          <h3>Date of Birth: {user.dob}</h3>
        </Card>
      </div>
      <div>
        <Accordion>
          <AccordionSection label="Add new blood pressure Reading">
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
          </AccordionSection>
        </Accordion>
      </div>
      <div>
        {toggle === false ? (
          <Button onClick={changeToggle}>See Graph</Button>
        ) : (
          <Button onClick={changeToggle}>See Readings</Button>
        )}
      </div>
      {toggle === false ? (
        <div>
          <h3>Blood Pressure Readings:</h3>
          {readings ? (
            <div>
              {readings.map((reading) => (
                <Link
                  to={`/readings/${reading.id}`}
                  key={reading.id}
                  state={{
                    user: { userId }
                  }}
                >
                  <Card>
                    <h4>
                      {reading.systolic}/{reading.diastolic}
                    </h4>
                    <p>{reading.created_at}</p>
                    <Button onClick={() => deleteReadingHandler(reading.id)}>
                      <box-icon name="x" color="#fb0000"></box-icon>
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <h3>None so far...</h3>
          )}
        </div>
      ) : null}
      {toggle === true ? (
        <div>
          <Chart labels={labels} type="line" showLegend={true}>
            {renderDatasets()}
          </Chart>
        </div>
      ) : null}
    </div>
  ) : null
}

export default UserDetail
