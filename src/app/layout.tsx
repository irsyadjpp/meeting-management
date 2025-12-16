import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GoogleCalendarProvider } from '@/hooks/use-google-calendar';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export const metadata: Metadata = {
  title: 'BCC Meeting Management',
  description: 'A modern meeting management application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Roboto+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <GoogleCalendarProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
            <Toaster />
        </GoogleCalendarProvider>
      </body>
    </html>
  );
}
