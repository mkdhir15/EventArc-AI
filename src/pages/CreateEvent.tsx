import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    type: "",
    participants: 0,
    budget: 0,
    feedback: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: name === "participants" || name === "budget"
        ? Number(value)
        : value,
    });
  };

  const isValid =
    eventData.name &&
    eventData.date &&
    eventData.type &&
    eventData.participants > 0 &&
    eventData.budget > 0 &&
    eventData.feedback.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h2 className="text-2xl text-indigo-400 mb-6">Create Event</h2>

      <div className="space-y-4 max-w-xl">
        <input name="name" placeholder="Event Name" onChange={handleChange} className="w-full p-3 bg-black/40 rounded" />
        <input type="date" name="date" onChange={handleChange} className="w-full p-3 bg-black/40 rounded" />
        <input name="type" placeholder="Event Type" onChange={handleChange} className="w-full p-3 bg-black/40 rounded" />
        <input type="number" name="participants" placeholder="Participants" onChange={handleChange} className="w-full p-3 bg-black/40 rounded" />
        <input type="number" name="budget" placeholder="Budget" onChange={handleChange} className="w-full p-3 bg-black/40 rounded" />
        <textarea name="feedback" placeholder="Event Description / Feedback" onChange={handleChange} className="w-full p-3 bg-black/40 rounded" />

        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-500 rounded disabled:bg-gray-600"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
