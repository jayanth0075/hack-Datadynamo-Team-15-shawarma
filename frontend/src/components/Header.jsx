import { Bell, RefreshCw, Settings, ChevronDown } from 'lucide-react'

function Header({ onRefresh, loading, lastUpdated, criticalCount = 0 }) {
  const formatTime = (date) => {
    if (!date) return ''
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">
          <div className="header-logo-sigil" aria-hidden="true">RL</div>
          <div>
            <h1>RiskLens</h1>
            <span className="header-subtitle">Operational macro telemetry</span>
          </div>
        </div>
      </div>
      
      <div className="header-right">
        {lastUpdated && (
          <span className="header-timestamp">
            Updated {formatTime(lastUpdated)}
          </span>
        )}
        <div className="header-actions">
          <button 
            className={`action-btn ${loading ? 'loading' : ''}`}
            onClick={onRefresh}
            disabled={loading}
            title="Refresh Data"
          >
            <RefreshCw size={18} />
          </button>
          
          <button
            className="action-btn"
            type="button"
            title="Settings"
            onClick={() => window.alert('Settings panel is not needed for the demo. All logic runs automatically.')}
          >
            <Settings size={18} />
          </button>
          
          <button
            className="action-btn notification-btn"
            type="button"
            title="Notifications"
            onClick={() => window.alert('Critical and high‑severity signals are already highlighted in the tiles below.')}
          >
            <Bell size={18} />
            {criticalCount > 0 && (
              <span className="notification-badge">{criticalCount}</span>
            )}
          </button>
        </div>
        
        <div className="header-user">
          <div className="user-avatar">JB</div>
          <div className="user-info">
            <span>James Brown</span>
            <small>Operations Lead</small>
          </div>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </header>
  )
}

export default Header
