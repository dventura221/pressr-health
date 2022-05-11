import axios from 'axios'
import { useState, useEffect } from 'react'
import { Avatar, Card } from 'react-rainbow-components'
import { Link } from 'react-router-dom'

const AllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      let res = await axios.get(`http://localhost:8000/users/`)
      //console.log(res.data)
      setUsers(res.data)
    }
    getUsers()
  }, [])

  //console.log(users)

  return (
    <div>
      <h1>All Patients (Users)</h1>
      <div>
        {users.map((user) => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <Card>
              <Avatar src={user.photo_url} size="large" />
              <h2>
                {user.last_name}, {user.first_name}
              </h2>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllUsers
