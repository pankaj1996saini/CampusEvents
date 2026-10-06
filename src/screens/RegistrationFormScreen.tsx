import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView,
  Platform, Alert, ActivityIndicator, StyleSheet,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../theme';
import FormField from '../components/FormField';
import { validateForm, FormErrors } from '../utils/validation';
import { StackScreenProps } from '../types';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function RegistrationFormScreen({ route, navigation }: StackScreenProps<'Registration'>) {
  const { events, seatsLeft, register } = useApp();
  const c = useTheme();
  const event = events.find((e) => e.id === route.params.eventId);

  const [form, setForm] = useState({
    studentName: '',
    rollNumber: '',
    email: '',
    mobile: '',
    department: '',
    year: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const setField = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
    // clear the error for this field as soon as the user edits it
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const handleSubmit = async () => {
    if (seatsLeft(event) <= 0) {
      Alert.alert('Event Full', 'Sorry, there are no seats left for this event.');
      return;
    }

    const found = validateForm(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      setSubmitting(true);
      const reg = await register({
        ...form,
        studentName: form.studentName.trim(),
        rollNumber: form.rollNumber.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        department: form.department.trim(),
        eventId: event.id,
      });
      navigation.replace('RegistrationSuccess', { registrationId: reg.id, justRegistered: true });
    } catch (e: any) {
      Alert.alert('Registration failed', e.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={{ backgroundColor: c.background }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.heading, { color: c.text }]}>{event.name}</Text>

        <FormField
          label="Student Name"
          value={form.studentName}
          onChangeText={(t) => setField('studentName', t)}
          error={errors.studentName}
          placeholder="Enter your full name"
        />
        <FormField
          label="Roll Number"
          value={form.rollNumber}
          onChangeText={(t) => setField('rollNumber', t)}
          error={errors.rollNumber}
          autoCapitalize="characters"
          placeholder="e.g. 21CS045"
        />
        <FormField
          label="Email"
          value={form.email}
          onChangeText={(t) => setField('email', t)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@college.edu"
        />
        <FormField
          label="Mobile Number"
          value={form.mobile}
          onChangeText={(t) => setField('mobile', t.replace(/[^0-9]/g, ''))}
          error={errors.mobile}
          keyboardType="number-pad"
          maxLength={10}
          placeholder="10-digit mobile number"
        />
        <FormField
          label="Department"
          value={form.department}
          onChangeText={(t) => setField('department', t)}
          error={errors.department}
          placeholder="e.g. Computer Science"
        />

        <Text style={[styles.label, { color: c.text }]}>Year</Text>
        <View style={styles.yearRow}>
          {YEARS.map((y) => {
            const active = form.year === y;
            return (
              <TouchableOpacity
                key={y}
                onPress={() => setField('year', y)}
                style={[styles.yearChip, { backgroundColor: active ? c.primary : c.chip }]}
              >
                <Text style={{ color: active ? '#fff' : c.primary, fontWeight: '600' }}>{y}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!!errors.year && <Text style={{ color: c.danger, fontSize: 12 }}>{errors.year}</Text>}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: c.primary, opacity: submitting ? 0.7 : 1 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Registration</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  yearRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  yearChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  button: { marginTop: 20, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
