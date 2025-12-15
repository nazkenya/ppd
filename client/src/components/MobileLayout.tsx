import React from 'react';
import { useLocation, Link } from 'wouter';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function MobileLayout({ children, hideNav = false }: MobileLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Heart, label: 'Saved', path: '/favorites' },
    // { icon: ShoppingBag, label: 'Orders', path: '/orders' }, // Future feature
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center bg-gray-100">
      <div className="w-full max-w-md bg-background min-h-screen shadow-2xl relative flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
          {children}
        </main>

        {!hideNav && (
          <nav className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div className="flex flex-col items-center gap-1 cursor-pointer group">
                    <div className={cn(
                      "p-2 rounded-xl transition-all duration-300",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50"
                    )}>
                      <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-medium text-primary animate-in fade-in slide-in-from-bottom-1 duration-300">
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
