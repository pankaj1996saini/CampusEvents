import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  label: string;
  value: number;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function StatCard({ label, value, color, icon }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Ionicons name={icon} size={28} color="#fff" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', borderRadius: 14, padding: 16, marginBottom: 14, minHeight: 120, justifyContent: 'space-between' },
  value: { color: '#fff', fontSize: 32, fontWeight: '800' },
  label: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
