import { useState } from 'react'
import {
  LayoutDashboard,
  Activity,
  FileText,
  Users,
  Settings
} from 'lucide-react'

function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const items = [
    { id: 'dashboard', icon: LayoutDashboard, title: 'Dashboard' },
    { id: 'analytics', icon: Activity, title: 'Analytics' },
    { id: 'reports', icon: FileText, title: 'Reports' },
    { id: 'team', icon: Users, title: 'Team' },
    { id: 'settings', icon: Settings, title: 'Settings' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" aria-label="RiskLens logo">
        <div className="logo-mark">
          <span />
          <strong>RL</strong>
          <span />
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {items.map(item => {
          const isActive = activeItem === item.id
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              <button
                type="button"
                className={`nav-icon ${isActive ? 'active' : ''}`}
                title={item.title}
                aria-pressed={isActive}
                onClick={() => setActiveItem(item.id)}
              >
                <Icon size={22} />
              </button>
              <span className="nav-label">{item.title}</span>
            </div>
          )
        })}
      </nav>
      
      <div className="sidebar-footer">
        <div className="sidebar-status" title="System Online"></div>
      </div>
    </aside>
  )
}

export default Sidebar
