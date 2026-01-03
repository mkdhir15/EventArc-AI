import { createClient } from '@supabase/supabase-js'

/**
 * 1. Environment Variable Validation
 * We extract these and ensure they exist before initializing the client.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase Environment Variables. Check if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  )
}

/**
 * 2. Supabase Client Instance
 * We export this as a singleton to use throughout the app.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * 3. Type Definitions
 */

export type EventType = 'Workshop' | 'Hackathon' | 'Seminar'

export interface Event {
  id: string
  event_name: string
  organizer: string
  event_type: EventType
  event_date: string
  budget_allocated: number
  budget_spent: number
  registered_participants: number
  actual_attendance: number
  what_went_well: string
  what_went_wrong: string
  challenges_faced: string
  satisfaction_rating: number
  feedback_text: string
  created_at: string
}

export interface Report {
  id: string
  event_id: string
  success_score: number
  status: 'Successful' | 'Needs Improvement'
  budget_efficiency: string
  engagement_rate: string
  sentiment_summary: string
  recommendation_1: string
  recommendation_2: string
  recommendation_3: string
  slides_embed_url: string
  created_at: string
}

// Represents a join query where an event includes its related reports
export type EventWithReport = Event & {
  reports: Report[]
}