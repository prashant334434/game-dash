import {
  Bell,
  ChartPie,
  CircleAlert,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Search,
  Settings,
  UserCheck,
  Users,
  UserX,
  X,
} from "lucide-react";

const icons = {
  home: LayoutDashboard,
  chart: ChartPie,
  users: Users,
  settings: Settings,
  search: Search,
  alert: CircleAlert,
  plus: Plus,
  close: X,
  edit: Pencil,
  check: UserCheck,
  pause: UserX,
  logout: LogOut,
  bell: Bell,
  collapse: PanelLeftClose,
  expand: PanelLeftOpen,
};

export type IconName = keyof typeof icons;

type IconProps = { name: IconName; size?: number };

function Icon({ name, size = 18 }: IconProps) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export default Icon;
