import { useState } from 'react';
import { Truck, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router';

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
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? 'text-white underline' : 'text-gray-300'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trucks"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? 'text-white underline' : 'text-gray-300'
                    }`
                  }
                >
                  Caminhões
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deliveries"
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? 'text-white underline' : 'text-gray-300'
                    }`
                  }
                >
                  Entregas
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Left drawer menu for mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-primary z-50 w-64 overflow-y-auto transition duration-300 ease-in-out md:hidden`}
      >
        <div className="p-6">
          <button onClick={toggleMenu} className="absolute right-4 top-4">
            <X size={24} />
          </button>
          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `hover:bg-primary/80 block py-2 ${
                      isActive ? 'text-white underline' : 'text-gray-300'
                    }`
                  }
                  onClick={toggleMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trucks"
                  className={({ isActive }) =>
                    `hover:bg-primary/80 block py-2 ${
                      isActive ? 'text-white underline' : 'text-gray-300'
                    }`
                  }
                  onClick={toggleMenu}
                >
                  Caminhões
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deliveries"
                  className={({ isActive }) =>
                    `hover:bg-primary/80 block py-2 ${
                      isActive ? 'text-white underline' : 'text-gray-300'
                    }`
                  }
                  onClick={toggleMenu}
                >
                  Entregas
                </NavLink>
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
