import { Card } from 'react-rainbow-components'
import { Link } from 'react-router-dom'
import 'boxicons'

const Home = () => {
  return (
    <div>
      <h1>Welcome Home</h1>
      <div>
        <Link to="/users">
          <Card title="All Patients">
            <box-icon type="solid" name="user"></box-icon>
          </Card>
        </Link>
        <Link to="/providers">
          <Card title="All Providers">
            <box-icon name="plus-medical"></box-icon>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Home
