import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Loading() {
  const navigate = useNavigate()
  const { eventId } = useParams()

  useEffect(() => {
    generateReport()
  }, [])

  const generateReport = async () => {
    if (!eventId) return

    const { data: event } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (!event) return

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const attendanceRate = (event.actual_attendance / event.registered_participants) * 100
    const budgetEfficiencyRate = ((event.budget_allocated - event.budget_spent) / event.budget_allocated) * 100

    let successScore = 0
    successScore += Math.min(attendanceRate, 100) * 0.4
    successScore += Math.min(budgetEfficiencyRate + 50, 100) * 0.3
    successScore += event.satisfaction_rating * 20 * 0.3

    successScore = Math.round(successScore)

    const status = successScore >= 70 ? 'Successful' : 'Needs Improvement'

    const budgetEfficiency =
      budgetEfficiencyRate >= 0
        ? `Budget was managed efficiently with ${budgetEfficiencyRate.toFixed(1)}% of allocated funds remaining. This demonstrates strong financial planning.`
        : `Budget exceeded allocation by ${Math.abs(budgetEfficiencyRate).toFixed(1)}%. Future events should plan for additional contingency funds.`

    const engagementRate = `${attendanceRate.toFixed(1)}% of registered participants attended the event. ${
      attendanceRate >= 80
        ? 'This indicates strong engagement and interest.'
        : attendanceRate >= 60
        ? 'This is acceptable but could be improved with better reminders and incentives.'
        : 'This suggests significant drop-off and requires investigation.'
    }`

    const sentimentKeywords = [
      ...event.what_went_well.toLowerCase().split(' '),
      ...event.what_went_wrong.toLowerCase().split(' '),
    ]
    const positiveWords = ['great', 'excellent', 'good', 'amazing', 'successful', 'engaging']
    const negativeWords = ['poor', 'bad', 'lacking', 'insufficient', 'failed', 'disappointed']

    const positiveCount = sentimentKeywords.filter((w) => positiveWords.includes(w)).length
    const negativeCount = sentimentKeywords.filter((w) => negativeWords.includes(w)).length

    let sentiment = 'neutral'
    if (positiveCount > negativeCount) sentiment = 'positive'
    else if (negativeCount > positiveCount) sentiment = 'negative'

    const sentimentSummary = `Based on qualitative feedback, the overall sentiment is ${sentiment}. ${
      sentiment === 'positive'
        ? 'Participants expressed satisfaction with the event execution.'
        : sentiment === 'negative'
        ? 'There are significant concerns that need to be addressed in future events.'
        : 'Feedback shows mixed reactions with both strengths and areas for improvement.'
    }`

    const recommendations = []

    if (attendanceRate < 70) {
      recommendations.push(
        'Improve attendance by sending reminder emails 24 hours before the event and implementing a check-in incentive system.'
      )
    }

    if (budgetEfficiencyRate < 0) {
      recommendations.push(
        'Establish a more detailed budget breakdown and allocate 15-20% contingency funds for unforeseen expenses.'
      )
    }

    if (event.satisfaction_rating < 4) {
      recommendations.push(
        'Conduct post-event surveys to identify specific pain points and areas for improvement in content and logistics.'
      )
    }

    if (recommendations.length < 3) {
      recommendations.push('Continue building on successful aspects while experimenting with new engagement strategies.')
    }

    if (recommendations.length < 3) {
      recommendations.push(
        'Document lessons learned and create a playbook for organizing similar events in the future.'
      )
    }

    await supabase.from('reports').insert({
      event_id: eventId,
      success_score: successScore,
      status,
      budget_efficiency: budgetEfficiency,
      engagement_rate: engagementRate,
      sentiment_summary: sentimentSummary,
      recommendation_1: recommendations[0] || 'Continue monitoring event metrics for continuous improvement.',
      recommendation_2: recommendations[1] || 'Engage with participants for direct feedback and testimonials.',
      recommendation_3: recommendations[2] || 'Share successful strategies with other organizers in your network.',
      slides_embed_url: '',
    })

    navigate(`/report/${eventId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <svg
            className="animate-spin h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing event data and generating insights...</h2>
        <p className="text-gray-600">This will only take a moment</p>
      </div>
    </div>
  )
}
