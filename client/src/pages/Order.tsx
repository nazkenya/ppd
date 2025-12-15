import React from 'react';
import { ArrowLeft, MapPin, CreditCard, ChevronRight, Phone } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { cafes } from '@/lib/mockData';

export default function Order() {
  const [, setLocation] = useLocation();
  const cafe = cafes[0]; // Mock ordering from first cafe
  const menuItem = cafe.menu[0]; // Mock item

  return (
    <div className="bg-background min-h-screen pb-24 flex flex-col">
      <div className="p-6 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation(`/cafe/${cafe.id}`)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-bold font-heading">Order Confirmation</h1>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        {/* Toggle Delivery/Pickup */}
        <div className="bg-muted p-1 rounded-xl flex">
          <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-sm">Deliver</button>
          <button className="flex-1 py-2 rounded-lg text-muted-foreground font-medium text-sm">Pick Up</button>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm">Delivery Address</h3>
          <div className="p-4 border border-border rounded-2xl bg-white">
             <div className="font-bold text-sm mb-1">Home</div>
             <p className="text-xs text-muted-foreground mb-3">Jl. Kpg Sutoyo No. 620, Bilzen, Tanjungbalai</p>
             <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg">Edit Address</Button>
               <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg">Add Note</Button>
             </div>
          </div>
        </div>

        {/* Item */}
        <div className="flex items-center gap-4 py-4 border-b border-border">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
             {menuItem.image && <img src={menuItem.image} className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1">
             <div className="font-bold text-sm">{menuItem.name}</div>
             <div className="text-xs text-muted-foreground">Deep Foam</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6 rounded border border-border flex items-center justify-center">-</button>
            <span className="font-bold text-sm">1</span>
            <button className="w-6 h-6 rounded border border-border flex items-center justify-center bg-primary text-white border-primary">+</button>
          </div>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center p-4 border border-border rounded-xl bg-white">
           <div className="flex items-center gap-2 text-sm font-medium text-accent">
             <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-[10px]">%</span>
             1 Discount is Applied
           </div>
           <ChevronRight size={16} className="text-muted-foreground" />
        </div>

        {/* Payment Summary */}
        <div className="space-y-2 pt-2">
          <h3 className="font-bold text-sm">Payment Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">Rp {menuItem.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium">Rp 12.000</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-dashed border-border mt-2">
            <span className="font-bold">Total Payment</span>
            <span className="font-bold text-primary">Rp {(menuItem.price + 12000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="p-6 bg-white border-t border-border mt-auto">
         <div className="flex justify-between items-center mb-4 p-3 bg-muted/50 rounded-xl cursor-pointer">
            <div className="flex items-center gap-3">
               <CreditCard className="text-primary" size={20} />
               <div className="flex flex-col">
                  <span className="text-xs font-bold">Cash/Wallet</span>
                  <span className="text-[10px] text-primary font-bold">Rp 55.000</span>
               </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
         </div>
         <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg">Order</Button>
      </div>
    </div>
  );
}
