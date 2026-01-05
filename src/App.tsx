import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import Loading from './pages/Loading'
import ReportView from './pages/ReportView'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/loading/:eventId" element={<Loading />} />
        <Route path="/report/:eventId" element={<ReportView />} />
      </Routes>
    </Router>
  )
}

export default App
