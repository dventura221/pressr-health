import axios from 'axios'
import { useState, useEffect } from 'react'

const AllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`http://localhost:8000/users`)
      console.log(res)
    }
    getUsers()
  }, [])

  return (
    <div>
      <h1>All Users FILLER</h1>
    </div>
  )
}

export default AllUsers
