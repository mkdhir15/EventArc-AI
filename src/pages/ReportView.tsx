import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase, Event, Report } from '../lib/supabase'

type EventWithReport = {
  event: Event
  report: Report
}

export default function ReportView() {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [data, setData] = useState<EventWithReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReport()
  }, [])

  const loadReport = async () => {
    if (!eventId) return

    const { data: event } = await supabase.from('events').select('*').eq('id', eventId).single()

    const { data: report } = await supabase.from('reports').select('*').eq('event_id', eventId).single()

    if (event && report) {
      setData({ event, report })
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading report...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Report not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const { event, report } = data

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Event Intelligence Report</h1>
              <p className="text-sm text-gray-600 mt-1">{event.event_name}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div
          className={`bg-gradient-to-br ${
            report.success_score >= 70
              ? 'from-green-50 to-green-100'
              : report.success_score >= 50
              ? 'from-yellow-50 to-yellow-100'
              : 'from-red-50 to-red-100'
          } rounded-lg border ${
            report.success_score >= 70
              ? 'border-green-200'
              : report.success_score >= 50
              ? 'border-yellow-200'
              : 'border-red-200'
          } p-8 mb-6`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Success Score</h2>
              <div className="flex items-baseline">
                <span
                  className={`text-5xl font-bold ${
                    report.success_score >= 70
                      ? 'text-green-700'
                      : report.success_score >= 50
                      ? 'text-yellow-700'
                      : 'text-red-700'
                  }`}
                >
                  {report.success_score}
                </span>
                <span className="text-2xl text-gray-600 ml-1">%</span>
              </div>
            </div>
            <div
              className={`px-4 py-2 rounded-lg font-medium ${
                report.status === 'Successful'
                  ? 'bg-green-600 text-white'
                  : 'bg-orange-600 text-white'
              }`}
            >
              {report.status}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Organizer</div>
              <div className="font-medium text-gray-900">{event.organizer}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Event Type</div>
              <div className="font-medium text-gray-900">{event.event_type}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Date</div>
              <div className="font-medium text-gray-900">
                {new Date(event.event_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Satisfaction</div>
              <div className="font-medium text-gray-900">{event.satisfaction_rating}/5</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Budget Efficiency</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{report.budget_efficiency}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Engagement Rate</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{report.engagement_rate}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Sentiment Summary</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{report.sentiment_summary}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actionable Recommendations</h2>
          <div className="space-y-3">
            {[report.recommendation_1, report.recommendation_2, report.recommendation_3].map((rec, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-5 flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                  {idx + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {report.slides_embed_url && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Presentation Slides</h2>
              <a
                href={report.slides_embed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Open in Google Slides
              </a>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <iframe
                src={report.slides_embed_url}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </main>
    </div>
  )
}
