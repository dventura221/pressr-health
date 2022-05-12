import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from 'react-rainbow-components'

const ReadingDetail = (props) => {
  let navigate = useNavigate()
  return (
    <div>
      <h1>Reading Detail FILLER</h1>
      <div>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/users')}>Users</Button>
      </div>
    </div>
  )
}

export default ReadingDetail
