import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, EventWithReport } from '../lib/supabase'

export default function Dashboard() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventWithReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        reports (*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading events:', error)
    } else {
      setEvents(data as EventWithReport[])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">EventArc AI</h1>
              <p className="text-sm text-gray-600 mt-1">Turning event data into actionable intelligence</p>
            </div>
            <button
              onClick={() => navigate('/create-event')}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Analyze New Event
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading events...</div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">Get started by analyzing your first event</p>
            <button
              onClick={() => navigate('/create-event')}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze New Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => {
              const report = event.reports?.[0]
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{event.event_name}</h3>
                    {report && (
                      <span
                        className={`flex-shrink-0 ml-2 inline-flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold ${
                          report.success_score >= 70
                            ? 'bg-green-50 text-green-700'
                            : report.success_score >= 50
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {report.success_score}%
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {event.event_type}
                    </div>
                  </div>

                  {report && (
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                          report.status === 'Successful'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-orange-50 text-orange-700 border border-orange-200'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => navigate(report ? `/report/${event.id}` : '/create-event')}
                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm border border-gray-200"
                  >
                    {report ? 'View Report' : 'Generate Report'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
