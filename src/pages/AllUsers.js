import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  Avatar,
  Card,
  Input,
  Button,
  Picklist,
  Option,
  Accordion,
  AccordionSection
} from 'react-rainbow-components'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/api'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [counter, setCounter] = useState(1000)
  const [newPatient, setNewPatient] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    username: '',
    password: '',
    photo_url: '',
    provider_id: ''
  })
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      let res = await axios.get(`${BASE_URL}/users/`)
      setUsers(res.data)
      let resProv = await axios.get(`${BASE_URL}/providers/`)
      setProviders(resProv.data)
    }
    getUsers()
  }, [counter])

  const getDOB = (arg) => {
    const date = arg
    const [year, month, day] = date.split('-')
    let result = [month, day, year].join('/')
    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios
      .post(`${BASE_URL}/users/`, newPatient)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setNewPatient({
      first_name: '',
      last_name: '',
      dob: '',
      username: '',
      password: '',
      photo_url: '',
      provider_id: ''
    })
    setCounter(counter + 1)
  }

  const handleChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value })
  }

  const convertValue = (value) => {
    console.log(value)
    setNewPatient({ ...newPatient, provider_id: parseInt(value.value.name) })
  }

  return (
    <div>
      <h1>All Patients</h1>
      <div>
        <Accordion>
          <AccordionSection label="Add New Patient">
            <form onSubmit={handleSubmit}>
              <Input
                required
                label="First Name"
                placeholder="First Name"
                type="text"
                name="first_name"
                value={setNewPatient.first_name}
                onChange={handleChange}
              />
              <Input
                required
                label="Last Name"
                placeholder="Last Name"
                type="text"
                name="last_name"
                value={setNewPatient.last_name}
                onChange={handleChange}
              />
              <Input
                required
                label="Date of Birth"
                placeholder="Date of Birth"
                type="date"
                name="dob"
                value={setNewPatient.dob}
                onChange={handleChange}
              />
              <Input
                required
                label="Username"
                placeholder="Username"
                type="text"
                name="username"
                value={setNewPatient.username}
                onChange={handleChange}
              />
              <Input
                required
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                value={setNewPatient.password}
                onChange={handleChange}
              />
              <Input
                required
                label="Photo"
                placeholder="Photo URL Only"
                type="text"
                name="photo_url"
                value={setNewPatient.photo_url}
                onChange={handleChange}
              />
              <Picklist
                required
                label="Provider"
                placeholder="Choose your Provider"
                type="text"
                value={newPatient.provider_id}
                onChange={(value) => convertValue({ value })}
              >
                {providers.map((provider) => (
                  <Option
                    name={provider.id}
                    label={`${provider.last_name}, ${provider.first_name}, ${provider.provider_type}`}
                    key={provider.id}
                  />
                ))}
              </Picklist>
              <Button onClick={handleSubmit}>Submit</Button>
            </form>
          </AccordionSection>
        </Accordion>
      </div>
      <div className="allUsersGrid">
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
