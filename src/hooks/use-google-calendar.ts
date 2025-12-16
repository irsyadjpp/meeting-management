
'use client';
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

// Mock user data
const mockUser = {
    name: 'BCC Admin',
    email: 'admin@bcc.co',
    picture: 'https://picsum.photos/seed/user/100/100',
};

// This is a mock hook to simulate Google Calendar API interaction.
// In a real application, this would use a library like 'gapi-script' or '@react-oauth/google'.
export function useGoogleCalendar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check local storage to maintain "logged in" state across page reloads
    const storedAuth = localStorage.getItem('google-auth-mock');
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(mockUser);
    }
  }, []);

  const login = () => {
    toast({ title: 'Simulating Google Sign-In...' });
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser(mockUser);
      localStorage.setItem('google-auth-mock', 'true');
      toast({
        title: 'Sign-In Successful!',
        description: `Welcome, ${mockUser.name}!`,
      });
    }, 1000);
  };

  const logout = () => {
    toast({ title: 'Simulating Sign-Out...' });
    setTimeout(() => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('google-auth-mock');
      toast({
        title: 'Signed Out',
        description: 'You have been signed out of your Google account.',
      });
    }, 500);
  };
  
  const createEvent = (eventData: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.log("Mock creating event with data:", eventData);
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate
                const mockMeetLink = `https://meet.google.com/abc-defg-hij`;
                console.log("Mock event created, meet link:", mockMeetLink);
                resolve(mockMeetLink);
            } else {
                console.error("Mock API Error: Failed to create event.");
                reject(new Error("Failed to create Google Calendar event."));
            }
        }, 1500);
    });
  };

  return { isAuthenticated, user, login, logout, createEvent };
}
