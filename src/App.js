import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AllUsers from './pages/AllUsers'
import UserDetail from './pages/UserDetail'
import ReadingDetail from './pages/ReadingDetail'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Header Filler</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/readings/:readingId" element={<ReadingDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
