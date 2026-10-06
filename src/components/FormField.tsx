import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormField({ label, error, ...inputProps }: Props) {
  const c = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: c.text }]}>{label}</Text>
      <TextInput
        placeholderTextColor={c.muted}
        style={[
          styles.input,
          { backgroundColor: c.card, color: c.text, borderColor: error ? c.danger : c.border },
        ]}
        {...inputProps}
      />
      {!!error && <Text style={[styles.error, { color: c.danger }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  error: { fontSize: 12, marginTop: 4 },
});
