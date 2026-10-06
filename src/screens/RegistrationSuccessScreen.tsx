import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { useTheme } from '../theme';
import { formatDate, formatDateTime } from '../utils/format';
import { StackScreenProps } from '../types';

export default function RegistrationSuccessScreen({ route, navigation }: StackScreenProps<'RegistrationSuccess'>) {
  const { registrations, events } = useApp();
  const c = useTheme();
  const { registrationId, justRegistered } = route.params;

  const reg = registrations.find((r) => r.id === registrationId);
  const event = events.find((e) => e.id === reg?.eventId);

  if (!reg || !event) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <Text style={{ color: c.text }}>Registration not found</Text>
      </View>
    );
  }

  const rows: [string, string][] = [
    ['Event', event.name],
    ['Date', formatDate(event.date)],
    ['Time', event.time],
    ['Venue', event.venue],
    ['Student Name', reg.studentName],
    ['Roll Number', reg.rollNumber],
    ['Email', reg.email],
    ['Mobile', reg.mobile],
    ['Department', reg.department],
    ['Year', reg.year],
    ['Registered On', formatDateTime(reg.registeredOn)],
    ['Status', reg.status],
  ];

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={styles.container}>
      {justRegistered && (
        <View style={styles.banner}>
          <Ionicons name="checkmark-circle" size={64} color={c.success} />
          <Text style={[styles.successText, { color: c.success }]}>Registration Successful!</Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
        {rows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={{ color: c.muted, flex: 1 }}>{label}</Text>
            <Text style={{ color: c.text, fontWeight: '600', flex: 1.4, textAlign: 'right' }}>{value}</Text>
          </View>
        ))}
      </View>

      {justRegistered && (
        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: c.primary }]}
            onPress={() => navigation.navigate('Tabs', { screen: 'MyRegistrations' })}
          >
            <Text style={styles.buttonText}>View My Registrations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: c.chip }]}
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          >
            <Text style={[styles.buttonText, { color: c.primary }]}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  banner: { alignItems: 'center', marginVertical: 16 },
  successText: { fontSize: 22, fontWeight: '800', marginTop: 8 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14 },
  row: { flexDirection: 'row', paddingVertical: 7 },
  button: { marginTop: 14, paddingVertical: 13, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
