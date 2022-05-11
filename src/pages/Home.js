import { Card } from 'react-rainbow-components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//import { useState } from 'react'

const Home = () => {
  // const [selected, setSelected] = useState(null)

  // const handleOnChange = (selected) => {
  //   setSelected(selected)
  //   console.log(selected)
  // }

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
      </div>
    </div>
  )
}

export default Home
