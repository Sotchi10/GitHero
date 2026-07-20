import { NavLink } from "react-router-dom";

const DashIconContainer = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    aria-label={label}
    title={label}
    className={({ isActive }) =>
      `inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
        isActive ? "border-blue-500 bg-blue-500/10 text-blue-500" : "border-default bg-surface text-muted hover:bg-surface-raised hover:text-accent"
      }`
    }
  >
    <Icon size={16} aria-hidden="true" />
  </NavLink>
);

export default DashIconContainer;
