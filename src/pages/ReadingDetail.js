import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from 'react-rainbow-components'
import axios from 'axios'

const ReadingDetail = () => {
  let navigate = useNavigate()
  const location = useLocation()
  const user = location.state.from
  //console.log('Location', location)
  console.log('User', user)

  let { readingId } = useParams()

  const [reading, setReading] = useState()

  useEffect(() => {
    const getReading = async () => {
      let res_reading = await axios.get(
        `http://localhost:8000/readings/${readingId}`
      )
      setReading(res_reading.data)
    }
    getReading()
  }, [])

  console.log('Reading', reading)

  return (
    <div>
      <h1>Reading Detail FILLER</h1>
      <div>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/users')}>Users</Button>
      </div>
    </div>
  )
}

export default ReadingDetail
