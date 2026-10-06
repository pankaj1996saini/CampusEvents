import { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export interface CampusEvent {
  id: string;
  name: string;
  description: string;
  date: string; // yyyy-mm-dd
  time: string;
  venue: string;
  category: string;
  maxParticipants: number;
  seatsTaken: number; // seats already booked before the app starts
}

export interface Registration {
  id: string;
  eventId: string;
  studentName: string;
  rollNumber: string;
  email: string;
  mobile: string;
  department: string;
  year: string;
  registeredOn: string; // ISO string
  status: 'Registered';
}

export type RegistrationInput = Omit<Registration, 'id' | 'registeredOn' | 'status'>;

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  MyRegistrations: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  EventDetails: { eventId: string };
  Registration: { eventId: string };
  RegistrationSuccess: { registrationId: string; justRegistered?: boolean };
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type StackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
