
'use client';
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useToast } from './use-toast';

// Mock user data
const mockUsers = {
    director: {
        name: 'Irsyad Jamal',
        email: 'irsyad.jamal@bcc.co',
        picture: 'https://i.pravatar.cc/150?u=irsyad',
        role: 'Project Director',
    },
    staff: {
        name: 'Volunteer Staff',
        email: 'volunteer@bcc.co',
        picture: 'https://i.pravatar.cc/150?u=staff',
        role: 'Volunteer',
    },
    google: {
        name: 'BCC Admin',
        email: 'admin@bcc.co',
        picture: 'https://picsum.photos/seed/user/100/100',
        role: 'Admin',
    }
};

type User = {
    name: string;
    email: string;
    picture: string;
    role: string;
} | null;

interface GoogleCalendarContextType {
    isAuthenticated: boolean;
    user: User;
    login: () => void;
    logout: () => void;
    createEvent: (eventData: any) => Promise<{ htmlLink: string; hangoutLink: string; }>;
    loginAsDirector: () => void;
    loginAsStaff: () => void;
}

const GoogleCalendarContext = createContext<GoogleCalendarContextType | undefined>(undefined);

export function GoogleCalendarProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedAuth = localStorage.getItem('bcc-auth-mock');
    if (storedAuth) {
      try {
        const authUser = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUser(authUser);
      } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem('bcc-auth-mock');
      }
    }
  }, []);

  const performLogin = useCallback((user: NonNullable<User>, message: string) => {
    toast({ title: 'Simulating Sign-In...' });
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser(user);
      localStorage.setItem('bcc-auth-mock', JSON.stringify(user));
      toast({
        title: 'Sign-In Successful!',
        description: message,
      });
    }, 1000);
  }, [toast]);

  const login = () => {
    performLogin(mockUsers.google, `Welcome, ${mockUsers.google.name}!`);
  };

  const loginAsDirector = () => {
    performLogin(mockUsers.director, `Logged in as Director: ${mockUsers.director.name}`);
  }

  const loginAsStaff = () => {
      performLogin(mockUsers.staff, `Logged in as Staff Member`);
  }

  const logout = () => {
    toast({ title: 'Simulating Sign-Out...' });
    setTimeout(() => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('bcc-auth-mock');
      toast({
        title: 'Signed Out',
        description: 'You have been signed out.',
      });
    }, 500);
  };
  
  const createEvent = (eventData: any): Promise<{ htmlLink: string; hangoutLink: string; }> => {
    return new Promise((resolve, reject) => {
        console.log("Mock 'POST /calendar/v3/events' with payload:", eventData);
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate
                const mockMeetId = Math.random().toString(36).substring(2, 15);
                const response = {
                    htmlLink: `https://www.google.com/calendar/event?eid=${btoa(mockMeetId)}`,
                    hangoutLink: `https://meet.google.com/${mockMeetId.slice(0,3)}-${mockMeetId.slice(3,7)}-${mockMeetId.slice(7,11)}`,
                };
                console.log("Mock API Success Response:", response);
                resolve(response);
            } else {
                console.error("Mock API Error: Failed to create event.");
                reject(new Error("Failed to create Google Calendar event."));
            }
        }, 1500);
    });
  };

  const value = { isAuthenticated, user, login, logout, createEvent, loginAsDirector, loginAsStaff };

  return (
    <GoogleCalendarContext.Provider value={value}>
      {children}
    </GoogleCalendarContext.Provider>
  );
}

export function useGoogleCalendar() {
    const context = useContext(GoogleCalendarContext);
    if(context === undefined) {
        throw new Error('useGoogleCalendar must be used within a GoogleCalendarProvider');
    }
    return context;
}
