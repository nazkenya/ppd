import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MobileLayout from '@/components/MobileLayout';
import { motion, AnimatePresence } from 'framer-motion';
import AppLogo from '@assets/image_1765787723080.png';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup
    setLocation('/home');
  };

  return (
    <MobileLayout hideNav>
      <div className="flex flex-col h-full px-8 py-12 justify-center space-y-8 bg-background">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-md border border-border/60 overflow-hidden">
            <img src={AppLogo} alt="Fincaff" className="w-full h-full object-contain" />
          </div>
          <p className="text-muted-foreground max-w-sm">
            {isLogin ? 'Selamat datang kembali! Masuk untuk lanjut.' : 'Buat akun untuk menemukan kopi favoritmu.'}
          </p>
        </div>

        <div className="w-full space-y-6">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama lengkap" className="rounded-xl h-12 bg-white/50 border-input" />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@contoh.com" className="rounded-xl h-12 bg-white/50 border-input" />
              </div>

              <div className="space-y-2 relative">
                <div className="flex justify-between">
                  <Label htmlFor="password">Kata sandi</Label>
                  {isLogin && <span className="text-xs text-primary font-medium">Lupa kata sandi?</span>}
                </div>
                <div className="relative">
                    <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Masukkan kata sandi" 
                    className="rounded-xl h-12 bg-white/50 border-input pr-10" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2 relative">
                  <Label htmlFor="confirm-password">Konfirmasi Kata sandi</Label>
                  <div className="relative">
                    <Input 
                      id="confirm-password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Ulangi kata sandi" 
                      className="rounded-xl h-12 bg-white/50 border-input pr-10" 
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-lg rounded-xl mt-4 font-bold shadow-lg hover:shadow-xl transition-all">
                {isLogin ? 'Masuk' : 'Buat Akun'}
              </Button>
            </motion.form>
          </AnimatePresence>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-sm">Atau</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          <div className="space-y-3">
             <Button variant="outline" className="w-full h-12 rounded-xl border-muted-foreground/20 hover:bg-white text-muted-foreground font-medium">
               <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.17s.13-1.51.35-2.17V7.69H2.18C.94 9.47.25 10.66.25 12s.69 2.53 1.93 4.31l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.69l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
               Lanjutkan dengan Google
             </Button>
             <Button variant="outline" className="w-full h-12 rounded-xl border-muted-foreground/20 hover:bg-white text-muted-foreground font-medium">
               <svg className="mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
               </svg>
               Lanjutkan dengan Facebook
             </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{" "}
            <button onClick={toggleMode} className="text-primary font-bold hover:underline">
              {isLogin ? 'Daftar' : 'Masuk'}
            </button>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
