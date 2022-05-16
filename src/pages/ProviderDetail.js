import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Avatar, Button } from 'react-rainbow-components'
import 'boxicons'
import { BASE_URL } from '../services/api'

const ProviderDetail = () => {
  let navigate = useNavigate()
  let { providerId } = useParams()

  const [provider, setProvider] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getProv = async () => {
      let res = await axios.get(`${BASE_URL}/providers/${providerId}`)
      setProvider(res.data)
    }
    const getUsers = async () => {
      let res = await axios.get(`${BASE_URL}/users/`)
      let users_filtered = res.data.filter(
        (user) => user.provider_id === parseInt(`${providerId}`)
      )
      setUsers(users_filtered)
    }
    getProv()
    getUsers()
  }, [providerId])

  return provider && users ? (
    <div>
      <Button
        onClick={() => navigate('/providers')}
        className="backToAllProvButton"
      >
        Back to All Providers
      </Button>
      <h1>Provider Details</h1>
      <div>
        <Card className="provCard">
          <Avatar src={provider.photo_url} size="large" />
          <h2>
            {provider.last_name}, {provider.first_name},{' '}
            {provider.provider_type}
          </h2>
        </Card>
      </div>
      <div>
        <h2>Patient List</h2>
      </div>
      <div>
        {users.map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            style={{ textDecoration: 'none' }}
          >
            <Card className="ptCard">
              <Avatar src={user.photo_url} size="large" />
              <h2>
                {user.last_name}, {user.first_name}
              </h2>
              <h3>Date of Birth: {user.dob}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  ) : null
}

export default ProviderDetail
