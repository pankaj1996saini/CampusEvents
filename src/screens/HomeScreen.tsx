import React, { useMemo, useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ScrollView,
  ActivityIndicator, RefreshControl, StyleSheet,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../theme';
import { CATEGORIES } from '../data/events';
import EventCard from '../components/EventCard';
import { TabScreenProps } from '../types';

export default function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const { events, loading, error, reload, seatsLeft } = useApp();
  const c = useTheme();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortByDate, setSortByDate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const visibleEvents = useMemo(() => {
    let list = events.filter((e) => {
      const matchesSearch = e.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === 'All' || e.category === category;
      return matchesSearch && matchesCategory;
    });
    if (sortByDate) {
      list = [...list].sort((a, b) => a.date.localeCompare(b.date));
    }
    return list;
  }, [events, search, category, sortByDate]);

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
        <Text style={{ color: c.muted, marginTop: 10 }}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <Text style={{ color: c.danger, marginBottom: 12 }}>{error}</Text>
        <TouchableOpacity style={[styles.retry, { backgroundColor: c.primary }]} onPress={reload}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <TextInput
        style={[styles.search, { backgroundColor: c.card, color: c.text, borderColor: c.border }]}
        placeholder="Search events..."
        placeholderTextColor={c.muted}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          {['All', ...CATEGORIES].map((cat) => {
            const active = cat === category;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.chip, { backgroundColor: active ? c.primary : c.chip }]}
              >
                <Text style={{ color: active ? '#fff' : c.primary, fontWeight: '600' }}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity onPress={() => setSortByDate(!sortByDate)} style={styles.sortBtn}>
          <Text style={{ color: c.primary, fontWeight: '600' }}>{sortByDate ? 'Sorted ✓' : 'Sort by date'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visibleEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            seatsLeft={seatsLeft(item)}
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <Text style={{ color: c.muted, textAlign: 'center', marginTop: 40 }}>No events found</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  search: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15, marginBottom: 10 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16, marginRight: 8 },
  sortBtn: { paddingLeft: 8 },
  retry: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
});
