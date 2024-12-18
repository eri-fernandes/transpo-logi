import { NavLink } from 'react-router';

interface NavItemProps {
  to: string;
  label: string;
  onClick?: () => void; // Para suportar a navegação no menu móvel
}

export function NavItem({ to, label, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block hover:underline ${
          isActive ? 'text-white underline' : 'text-gray-300'
        }`
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  );
}
