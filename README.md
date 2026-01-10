# EventArc AI

EventArc AI is an AI-powered platform designed to analyze unstructured and scattered event-related data and convert it into clear, structured, and actionable insights.

Organizations often receive event information in inconsistent formats such as PDFs, images, documents, and text notes. Reviewing this data manually is slow, inconsistent, and error-prone. EventArc AI addresses this problem by using a large language model to understand the context across multiple files and generate a consolidated evaluation report.Live Application: https://eventarc-ai.vercel.app/

## WorkFlow

EventArc AI:

Accepts multiple unstructured files related to an event
Understands and correlates information across those files
Identifies key details, gaps, and inconsistencies
Produces a structured, readable analysis report
The system is designed to reduce manual review effort while improving consistency and decision quality.

## Features

## Authentication

Secure login system to control access
Ensures only authorized users can submit and review event data

## Event Dashboard

- Central workspace to manage events
- Create, view, and review multiple event submissions

## Unstructured File Ingestion

- Supports uploading multiple files without strict formatting
- Handles mixed data sources such as:
  - PDFs
  - Images
  - Text documents
  - Notes and forms

## AI-Based Analysis

- Uses Google Gemini to reason over all uploaded content collectively
- Understands context rather than treating files independently
- Extracts meaningful insights from noisy data

## Structured Report Generation

Generated reports typically include:

- Event summary
- Key highlights
- Missing or unclear information
- Potential risks or inconsistencies
- Improvement suggestions

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Google Gemini Ai model
- Node.js for Backend

## AI Integration

EventArc AI uses Google Gemini for:

- Multimodal understanding (text + documents + images)
- Contextual reasoning across multiple inputs
- Natural language summarization and evaluation
- Insight generation rather than simple extraction

## System Flow

User logs into the platform
Creates a new event entry
Uploads all related files (structured or unstructured)
Data is processed by the AI analysis engine
A consolidated report is generated
User reviews the output and takes action

## Design Principles

Simple input, high-quality output
AI-assisted reasoning, not rigid rules
Minimal user effort
Scalable architecture 

## Future Enhancements

- Event scoring and prioritization
- Comparison across multiple events
- Audit history and analytics
- Role-based access control
- Integration with document storage systems
