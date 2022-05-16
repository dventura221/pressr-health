import React from 'react'
import {
  VerticalNavigation,
  VerticalSection,
  Button
} from 'react-rainbow-components'
import LogoutButton from './LogoutButton'
import { useNavigate } from 'react-router-dom'

const SideNav = () => {
  let navigate = useNavigate()

  return (
    <div className="sideNav">
      <VerticalNavigation>
        <div>
          <VerticalSection className="vertSection">
            <h1 className="navTitle">PressR</h1>
            <Button onClick={() => navigate('/')} className="navObj">
              Start
            </Button>
            <LogoutButton className="navObj" />
            <Button onClick={() => navigate('/profile')} className="navObj">
              Profile
            </Button>
            <Button onClick={() => navigate('/home')} className="navObj">
              Home
            </Button>
          </VerticalSection>
        </div>
      </VerticalNavigation>
    </div>
  )
}

export default SideNav
