import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { initialDishes } from './Constants/initialDishes';
import { useDishes } from './context/DishContext';

const categories = [
    { id: '1', name: 'مأكولات بحرية' },
    { id: '2', name: 'ساندويشات' },
    { id: '3', name: 'أطباق رئيسية' },
    { id: '4', name: 'شوربات' },
    { id: '5', name: 'مقبلات' },
    { id: '6', name: 'مشروبات' },
];

export default function HomeScreen() {
    const router = useRouter();
    const { getDishes, saveDishes } = useDishes();

    useEffect(() => {
        Object.entries(initialDishes).forEach(([categoryId, dishes]) => {
            if (getDishes(categoryId).length === 0) {
                saveDishes(categoryId, dishes);
            }
        });
    }, []);

    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`./category/${item.id}`)}
        >
            <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🍽️ مرحبًا بك في مطعمنا</Text>
            <Text style={styles.subtext}>اختر قسم الطعام:</Text>

            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <TouchableOpacity onPress={() => router.replace('/login')}>
                <Text style={styles.logoutText}>🔙 تسجيل الخروج</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
        color: '#666',
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
});
