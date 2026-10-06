import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../theme';
import { formatDate } from '../utils/format';
import { StackScreenProps } from '../types';

export default function EventDetailsScreen({ route, navigation }: StackScreenProps<'EventDetails'>) {
  const { events, seatsLeft } = useApp();
  const c = useTheme();

  const event = events.find((e) => e.id === route.params.eventId);
  if (!event) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <Text style={{ color: c.text }}>Event not found</Text>
      </View>
    );
  }

  const seats = seatsLeft(event);
  const full = seats === 0;

  const rows: [string, string][] = [
    ['Date', formatDate(event.date)],
    ['Time', event.time],
    ['Venue', event.venue],
    ['Category', event.category],
    ['Maximum Participants', String(event.maxParticipants)],
    ['Available Seats', String(seats)],
  ];

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: c.text }]}>{event.name}</Text>
      <Text style={[styles.desc, { color: c.muted }]}>{event.description}</Text>

      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
        {rows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={{ color: c.muted }}>{label}</Text>
            <Text style={{ color: c.text, fontWeight: '600' }}>{value}</Text>
          </View>
        ))}
      </View>

      {full && <Text style={[styles.fullText, { color: c.danger }]}>This event is full. Registration is closed.</Text>}

      <TouchableOpacity
        disabled={full}
        style={[styles.button, { backgroundColor: full ? c.muted : c.primary }]}
        onPress={() => navigation.navigate('Registration', { eventId: event.id })}
      >
        <Text style={styles.buttonText}>{full ? 'Event Full' : 'Register Now'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  desc: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  fullText: { marginTop: 14, fontWeight: '600', textAlign: 'center' },
  button: { marginTop: 20, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
