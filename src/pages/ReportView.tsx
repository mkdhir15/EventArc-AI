import { useParams } from "react-router-dom";
import { useState } from "react";
import { EventType } from "../App";

interface ReportViewProps {
  events: EventType[];
}

interface UploadedFile {
  name: string;
  file: File;
}

const ReportView: React.FC<ReportViewProps> = ({ events }) => {
  const { eventId } = useParams();
  const event = events.find((e) => e.id === Number(eventId));

  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>Event not found</p>
      </div>
    );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setChatMessages((prev) => [...prev, newMessage]);
    setNewMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files).map((file) => ({
      name: file.name,
      file,
    }));

    setUploadedFiles((prev) => [...prev, ...filesArray]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white p-8">
      {/* Event Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
        <p className="text-gray-400 mb-1">Type: {event.type}</p>
        <p className="text-gray-400 mb-1">Date: {event.date}</p>
        <p className="text-gray-400 mb-1">Budget: ₹{event.budget}</p>
        <p className="text-gray-400 mb-1">
          Participants: {event.participants}
        </p>
        {event.feedback && (
          <p className="text-gray-400 mt-2">Feedback: {event.feedback}</p>
        )}
      </div>

      {/* Chat Section */}
      <div className="mb-8 bg-white/5 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Chat / Notes</h2>
        <div className="max-h-64 overflow-y-auto mb-4 space-y-2">
          {chatMessages.length === 0 && (
            <p className="text-gray-400">No messages yet.</p>
          )}
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className="bg-indigo-500/20 p-2 rounded-lg break-words"
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2.5 rounded-lg bg-white/10 outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* PDF Upload Section */}
      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Upload PDFs</h2>
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileUpload}
          className="mb-4"
        />
        {uploadedFiles.length > 0 && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
            <ul className="space-y-1">
              {uploadedFiles.map((file, idx) => (
                <li key={idx} className="bg-white/10 p-2 rounded-lg">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportView;
