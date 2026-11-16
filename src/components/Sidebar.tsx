import Icon from "./Icon";
import type { IconName } from "./Icon";

type SidebarProps = {
  items: { icon: IconName; label: string }[];
  active: string;
  onSelect: (label: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  onLogout?: () => void;
};

function Sidebar({ items, active, onSelect, collapsed, onToggle, onLogout }: SidebarProps) {
  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"} id="sidebar">
      <div className="sidebar-top">
        <button
          className="nav-item sidebar-toggle"
          aria-expanded={!collapsed}
          aria-controls="sidebar"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggle}
        >
          <Icon name={collapsed ? "expand" : "collapse"} />
          <span className="nav-label">{collapsed ? "Expand sidebar" : "Collapse"}</span>
        </button>
        <nav className="sidebar-nav" aria-label="Main">
          {items.map(({ icon, label }) => (
            <button
              key={label}
              className={label === active ? "nav-item active" : "nav-item"}
              aria-current={label === active ? "page" : undefined}
              title={collapsed ? label : undefined}
              onClick={() => onSelect(label)}
            >
              <Icon name={icon} />
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <button className="nav-item" title={collapsed ? "Log out" : undefined} onClick={onLogout}>
        <Icon name="logout" />
        <span className="nav-label">Log out</span>
      </button>
    </aside>
  );
}

export default Sidebar;
