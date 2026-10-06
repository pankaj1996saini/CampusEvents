# Campus Event Management App

A React Native mobile app where students can browse campus events, register for them, and view their registrations.

## Features

- Event list using `FlatList` with search and category filter
- Event details screen with a Register Now button
- Registration form with validation (required fields, email format, 10-digit mobile number)
- Registration blocked when the event is full or the roll number is already registered
- Registration success screen showing the full registration details
- My Registrations screen with View Details
- Dashboard with Total, Registered, Upcoming and Available event counts
- Navigation with React Navigation (bottom tabs + stack)
- Registrations saved with AsyncStorage, so they survive app restarts
- Pull-to-refresh
- Dark mode (follows the phone's theme)
- Sort events by date
- Cancel registration
- Loading indicators
- Error handling with a Retry button

## Tech Stack

- Expo (React Native) with TypeScript
- React Navigation (native stack + bottom tabs)
- AsyncStorage for local persistence
- `@expo/vector-icons` for icons

## Project Structure

```
CampusEvents/
├── App.tsx
└── src/
    ├── types.tsx
    ├── theme.tsx
    ├── data/events.tsx
    ├── context/AppContext.tsx
    ├── utils/
    │   ├── format.tsx
    │   └── validation.tsx
    ├── components/
    │   ├── EventCard.tsx
    │   ├── StatCard.tsx
    │   └── FormField.tsx
    └── screens/
        ├── HomeScreen.tsx
        ├── DashboardScreen.tsx
        ├── EventDetailsScreen.tsx
        ├── RegistrationFormScreen.tsx
        ├── RegistrationSuccessScreen.tsx
        └── MyRegistrationsScreen.tsx
```

## Prerequisites
- Node.js (LTS version)
- Expo Go app on your phone, or an Android emulator / iOS simulator

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pankaj1996saini/CampusEvents.git
   cd CampusEvents
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start
   ```

4. **Run on Android**
   - Press `a` for Android emulator
   - Or scan QR with Expo Go on your phone

## Validation Rules

| Field | Rule |
|-------|------|
| Student Name | Required, at least 3 characters |
| Roll Number | Required, must be unique per event |
| Email | Required, valid email format |
| Mobile Number | Required, 10 digits starting with 6–9 |
| Department | Required |
| Year | Must select one option |


