import { Card } from 'react-rainbow-components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Home = () => {
  const StyledCard = styled(Card)`
    width: 240px;
    height: 363px;
  `

  return (
    <div>
      <h1>HOME FILLER</h1>
      <div>
        <StyledCard title="Patient" />
        <StyledCard title="Provider" />
      </div>
      <div>
        <Link to="/users">See All Users</Link>
        <Link to="/providers">See All Providers</Link>
      </div>
    </div>
  )
}

export default Home
