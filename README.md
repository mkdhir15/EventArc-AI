# EventArc AI

An Event Intelligence System that helps college clubs and organizations analyze event success and automatically generate executive-level reports using AI.

## Design Philosophy

- Clean, professional, minimal Google Workspace-style UI
- Neutral color palette with soft blue accents
- Professional typography (Inter font family)
- Calm, data-focused interface
- Desktop-first responsive design

## Features

### Dashboard

- View all analyzed events at a glance
- Success scores and status indicators
- Quick access to event reports
- One-click event creation

### Multi-Step Event Analysis Form

- Step 1: Event Metadata (name, organizer, type, date)
- Step 2: Quantitative Metrics (budget, attendance)
- Step 3: Qualitative Insights (successes, challenges, issues)
- Step 4: Satisfaction Rating (1-5 scale with feedback)
- Progress indicator for clear navigation

### AI-Powered Report Generation

- Automatic success score calculation (0-100%)
- Budget efficiency analysis
- Engagement rate metrics
- Sentiment analysis from qualitative feedback
- Three actionable recommendations
- Professional report layout

### Report View

- Comprehensive intelligence report
- Visual success score presentation
- Key insights organized in cards
- Numbered actionable recommendations
- Event details summary

## Tech Stack

- Google Gemini
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Supabase for database and real-time features

## Database Schema

### Events Table

Stores all event information including metadata, quantitative metrics, and qualitative insights.

### Reports Table

Stores AI-generated intelligence reports with success scores, insights, and recommendations.

## Color Palette

- Primary: Blue (#3b82f6, #2563eb)
- Success: Green (#10b981)
- Warning: Yellow/Orange (#f59e0b, #ea580c)
- Neutral: Gray scale (#f8f9fa, #6b7280, #1f2937)
- Backgrounds: White and light gray

## Typography

- Font Family: Inter
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Clear hierarchy with proper spacing

## Design Principles

1. **Clarity First**: Every element serves a clear purpose
2. **Data-Focused**: Emphasize metrics and insights
3. **Professional**: Suitable for internal admin tools
4. **Trustworthy**: Clean design builds confidence
5. **Calm**: No distracting animations or gamification
6. **Responsive**: Works across all device sizes
