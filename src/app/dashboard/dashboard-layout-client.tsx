'use client';

import { useState, useEffect, ReactNode } from 'react';
import {
  BookOpen,
  Zap,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { getInitials } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Prompt Library', href: '/dashboard/prompts', icon: BookOpen },
  { label: 'Workflows', href: '/dashboard/workflows', icon: Zap },
  { label: 'Resources', href: '/dashboard/resources', icon: FileText },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState<{ fullName: string; initials: string }>({
    fullName: '',
    initials: '?',
  });
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      const name = user.user_metadata?.full_name || user.email || '';
      setUserProfile({ fullName: name, initials: getInitials(name) });
    };
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/dashboard/';
    return pathname?.startsWith(href);
  };

  const sidebarOpen = !sidebarCollapsed;

  return (
    <div className="bg-[#0a0a0f] text-[#e8e8f0] min-h-screen flex">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex fixed inset-y-0 left-0 z-40 transition-all duration-300 flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#12121a] border-r border-[#2a2a3d]`}
      >
        <div
          className="h-16 border-b border-[#2a2a3d] flex items-center justify-center px-4 cursor-pointer"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarOpen ? (
            <div className="font-bold text-lg tracking-tight">
              <span className="text-[#6366f1]">AI</span>
              <span className="text-[#e8e8f0]"> Toolkit</span>
              <div className="text-[10px] text-[#8888a0] font-normal">by Salisbury Bookkeeping</div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#6366f1] flex items-center justify-center font-bold text-sm">
              AI
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20'
                      : 'text-[#8888a0] hover:text-[#e8e8f0] hover:bg-[#2a2a3d]'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#2a2a3d] p-3 space-y-2">
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${sidebarOpen ? 'bg-[#1a1a26]' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center font-semibold text-sm flex-shrink-0">
              {userProfile.initials}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{userProfile.fullName || 'Loading...'}</div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8888a0] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all duration-200"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 z-50 bg-[#12121a] border-r border-[#2a2a3d] flex flex-col lg:hidden">
            <div className="h-16 border-b border-[#2a2a3d] flex items-center justify-between px-4">
              <div className="font-bold text-lg tracking-tight">
                <span className="text-[#6366f1]">AI</span>
                <span className="text-[#e8e8f0]"> Toolkit</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-[#2a2a3d] rounded-lg text-[#8888a0]">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20'
                          : 'text-[#8888a0] hover:text-[#e8e8f0] hover:bg-[#2a2a3d]'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-[#2a2a3d] p-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8888a0] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all duration-200"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="h-14 sm:h-16 border-b border-[#2a2a3d] bg-[#12121a] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 hover:bg-[#2a2a3d] rounded-lg text-[#8888a0] hover:text-[#e8e8f0] transition"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold">AI Bookkeeper Toolkit</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#0a0a0f]">
          <div className="p-3 sm:p-4 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
