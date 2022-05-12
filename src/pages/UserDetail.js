import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Avatar, Button } from 'react-rainbow-components'

const UserDetail = () => {
  let navigate = useNavigate()
  const [user, setUser] = useState([])
  const [readings, setReadings] = useState()

  let { userId } = useParams()

  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get(`http://localhost:8000/users/${userId}`)
      let readingres = await axios.get(`http://localhost:8000/readings/`)
      let readingsfiltered = readingres.data.filter(
        (reading) => reading.user_id === parseInt(`${userId}`)
      )
      console.log(readingsfiltered)
      setUser(res.data)
      setReadings(readingsfiltered)
    }
    getUser()
  }, [userId])

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
  ) : null
}

export default UserDetail
