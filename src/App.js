import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AllUsers from './pages/AllUsers'
import UserDetail from './pages/UserDetail'
import ReadingDetail from './pages/ReadingDetail'
import AllProviders from './pages/AllProviders'
import ProviderDetail from './pages/ProviderDetail'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SideNav from './components/SideNav'

function App() {
  //let navigate = useNavigate()
  return (
    <div className="App">
      <SideNav />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/readings/:readingId" element={<ReadingDetail />} />
          <Route path="/providers" element={<AllProviders />} />
          <Route path="/providers/:providerId" element={<ProviderDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
