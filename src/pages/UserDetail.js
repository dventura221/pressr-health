import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Avatar, Button, Chart, Dataset } from 'react-rainbow-components'
import ReadingForm from '../components/ReadingForm'

const UserDetail = () => {
  let navigate = useNavigate()
  let { userId } = useParams()

  const [user, setUser] = useState([])
  const [readings, setReadings] = useState([])
  const [sysReadings, setSysReadings] = useState([])
  const [diasReadings, setDiasReadings] = useState([])
  const [labels, setLabels] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get(`http://localhost:8000/users/${userId}`)
      let readingres = await axios.get(`http://localhost:8000/readings/`)
      let readingsfiltered = readingres.data.filter(
        (reading) => reading.user_id === parseInt(`${userId}`)
      )
      //console.log(readingsfiltered)
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
  }, [userId])

  // console.log('Readings', readings)
  // console.log('Sys', sysReadings)
  // console.log('Dias', diasReadings)
  // console.log('Dates', labels)

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
        <ReadingForm user={user} />
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
                <Card key={reading.id}>
                  <p>
                    {reading.systolic}/{reading.diastolic}
                  </p>
                  <p>{reading.created_at}</p>
                </Card>
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
