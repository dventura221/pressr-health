import axios from 'axios'
import { useState, useEffect } from 'react'
import { Avatar, Card, Button } from 'react-rainbow-components'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/api'

const AllProviders = () => {
  let navigate = useNavigate()
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const getProv = async () => {
      let res = await axios.get(`${BASE_URL}/providers/`)
      setProviders(res.data)
    }
    getProv()
  }, [])

  return (
    <div>
      <h1>All Providers</h1>
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
