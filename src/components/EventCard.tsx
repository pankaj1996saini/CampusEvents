import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CampusEvent } from '../types';
import { useTheme } from '../theme';
import { formatDate } from '../utils/format';

interface Props {
  event: CampusEvent;
  seatsLeft: number;
  onPress: () => void;
}

export default function EventCard({ event, seatsLeft, onPress }: Props) {
  const c = useTheme();
  const full = seatsLeft === 0;

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: c.text }]}>{event.name}</Text>
        <View style={[styles.chip, { backgroundColor: c.chip }]}>
          <Text style={{ color: c.primary, fontSize: 12, fontWeight: '600' }}>{event.category}</Text>
        </View>
      </View>

      <Text style={[styles.desc, { color: c.muted }]} numberOfLines={2}>
        {event.description}
      </Text>

      <Text style={[styles.line, { color: c.text }]}>Date: {formatDate(event.date)}</Text>
      <Text style={[styles.line, { color: c.text }]}>Time: {event.time}</Text>
      <Text style={[styles.line, { color: c.text }]}>Venue: {event.venue}</Text>
      <Text style={[styles.line, { color: full ? c.danger : c.success, fontWeight: '600' }]}>
        {full ? 'Event Full' : `Available Seats: ${seatsLeft}`}
      </Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: c.primary }]} onPress={onPress}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 17, fontWeight: '700', flex: 1, marginRight: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  desc: { marginVertical: 8, fontSize: 13 },
  line: { fontSize: 14, marginBottom: 2 },
  button: { marginTop: 10, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
