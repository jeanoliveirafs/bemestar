import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark.toString());
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed top-16 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`block w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors ${
                location === item.path ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <i className={`${item.icon} w-5 mr-3`}></i>
              {item.label}
            </button>
          ))}
          
          {/* SOS Button */}
          <button
            onClick={() => handleNavigation('/sos')}
            className="block w-full text-left px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <i className="fas fa-exclamation-triangle w-5 mr-3"></i>
            Modo Crise (SOS)
          </button>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="block w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <i className="fas fa-moon dark:hidden w-5 mr-3"></i>
            <i className="fas fa-sun hidden dark:inline w-5 mr-3"></i>
            <span className="dark:hidden">Modo escuro</span>
            <span className="hidden dark:inline">Modo claro</span>
          </button>
          
          {/* User Info */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
            <div className="flex items-center px-3 py-2">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="block w-full text-left px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <i className="fas fa-sign-out-alt w-5 mr-3"></i>
              Sair do refúgio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
