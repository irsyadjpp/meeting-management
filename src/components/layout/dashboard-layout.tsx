
'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Settings,
  Video,
  CheckSquare,
  Users,
  Bell,
  LogIn,
  LogOut,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { useGoogleCalendar } from '@/hooks/use-google-calendar';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/meeting', icon: Video, label: 'Meetings' },
  { href: '/team', icon: Users, label: 'Team' },
  { href: '/tasks', icon: CheckSquare, label: 'Tasks' },
];

function Header() {
  const { isAuthenticated, user, login, logout } = useGoogleCalendar();
  return (
    <header className="flex items-center justify-end h-16 px-4 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={isAuthenticated ? user?.picture : "https://picsum.photos/seed/user/100/100"} alt="@user" />
                <AvatarFallback>{isAuthenticated ? user?.name?.charAt(0) : 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{isAuthenticated ? user?.name : "BCC Admin"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {isAuthenticated ? user?.email : 'admin@bcc.co'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            {isAuthenticated ? (
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            ) : (
                <DropdownMenuItem onClick={login}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign in with Google</span>
                </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useGoogleCalendar();

  const rolePrefix = user?.role ? `/${user.role.toLowerCase().replace(' ', '-')}` : '';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const itemPath = rolePrefix + item.href.replace('/dashboard', ''); // dashboard is the root
              if (item.href === '/dashboard') {
                 itemPath = rolePrefix + '/dashboard';
              }
              return(
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === itemPath}
                    tooltip={item.label}
                  >
                  <Link href={itemPath}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )})}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === `${rolePrefix}/settings`}
                tooltip="Settings"
              >
                <Link href={`${rolePrefix}/settings`}>
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
