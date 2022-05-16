import React from 'react'
import {
  VerticalNavigation,
  VerticalSection,
  Button
} from 'react-rainbow-components'
import LoginButton from './LogInButton'
import LogoutButton from './LogoutButton'
import { useNavigate } from 'react-router-dom'

const SideNav = () => {
  let navigate = useNavigate()

  return (
    <div className="sideNav">
      <VerticalNavigation>
        <div className="vertSection">
          <VerticalSection>
            <h1 className="navTitle">PressR</h1>
            <LoginButton />
            <LogoutButton />
            <Button onClick={() => navigate('/profile')}>Profile</Button>
            <Button onClick={() => navigate('/home')}>Home</Button>
          </VerticalSection>
        </div>
      </VerticalNavigation>
    </div>
  )
}

export default SideNav
