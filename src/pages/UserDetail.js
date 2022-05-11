import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const [user, setUser] = useState({})

  let { userId } = useParams()

  useEffect(() => {
    const getUser = async () => {
      let res = axios.get(`http://localhost:8000/users/${userId}/`)
      console.log(res)
      setUser(res)
    }
    getUser()
  }, [])

  console.log(user)

  return (
    <div>
      <h1>User Detail FILLER</h1>
    </div>
  )
}

export default UserDetail
