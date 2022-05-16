import axios from 'axios'
import { useState, useEffect } from 'react'
import { Avatar, Card, Button } from 'react-rainbow-components'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/api'

const AllUsers = () => {
  let navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      let res = await axios.get(`${BASE_URL}/users/`)
      setUsers(res.data)
    }
    getUsers()
  }, [])

  const getDOB = (arg) => {
    const date = arg
    const [year, month, day] = date.split('-')
    let result = [month, day, year].join('/')
    return result
  }

  return (
    <div>
      <h1>All Patients</h1>
      <div>
        {users.map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            state={{
              user: { user }
            }}
            style={{ textDecoration: 'none' }}
          >
            <Card className="ptCard">
              <Avatar src={user.photo_url} size="large" />
              <h2>
                {user.last_name}, {user.first_name}
              </h2>
              <h3>Date of Birth: {getDOB(user.dob)}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllUsers
