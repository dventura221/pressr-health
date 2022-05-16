import { Card } from 'react-rainbow-components'
import { Link } from 'react-router-dom'
import 'boxicons'

const Home = () => {
  return (
    <div>
      <h1>Welcome Home</h1>
      <div className="allThings">
        <Link to="/users" style={{ textDecoration: 'none' }}>
          <Card className="allPts">
            <h2>All Patients</h2>
            <box-icon type="solid" name="user"></box-icon>
          </Card>
        </Link>
        <Link to="/providers" style={{ textDecoration: 'none' }}>
          <Card className="allProvs">
            <h2>All Providers</h2>
            <box-icon name="plus-medical"></box-icon>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Home
