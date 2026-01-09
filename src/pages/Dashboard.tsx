import { useState } from "react";

interface EventNote {
  message: string;
  author: "Admin" | "Organizer";
  time: string;
}

interface EventFile {
  name: string;
}

interface EventType {
  id: number;
  name: string;
  type: string;
  date: string;
  budget: string;
  participants: string;
  feedback?: string;
  notes: EventNote[];
  files: EventFile[];
}

const Dashboard = () => {
  const isAdmin = true;

  const [events, setEvents] = useState<EventType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [noteText, setNoteText] = useState("");

  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    date: "",
    budget: "",
    participants: "",
    feedback: "",
    notes: [] as EventNote[],
    files: [] as EventFile[],
  });

  const today = new Date().toISOString().split("T")[0];

  const upcomingEvents = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).map((f) => ({ name: f.name }));
    setEventData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const addNote = () => {
    if (!noteText.trim()) return;

    const newNote: EventNote = {
      message: noteText,
      author: isAdmin ? "Admin" : "Organizer",
      time: new Date().toLocaleString(),
    };

    setEventData((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));

    setNoteText("");
  };

  const openCreate = () => {
    setEditingEvent(null);
    setEventData({
      name: "",
      type: "",
      date: "",
      budget: "",
      participants: "",
      feedback: "",
      notes: [],
      files: [],
    });
    setShowModal(true);
  };

  const openEdit = (event: EventType) => {
    setEditingEvent(event);
    setEventData(event);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editingEvent.id ? { ...eventData, id: ev.id } : ev))
      );
    } else {
      setEvents((prev) => [
        { ...eventData, id: Date.now() },
        ...prev,
      ]);
    }

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        {isAdmin && (
          <button
            onClick={openCreate}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition"
          >
            + Create Event
          </button>
        )}
      </div>

      {/* Events */}
      {upcomingEvents.length === 0 ? (
        <p className="text-center text-white/60 mt-24">
          No upcoming events
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold text-indigo-400">
                {event.name}
              </h2>
              <p className="text-sm text-white/60">{event.type}</p>

              <div className="mt-3 text-sm text-white/70 space-y-1">
                <p>📅 {event.date}</p>
                <p>💰 ₹{event.budget}</p>
                <p>👥 {event.participants}</p>
              </div>

              {event.files.length > 0 && (
                <div className="mt-3 text-xs text-white/60">
                  📎 Files:
                  <ul className="list-disc list-inside">
                    {event.files.map((f, i) => (
                      <li key={i}>{f.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isAdmin && (
                <button
                  onClick={() => openEdit(event)}
                  className="mt-4 w-full py-2 rounded-lg bg-white/10 hover:bg-indigo-500 transition"
                >
                  Update Event
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-slate-900 rounded-2xl w-full max-w-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">
              {editingEvent ? "Update Event" : "Create Event"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={eventData.name} onChange={handleChange} placeholder="Event Name" className="input" />
              <input name="type" value={eventData.type} onChange={handleChange} placeholder="Event Type" className="input" />
              <input type="date" name="date" value={eventData.date} onChange={handleChange} className="input" />
              <input name="budget" value={eventData.budget} onChange={handleChange} placeholder="Budget" className="input" />
              <input name="participants" value={eventData.participants} onChange={handleChange} placeholder="Participants" className="input" />

              {/* File Upload */}
              <input type="file" multiple onChange={handleFileUpload} className="text-sm" />

              {/* Notes */}
              <div className="bg-white/5 p-3 rounded-lg space-y-2">
                <div className="max-h-32 overflow-y-auto text-xs">
                  {eventData.notes.map((n, i) => (
                    <p key={i}>
                      <strong>{n.author}</strong>: {n.message}
                      <span className="text-white/40"> ({n.time})</span>
                    </p>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 input"
                  />
                  <button type="button" onClick={addNote} className="px-4 bg-indigo-500 rounded-lg">
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setShowModal(false)} type="button" className="px-4 py-2 bg-white/10 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-500 rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          outline: none;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
