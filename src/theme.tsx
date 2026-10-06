import { useColorScheme } from 'react-native';

const light = {
  primary: '#3949ab',
  background: '#f2f4f8',
  card: '#ffffff',
  text: '#1c1f2a',
  muted: '#6b7280',
  border: '#dfe3ea',
  danger: '#d32f2f',
  success: '#2e7d32',
  chip: '#e8eaf6',
};

const dark: typeof light = {
  primary: '#5c6bc0',
  background: '#12141a',
  card: '#1d2029',
  text: '#f1f2f6',
  muted: '#9aa0ad',
  border: '#2c303b',
  danger: '#ef5350',
  success: '#66bb6a',
  chip: '#2a2f45',
};

// Picks colours based on the phone's light/dark setting
export function useTheme() {
  return useColorScheme() === 'dark' ? dark : light;
}
