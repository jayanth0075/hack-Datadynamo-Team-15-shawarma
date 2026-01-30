import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ExecutiveSummary from './components/ExecutiveSummary'
import StatsGrid from './components/StatsGrid'
import RiskTrendCard from './components/RiskTrendCard'
import EventTimeline from './components/EventTimeline'

// API base: use Vite dev proxy (relative paths) by default
// You can override with VITE_API_URL if needed for production
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

function App() {
  const [events, setEvents] = useState([])
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch events and summary in parallel
      const [eventsRes, summaryRes] = await Promise.all([
        fetch(`${API_BASE_URL}/events`),
        fetch(`${API_BASE_URL}/summary`)
      ])
      
      if (!eventsRes.ok || !summaryRes.ok) {
        throw new Error('Failed to fetch data from backend')
      }
      
      const eventsData = await eventsRes.json()
      const summaryData = await summaryRes.json()
      
      setEvents(eventsData.events || eventsData || [])
      setSummary(summaryData.summary || summaryData.message || summaryData || '')
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message)
      
      // Use demo data for development/demo purposes
      setEvents(getDemoEvents())
      setSummary(getDemoSummary())
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Calculate stats from events
  const stats = {
    total: events.length,
    hr: events.filter(e => e.source_system?.toLowerCase() === 'hr').length,
    finance: events.filter(e => e.source_system?.toLowerCase() === 'finance').length,
    critical: events.filter(e => 
      e.severity?.toLowerCase() === 'critical' || 
      e.severity?.toLowerCase() === 'high'
    ).length
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Header 
          onRefresh={fetchData} 
          loading={loading} 
          lastUpdated={lastUpdated}
          criticalCount={stats.critical}
        />
        <div className="dashboard">
          <ExecutiveSummary 
            summary={summary} 
            loading={loading} 
          />
          <StatsGrid stats={stats} />
          <RiskTrendCard events={events} />
          <EventTimeline 
            events={events} 
            loading={loading}
            error={error}
          />
        </div>
      </main>
    </div>
  )
}

// Demo data for development/presentation
function getDemoEvents() {
  return [
    {
      id: 1,
      source_system: 'HR',
      event_type: 'Mass Resignation Alert',
      severity: 'critical',
      description: '3 senior warehouse operators submitted resignation notices. Average tenure: 8 years. This could impact Q1 fulfillment capacity by 15%.',
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      id: 2,
      source_system: 'Finance',
      event_type: 'Payment Delay Detected',
      severity: 'high',
      description: 'Invoice #INV-2024-4521 to primary logistics vendor is 12 days overdue. Vendor has flagged account for review. Risk of service interruption.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      id: 3,
      source_system: 'HR',
      event_type: 'Training Compliance Gap',
      severity: 'medium',
      description: '23% of forklift operators have expired certifications. Mandatory recertification deadline: Feb 15, 2026.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    },
    {
      id: 4,
      source_system: 'Finance',
      event_type: 'Budget Variance Alert',
      severity: 'high',
      description: 'Logistics department Q1 budget showing 34% overrun projection. Primary driver: emergency shipping costs up 280%.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
    },
    {
      id: 5,
      source_system: 'HR',
      event_type: 'Overtime Threshold Exceeded',
      severity: 'medium',
      description: 'Shipping team logged 847 overtime hours this week (threshold: 400). Burnout risk and compliance concerns flagged.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
      id: 6,
      source_system: 'Finance',
      event_type: 'Vendor Credit Hold',
      severity: 'critical',
      description: 'Secondary packaging supplier (PkgCo Inc) has placed account on credit hold. Outstanding balance: $127,450. 2-week inventory buffer remaining.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    }
  ]
}

function getDemoSummary() {
  return `⚠️ HIGH RISK ASSESSMENT: Multiple correlated signals indicate elevated operational risk over the next 2-4 weeks.

CRITICAL FINDING: The combination of key staff departures in warehouse operations and vendor payment delays creates a compounding risk to fulfillment capacity. 

IMMEDIATE CONCERNS:
• 3 senior warehouse operators resigning simultaneously will reduce experienced staff by 40% in the Midwest distribution center
• Payment delays to primary logistics vendor may trigger service level downgrades during peak season
• Secondary supplier credit hold leaves only 2 weeks of packaging inventory buffer

RECOMMENDED ACTIONS:
1. Expedite payment to logistics vendor ($45,200 outstanding)
2. Initiate emergency hiring for warehouse positions
3. Negotiate payment plan with packaging supplier to release credit hold

PROJECTED IMPACT: Without intervention, 15-20% reduction in fulfillment capacity likely within 3 weeks.`
}

export default App
