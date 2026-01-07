import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import ReportView from "./pages/ReportView";
import Login from "./pages/Login";
import Hero from "./components/Hero";

export interface EventType {
  id: number;
  name: string;
  type: string;
  date: string;
  budget: string;
  participants: string;
  feedback?: string;
}

function App() {
  const [events, setEvents] = useState<EventType[]>([]);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Hero />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard showing all upcoming events */}
        <Route
          path="/dashboard"
          element={<Dashboard events={events} setEvents={setEvents} />}
        />

        {/* Create or Update Event */}
        <Route
          path="/create-event"
          element={<CreateEvent events={events} setEvents={setEvents} />}
        />

        {/* View individual event with chat/PDF */}
        <Route
          path="/report/:eventId"
          element={<ReportView events={events} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
