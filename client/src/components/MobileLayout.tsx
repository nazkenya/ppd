import React from 'react';
import { useLocation, Link } from 'wouter';
import { Home, Search, Heart, User } from 'lucide-react';
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,hsl(var(--secondary)/0.6),transparent_35%),radial-gradient(circle_at_85%_10%,hsl(var(--accent)/0.4),transparent_30%),hsl(var(--background))] flex justify-center px-3 py-4">
      <div className="w-full max-w-md bg-background/95 backdrop-blur-xl min-h-[92vh] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] relative flex flex-col overflow-hidden border border-border/70 rounded-3xl">
        <header className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="logo-mark">
              <img src={AppLogo} alt="Fincaff logo" />
            </div>
            <div>
              <div className="text-lg font-heading font-bold tracking-tight">fincaff</div>
              <div className="text-xs text-muted leading-tight">Temukan kedai kopi terdekat</div>
            </div>
          </div>
          <div>
            <Link href="/profile">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-primary/20 cursor-pointer">
                  <User className="text-primary" />
                </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar pb-20 px-4 pt-2">
          {children}
        </main>

        {!hideNav && (
          <nav className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div className="flex flex-col items-center gap-1 cursor-pointer group">
                    <div className={cn(
                      "p-2.5 rounded-2xl transition-all duration-300",
                      isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground hover:bg-secondary/60"
                    )}>
                      <item.icon size={22} strokeWidth={isActive ? 2.6 : 2} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-semibold tracking-tight transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}>
                      {item.label}
                    </span>
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
