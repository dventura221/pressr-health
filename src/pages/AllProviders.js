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

const AllProviders = () => {
  const [providers, setProviders] = useState([])
  const [newProv, setNewProv] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    photo_url: '',
    provider_type: ''
  })
  const [counter, setCounter] = useState(1000)

  useEffect(() => {
    const getProv = async () => {
      let res = await axios.get(`${BASE_URL}/providers/`)
      setProviders(res.data)
    }
    getProv()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios
      .post(`${BASE_URL}/providers/`, newProv)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setNewProv({
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      photo_url: '',
      provider_type: ''
    })
    setCounter(counter + 1)
  }

  const handleChange = (e) => {
    setNewProv({ ...newProv, [e.target.name]: e.target.value })
  }

  const convertValue = (value) => {
    setNewProv({ ...newProv, provider_type: value.value.label })
  }

  return (
    <div>
      <h1>All Providers</h1>
      <div>
        <Accordion>
          <AccordionSection label="Add New Provider">
            <form onSubmit={handleSubmit}>
              <Input
                required
                label="First Name"
                placeholder="First Name"
                type="text"
                name="first_name"
                value={setNewProv.first_name}
                onChange={handleChange}
              />
              <Input
                required
                label="Last Name"
                placeholder="Last Name"
                type="text"
                name="last_name"
                value={setNewProv.last_name}
                onChange={handleChange}
              />
              <Input
                required
                label="Username"
                placeholder="Username"
                type="text"
                name="username"
                value={setNewProv.username}
                onChange={handleChange}
              />
              <Input
                required
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                value={setNewProv.password}
                onChange={handleChange}
              />
              <Input
                required
                label="Photo"
                placeholder="Photo URL Only"
                type="text"
                name="photo_url"
                value={setNewProv.photo_url}
                onChange={handleChange}
              />
              <Picklist
                required
                label="Provider Type"
                placeholder="Choose Provider Type"
                type="text"
                value={newProv.provider_type}
                onChange={(value) => convertValue({ value })}
              >
                <Option name="Physician" label="Physician" />
                <Option name="PA" label="PA" />
                <Option name="NP" label="NP" />
              </Picklist>
              <Button onClick={handleSubmit}>Submit</Button>
            </form>
          </AccordionSection>
        </Accordion>
      </div>
      <div>
        {providers.map((prov) => (
          <Link
            to={`/providers/${prov.id}`}
            key={prov.id}
            style={{ textDecoration: 'none' }}
          >
            <Card className="provCard">
              <Avatar src={prov.photo_url} size="large" />
              <h2>
                {prov.last_name}, {prov.first_name}, {prov.provider_type}
              </h2>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllProviders
