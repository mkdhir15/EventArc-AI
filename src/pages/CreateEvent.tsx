import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FilePath } from 'tailwindcss/types/config'

type FormData = {
  event_name: string
  organizer: string
  event_type: 'Workshop' | 'Hackathon' | 'Seminar' | 'Contest' |''
  event_date: string
  budget_allocated: string
  budget_spent: string
  registered_participants: string
  actual_attendance: string
  actual_attendees: FilePath
  registered_teams: FilePath
  what_went_well: string
  what_went_wrong: string
  challenges_faced: string
  satisfaction_rating: number
  feedback_text: string
}

export default function CreateEvent() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    event_name: '',
    organizer: '',
    event_type: '',
    event_date: '',
    budget_allocated: '',
    budget_spent: '',
    registered_participants: '',
    actual_attendance: '',
    actual_attendees: '',
    registered_teams: '',
    what_went_well: '',
    what_went_wrong: '',
    challenges_faced: '',
    satisfaction_rating: 3,
    feedback_text: '',
  })

  const totalSteps = 4

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.event_name && formData.organizer && formData.event_type && formData.event_date
      case 2:
        return (
          formData.budget_allocated &&
          formData.budget_spent &&
          formData.registered_participants &&
          formData.actual_attendance
        )
      case 3:
        return formData.what_went_well && formData.what_went_wrong && formData.challenges_faced
      case 4:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert({
        event_name: formData.event_name,
        organizer: formData.organizer,
        event_type: formData.event_type,
        event_date: formData.event_date,
        budget_allocated: parseFloat(formData.budget_allocated),
        budget_spent: parseFloat(formData.budget_spent),
        registered_participants: parseInt(formData.registered_participants),
        actual_attendance: parseInt(formData.actual_attendance),
        actual_attendees: formData.actual_attendees,
        registered_teams: formData.registered_teams,
        what_went_well: formData.what_went_well,
        what_went_wrong: formData.what_went_wrong,
        challenges_faced: formData.challenges_faced,
        satisfaction_rating: formData.satisfaction_rating,
        feedback_text: formData.feedback_text,
      })
      .select()
      .single()

    if (eventError) {
      console.error('Error creating event:', eventError)
      return
    }

    navigate(`/loading/${eventData.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Analyze New Event</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Event Details</span>
            <span>Metrics</span>
            <span>Insights</span>
            <span>Satisfaction</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Event Metadata</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={formData.event_name}
                  onChange={(e) => handleChange('event_name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Tech Workshop 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => handleChange('organizer', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Computer Science Club"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  value={formData.event_type}
                  onChange={(e) => handleChange('event_type', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select type</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Contest">Contest</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                <input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => handleChange('event_date', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quantitative Metrics</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Allocated ($)</label>
                  <input
                    type="number"
                    value={formData.budget_allocated}
                    onChange={(e) => handleChange('budget_allocated', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Spent ($)</label>
                  <input
                    type="number"
                    value={formData.budget_spent}
                    onChange={(e) => handleChange('budget_spent', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered Participants</label>
                  <input
                    type="number"
                    value={formData.registered_participants}
                    onChange={(e) => handleChange('registered_participants', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Actual Attendance</label>
                  <input
                    type="number"
                    value={formData.actual_attendance}
                    onChange={(e) => handleChange('actual_attendance', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">List of Attendees</label>
                  <input
                    type="file"
                    value={formData.actual_attendees}
                    onChange={(e) => handleChange('actual_attendees', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none block text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
                    placeholder="0"
                    min="0"
                  />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">List of Teams</label>
                  <input
                    type="file"
                    value={formData.registered_teams}
                    onChange={(e) => handleChange('registered_teams', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none block text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Qualitative Insights</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What went well?</label>
                <textarea
                  value={formData.what_went_well}
                  onChange={(e) => handleChange('what_went_well', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Describe the positive aspects of the event..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What went wrong?</label>
                <textarea
                  value={formData.what_went_wrong}
                  onChange={(e) => handleChange('what_went_wrong', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Describe any issues or problems encountered..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenges faced</label>
                <textarea
                  value={formData.challenges_faced}
                  onChange={(e) => handleChange('challenges_faced', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Describe challenges and obstacles..."
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Satisfaction</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Overall Satisfaction Rating: {formData.satisfaction_rating}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.satisfaction_rating}
                  onChange={(e) => handleChange('satisfaction_rating', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 - Poor</span>
                  <span>2</span>
                  <span>3 - Average</span>
                  <span>4</span>
                  <span>5 - Excellent</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  value={formData.feedback_text}
                  onChange={(e) => handleChange('feedback_text', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Any additional comments or feedback..."
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Generate AI Report
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
