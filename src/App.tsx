import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlassCard from "./components/GlassCard";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import ReportView from "./pages/ReportView";
import UpcomingEvents from "./pages/UpcomingEvents";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlassCard />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/reports" element={<ReportView />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
