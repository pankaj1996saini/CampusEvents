import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../theme';
import { formatDate, formatDateTime } from '../utils/format';
import { TabScreenProps } from '../types';

export default function MyRegistrationsScreen({ navigation }: TabScreenProps<'MyRegistrations'>) {
  const { registrations, events, cancelRegistration } = useApp();
  const c = useTheme();

  const confirmCancel = (id: string, eventName: string) => {
    Alert.alert('Cancel registration', `Cancel your registration for ${eventName}?`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelRegistration(id);
          } catch {
            Alert.alert('Error', 'Could not cancel the registration. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <FlatList
        data={registrations}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: c.muted, textAlign: 'center', marginTop: 50 }}>
            You haven't registered for any events yet.
          </Text>
        }
        renderItem={({ item }) => {
          const event = events.find((e) => e.id === item.eventId);
          if (!event) return null;
          return (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
              <View style={styles.topRow}>
                <Text style={[styles.title, { color: c.text }]}>{event.name}</Text>
                <Text style={{ color: c.success, fontWeight: '700' }}>{item.status}</Text>
              </View>
              <Text style={{ color: c.text }}>Date: {formatDate(event.date)}</Text>
              <Text style={{ color: c.text }}>Venue: {event.venue}</Text>
              <Text style={{ color: c.muted, marginTop: 4 }}>Registered on {formatDateTime(item.registeredOn)}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: c.primary }]}
                  onPress={() => navigation.navigate('RegistrationSuccess', { registrationId: item.id })}
                >
                  <Text style={styles.btnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, { borderColor: c.danger, borderWidth: 1 }]}
                  onPress={() => confirmCancel(item.id, event.name)}
                >
                  <Text style={[styles.btnText, { color: c.danger }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  title: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 },
  actions: { flexDirection: 'row', marginTop: 12 },
  btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginRight: 10 },
  btnText: { color: '#fff', fontWeight: '600' },
});
