import { useNavigate } from "react-router-dom";
import { EventType } from "../App";

interface DashboardProps {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ events, setEvents }) => {
  const navigate = useNavigate();

  // Sort upcoming events by date
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const handleUpdate = (event: EventType) => {
    navigate("/create-event", { state: { event } });
  };

  const handleView = (event: EventType) => {
    navigate(`/report/${event.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <button
          onClick={() => navigate("/create-event")}
          className="px-6 py-2 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 hover:shadow-lg transition"
        >
          + Create Event
        </button>
      </div>

      {/* No events */}
      {upcomingEvents.length === 0 ? (
        <p className="text-center text-white/60 mt-32">
          No upcoming events created yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:bg-white/10 transition"
            >
              {/* Event Info */}
              <h2 className="text-2xl font-semibold mb-1 text-indigo-400">
                {event.name}
              </h2>
              <p className="text-sm text-white/60 mb-3">{event.type}</p>
              <div className="text-sm text-white/70 space-y-1">
                <p>📅 {event.date}</p>
                <p>💰 Budget: ₹{event.budget}</p>
                <p>👥 Participants: {event.participants}</p>
              </div>
              {event.feedback && (
                <p className="mt-3 text-xs text-white/60 border-t border-white/10 pt-2">
                  {event.feedback}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleUpdate(event)}
                  className="w-full py-2 rounded-lg bg-white/10 hover:bg-indigo-500 hover:text-white transition font-medium"
                >
                  Update Event
                </button>
                <button
                  onClick={() => handleView(event)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition font-medium"
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
