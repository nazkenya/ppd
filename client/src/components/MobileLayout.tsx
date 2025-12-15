import React from 'react';
import { useLocation, Link } from 'wouter';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import AppLogo from '@assets/image_1765787723080.png';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function MobileLayout({ children, hideNav = false }: MobileLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: 'Beranda', path: '/home' },
    { icon: Search, label: 'Telusuri', path: '/search' },
    { icon: Heart, label: 'Tersimpan', path: '/favorites' },
    // { icon: ShoppingBag, label: 'Orders', path: '/orders' }, // Future feature
    { icon: User, label: 'Profil', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md bg-background min-h-screen shadow-2xl relative flex flex-col overflow-hidden border border-border/60 rounded-[32px]">
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="logo-mark">
              <img src={AppLogo} alt="Fincaff logo" />
            </div>
            <div>
              <div className="text-lg font-heading font-bold">fincaff</div>
              <div className="text-xs text-muted">Temukan kedai kopi terdekat</div>
            </div>
          </div>
          <div className="text-sm text-muted">Pencari kopi lokal</div>
        </header>

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
