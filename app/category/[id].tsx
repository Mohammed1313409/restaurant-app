import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDishes } from '.././context/DishContext';

interface Dish {
    id: string;
    name: string;
    description: string;
    calories: number;
    rating: number;
}

export default function CategoryScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { getDishes } = useDishes();
    const dishes = getDishes(id as string);

    const renderItem = ({ item }: { item: Dish }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/item/${item.id}`)}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.meta}>🔥 {item.calories} كالوري | ⭐ {item.rating}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dishes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.empty}>لا توجد أطعمة متاحة</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    item: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 8,
        marginBottom: 12,
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    description: { fontSize: 14, color: '#666', marginTop: 4 },
    meta: { fontSize: 12, color: '#999', marginTop: 4 },
    empty: { textAlign: 'center', color: '#999', marginTop: 30, fontSize: 16 },
});
