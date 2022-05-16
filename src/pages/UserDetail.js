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
import { BASE_URL } from '../services/api'

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

  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get(`${BASE_URL}/users/${userId}`)
      let readingres = await axios.get(`${BASE_URL}/readings/`)
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
        readingsfiltered.map((reading_dates) =>
          getReadingDate(reading_dates.created_at)
        )
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
    e.preventDefault()
    const res = await axios
      .post(`${BASE_URL}/readings/`, bpValue)
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

  const getDOB = (arg) => {
    const date = arg
    const [year, month, day] = date.split('-')
    let result = [month, day, year].join('/')
    return result
  }

  const getReadingDate = (arg) => {
    let date = new Date(arg)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()
    if (dt < 10) {
      dt = '0' + dt
    }
    if (month < 10) {
      month = '0' + month
    }
    const myDate = arg
    const time = new Date(myDate).toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: false
    })
    return month + '/' + dt + '/' + year + ' at ' + time
  }
  console.log(readings)
  let rev_readings = [...readings].reverse()
  console.log('Reverse', rev_readings)

  return user && readings ? (
    <div>
      <div>
        <div>
          <Button
            onClick={() => navigate('/users')}
            className="backToAllUsersButton"
          >
            Back to All Users
          </Button>
        </div>
        <h1>Patient Details</h1>
        <Card className="ptCard">
          <Avatar src={user.photo_url} size="large" />
          <h2>
            {user.last_name}, {user.first_name}
          </h2>
          {user.dob ? <h3>Date of Birth: {getDOB(user.dob)}</h3> : null}
        </Card>
      </div>
      <div>
        <Accordion>
          <AccordionSection label="Add New Blood Pressure Reading">
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
            <div className="readingsGrid">
              {rev_readings.map((reading) => (
                <Link
                  to={`/readings/${reading.id}`}
                  key={reading.id}
                  state={{
                    user: { user }
                  }}
                  // https://www.daggala.com/passing-props-through-link-in-react-router/
                  style={{ textDecoration: 'none' }}
                >
                  <Card className="readingCard">
                    <h4>
                      {reading.systolic}/{reading.diastolic}
                    </h4>
                    <p>{getReadingDate(reading.created_at)}</p>
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
        <div className="BPGraph">
          <Chart labels={labels} type="line" showLegend={true}>
            {renderDatasets()}
          </Chart>
        </div>
      ) : null}
    </div>
  ) : null
}

export default UserDetail
