/*
  # EventArc AI Database Schema

  ## Overview
  This migration creates the core database structure for EventArc AI, an event intelligence system
  that helps college clubs analyze event success and generate AI-powered reports.

  ## New Tables

  ### `events`
  Stores all event information including metadata, metrics, and qualitative insights.
  
  Columns:
  - `id` (uuid, primary key) - Unique event identifier
  - `event_name` (text) - Name of the event
  - `organizer` (text) - Name of the organizer
  - `event_type` (text) - Type: Workshop, Hackathon, or Seminar
  - `event_date` (date) - Date when event occurred
  - `budget_allocated` (numeric) - Total budget allocated
  - `budget_spent` (numeric) - Actual amount spent
  - `registered_participants` (integer) - Number of registrations
  - `actual_attendance` (integer) - Number of actual attendees
  - `what_went_well` (text) - Qualitative: positive aspects
  - `what_went_wrong` (text) - Qualitative: issues encountered
  - `challenges_faced` (text) - Qualitative: challenges
  - `satisfaction_rating` (integer) - Rating from 1-5
  - `feedback_text` (text, optional) - Additional feedback
  - `created_at` (timestamptz) - Record creation timestamp

  ### `reports`
  Stores AI-generated intelligence reports for each event.
  
  Columns:
  - `id` (uuid, primary key) - Unique report identifier
  - `event_id` (uuid, foreign key) - References events table
  - `success_score` (integer) - Overall success score (0-100)
  - `status` (text) - Status: "Successful" or "Needs Improvement"
  - `budget_efficiency` (text) - AI insight on budget usage
  - `engagement_rate` (text) - AI insight on engagement
  - `sentiment_summary` (text) - AI sentiment analysis
  - `recommendation_1` (text) - First actionable recommendation
  - `recommendation_2` (text) - Second actionable recommendation
  - `recommendation_3` (text) - Third actionable recommendation
  - `slides_embed_url` (text, optional) - Google Slides embed URL
  - `created_at` (timestamptz) - Report generation timestamp

  ## Security
  
  1. Row Level Security (RLS) is enabled on both tables
  2. All users can read all events and reports (suitable for internal admin tool)
  3. All users can create new events and reports
  4. All users can update and delete (for admin tool flexibility)

  ## Notes
  
  - No authentication required as specified (internal tool)
  - All data is accessible to all users for collaborative work environment
  - Success score calculated based on multiple metrics
  - Reports are automatically linked to events via foreign key
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  organizer text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('Workshop', 'Hackathon', 'Seminar')),
  event_date date NOT NULL,
  budget_allocated numeric(10, 2) NOT NULL DEFAULT 0,
  budget_spent numeric(10, 2) NOT NULL DEFAULT 0,
  registered_participants integer NOT NULL DEFAULT 0,
  actual_attendance integer NOT NULL DEFAULT 0,
  what_went_well text NOT NULL DEFAULT '',
  what_went_wrong text NOT NULL DEFAULT '',
  challenges_faced text NOT NULL DEFAULT '',
  satisfaction_rating integer NOT NULL CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  feedback_text text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  success_score integer NOT NULL CHECK (success_score >= 0 AND success_score <= 100),
  status text NOT NULL CHECK (status IN ('Successful', 'Needs Improvement')),
  budget_efficiency text NOT NULL,
  engagement_rate text NOT NULL,
  sentiment_summary text NOT NULL,
  recommendation_1 text NOT NULL,
  recommendation_2 text NOT NULL,
  recommendation_3 text NOT NULL,
  slides_embed_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies for events table
CREATE POLICY "Allow all to read events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Allow all to insert events"
  ON events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all to update events"
  ON events FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all to delete events"
  ON events FOR DELETE
  USING (true);

-- Policies for reports table
CREATE POLICY "Allow all to read reports"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "Allow all to insert reports"
  ON reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all to update reports"
  ON reports FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all to delete reports"
  ON reports FOR DELETE
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_reports_event_id ON reports(event_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);