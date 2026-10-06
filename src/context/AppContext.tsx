import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CampusEvent, Registration, RegistrationInput } from '../types';
import { EVENTS } from '../data/events';

const STORAGE_KEY = 'campus_registrations';

interface AppContextType {
  events: CampusEvent[];
  registrations: Registration[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  seatsLeft: (event: CampusEvent) => number;
  register: (data: RegistrationInput) => Promise<Registration>;
  cancelRegistration: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setError(null);
      // small delay so the loading indicator is visible, like a real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      setRegistrations(saved ? JSON.parse(saved) : []);
      setEvents(EVENTS);
    } catch (e) {
      setError('Could not load events. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const seatsLeft = (event: CampusEvent) => {
    const mine = registrations.filter((r) => r.eventId === event.id).length;
    return Math.max(event.maxParticipants - event.seatsTaken - mine, 0);
  };

  const saveRegistrations = async (list: Registration[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setRegistrations(list);
  };

  const register = async (data: RegistrationInput) => {
    const event = events.find((e) => e.id === data.eventId);
    if (!event) throw new Error('Event not found');
    if (seatsLeft(event) <= 0) throw new Error('Sorry, this event is full.');

    const duplicate = registrations.some(
      (r) => r.eventId === data.eventId && r.rollNumber.toLowerCase() === data.rollNumber.toLowerCase()
    );
    if (duplicate) throw new Error('This roll number is already registered for the event.');

    const newReg: Registration = {
      ...data,
      id: Date.now().toString(),
      registeredOn: new Date().toISOString(),
      status: 'Registered',
    };
    await saveRegistrations([newReg, ...registrations]);
    return newReg;
  };

  const cancelRegistration = async (id: string) => {
    await saveRegistrations(registrations.filter((r) => r.id !== id));
  };

  return (
    <AppContext.Provider
      value={{ events, registrations, loading, error, reload, seatsLeft, register, cancelRegistration }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
