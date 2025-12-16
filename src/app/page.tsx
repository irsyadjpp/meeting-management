'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleCalendar } from '@/hooks/use-google-calendar';
import { LoginScreen } from '@/components/auth/login-screen';

export default function HomePage() {
  const { isAuthenticated, user } = useGoogleCalendar();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role.toLowerCase().replace(' ', '-');
      router.replace(`/${role}/dashboard`);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Render a loading state while redirecting
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading your dashboard...</p>
    </div>
  );
}
