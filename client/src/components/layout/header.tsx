import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { MobileNav } from './mobile-nav';
import { useLocation } from 'wouter';

export function Header() {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { path: '/mood', label: 'Humor', icon: 'fas fa-smile' },
    { path: '/mindfulness', label: 'Mindfulness', icon: 'fas fa-leaf' },
    { path: '/chat', label: 'Chat', icon: 'fas fa-comments' },
    { path: '/resources', label: 'Recursos', icon: 'fas fa-book' },
  ];

  // Função removida - tema fixo

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-heart text-white text-sm"></i>
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">Refúgio</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium ${
                    location === item.path ? 'text-primary' : ''
                  }`}
                >
                  <i className={`${item.icon} mr-2`}></i>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* SOS Button */}
              <Button
                onClick={() => navigate('/sos')}
                className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-exclamation-triangle mr-2"></i>
                SOS
              </Button>
              
              {/* Botão de alternância de tema removido */}

              {/* User Menu */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.name}
                </span>
                <Button onClick={logout} variant="ghost" size="sm">
                  <i className="fas fa-sign-out-alt"></i>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                className="md:hidden p-2"
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <i className="fas fa-bars"></i>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav 
        isOpen={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)}
        navItems={navItems}
      />
    </>
  );
}
