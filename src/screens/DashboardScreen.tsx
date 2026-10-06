import React from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../theme';
import StatCard from '../components/StatCard';
import { isUpcoming } from '../utils/format';

export default function DashboardScreen() {
  const { events, registrations, loading, seatsLeft } = useApp();
  const c = useTheme();

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    );
  }

  const totalEvents = events.length;
  // one student may register once per event, so count distinct events
  const registeredEvents = new Set(registrations.map((r) => r.eventId)).size;
  const upcomingEvents = events.filter((e) => isUpcoming(e.date)).length;
  const availableEvents = events.filter((e) => seatsLeft(e) > 0).length;

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.heading, { color: c.text }]}>Overview</Text>
      <View style={styles.grid}>
        <StatCard label="Total Events" value={totalEvents} color="#3949ab" icon="calendar" />
        <StatCard label="Registered Events" value={registeredEvents} color="#2e7d32" icon="checkmark-circle" />
        <StatCard label="Upcoming Events" value={upcomingEvents} color="#ef6c00" icon="time" />
        <StatCard label="Available Events" value={availableEvents} color="#00838f" icon="people" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
