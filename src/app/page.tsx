'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleCalendar } from '@/hooks/use-google-calendar';
import { LoginScreen } from '@/components/auth/login-screen';

export default function HomePage() {
  const { isAuthenticated, isAuthLoading, user, login, loginAsDirector, loginAsStaff } = useGoogleCalendar();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && user) {
      // Normalize role to create a path, e.g., "Project Director" -> "project-director"
      const rolePath = user.role.toLowerCase().replace(/\s+/g, '-');
      router.replace(`/${rolePath}/dashboard`);
    }
  }, [isAuthenticated, isAuthLoading, user, router]);

  // Show a loading screen while authentication status is being determined
  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <p>Authenticating...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <LoginScreen onGoogleLogin={login} onLoginAsDirector={loginAsDirector} onLoginAsStaff={loginAsStaff} />;
  }

  // This will be shown briefly while redirecting after login
  return (
    <div className="flex h-screen items-center justify-center bg-background text-foreground">
      <p>Loading your dashboard...</p>
    </div>
  );
}

    