import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EventType } from "../App";

interface CreateEventProps {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}

const CreateEvent: React.FC<CreateEventProps> = ({ setEvents }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    date: "",
    budget: "",
    participants: "",
    feedback: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (location.state && (location.state as any).event) {
      const event = (location.state as any).event as EventType;
      setEventData({
        name: event.name,
        type: event.type,
        date: event.date,
        budget: event.budget,
        participants: event.participants,
        feedback: event.feedback || "",
      });
      setEditingId(event.id);
    }
  }, [location.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingId ? { id: editingId, ...eventData } : ev
        )
      );
    } else {
      setEvents((prev) => [{ id: Date.now(), ...eventData }, ...prev]);
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 rounded-xl p-8 w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Event" : "Create Event"}
        </h2>
        <input
          name="name"
          placeholder="Event Name"
          value={eventData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2.5 rounded-lg bg-white/10 outline-none"
        />
        <input
          name="type"
          placeholder="Event Type"
          value={eventData.type}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2.5 rounded-lg bg-white/10 outline-none"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2.5 rounded-lg bg-white/10 outline-none"
        />
        <input
          name="budget"
          placeholder="Budget Allocated"
          value={eventData.budget}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2.5 rounded-lg bg-white/10 outline-none"
        />
        <input
          name="participants"
          placeholder="Registered Participants"
          value={eventData.participants}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2.5 rounded-lg bg-white/10 outline-none"
        />
        <textarea
          name="feedback"
          placeholder="Additional Feedback (Optional)"
          value={eventData.feedback}
          onChange={handleChange}
          className="w-full mb-3 p-2.5 rounded-lg bg-white/10 outline-none resize-none"
        />
        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition"
        >
          {editingId ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
