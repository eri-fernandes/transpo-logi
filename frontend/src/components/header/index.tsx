import { useState } from 'react';
import { Truck, Menu, X } from 'lucide-react';
import { NavItem } from '../nav-item';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <Truck size={24} />
            <h1 className="text-xl font-bold">TranspoLogi</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <NavItem to="/dashboard" label="Dashboard" />
              </li>
              <li>
                <NavItem to="/drivers" label="Motoristas" />
              </li>
              <li>
                <NavItem to="/trucks" label="Caminhões" />
              </li>
              <li>
                <NavItem to="/deliveries" label="Entregas" />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Left drawer menu for mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50 w-64 overflow-y-auto bg-primary transition duration-300 ease-in-out md:hidden`}
      >
        <div className="p-6">
          <button onClick={toggleMenu} className="absolute right-4 top-4">
            <X size={24} />
          </button>
          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <NavItem
                  to="/dashboard"
                  label="Dashboard"
                  onClick={toggleMenu}
                />
              </li>
              <li>
                <NavItem
                  to="/drivers"
                  label="Motoristas"
                  onClick={toggleMenu}
                />
              </li>
              <li>
                <NavItem to="/trucks" label="Caminhões" onClick={toggleMenu} />
              </li>
              <li>
                <NavItem
                  to="/deliveries"
                  label="Entregas"
                  onClick={toggleMenu}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
}
