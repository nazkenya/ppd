import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { User, Settings, LogOut, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Profile() {
  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-heading font-bold">Profile</h1>
        
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 text-4xl font-heading font-bold">
            JD
          </div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-muted-foreground">john.doe@example.com</p>
        </div>

        <div className="space-y-2">
           {[
             { icon: User, label: 'Edit Profile' },
             { icon: Bell, label: 'Notifications' },
             { icon: Shield, label: 'Privacy & Security' },
             { icon: Settings, label: 'Settings' },
           ].map((item, i) => (
             <div key={i} className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl hover:bg-secondary/30 cursor-pointer transition-colors">
               <div className="flex items-center gap-3">
                 <item.icon size={20} className="text-muted-foreground" />
                 <span className="font-medium">{item.label}</span>
               </div>
               <div className="text-muted-foreground">›</div>
             </div>
           ))}
        </div>

        <Button variant="destructive" className="w-full h-12 rounded-xl mt-8">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>
    </MobileLayout>
  );
}
