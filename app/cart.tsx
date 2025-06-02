import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from './context/CartContext';

export default function CartScreen() {
    const { cart, clearCart } = useCart();
    const router = useRouter();

    const getPrice = (itemId: string): number => {
        if (itemId.startsWith('1')) return 30;
        if (itemId.startsWith('2')) return 25;
        if (itemId.startsWith('3')) return 35;
        if (itemId.startsWith('4')) return 15;
        if (itemId.startsWith('5')) return 12;
        if (itemId.startsWith('6')) return 10;
        return 20;
    };

    const getRating = (itemId: string): number => {
        if (itemId.endsWith('1')) return 4.5;
        if (itemId.endsWith('2')) return 4.3;
        if (itemId.endsWith('3')) return 4.7;
        if (itemId.endsWith('4')) return 4.6;
        if (itemId.endsWith('5')) return 4.2;
        return 4.4;
    };

    const total: number = cart.reduce((sum: number, item) => sum + item.quantity * getPrice(item.id), 0);

    const handlePayment = (type: 'كاش' | 'فيزا') => {
        Alert.alert('تم الطلب ✅', `تم اختيار الدفع ${type} بمبلغ ${total}₪`);
        clearCart();
        router.push('/home');
    };

    const renderItem = ({ item }: any) => {
        const price = getPrice(item.id);
        const rating = getRating(item.id);
        return (
            <View style={styles.item}>
                <Text style={styles.name}>🍽️ {item.name}</Text>
                <Text style={styles.details}>⭐ التقييم: {rating} | 💰 السعر: {price}₪</Text>
                <Text style={styles.details}>🔢 الكمية: {item.quantity} | 📦 المجموع: {item.quantity * price}₪</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🛒 سلة الطلبات</Text>

            {cart.length === 0 ? (
                <>
                    <Text style={styles.empty}>لا توجد أصناف مضافة بعد.</Text>
                    <TouchableOpacity onPress={() => router.push('/home')} style={styles.returnBtn}>
                        <Text style={styles.returnText}>🔄 عُد لاختيار الأصناف</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <FlatList data={cart} renderItem={renderItem} keyExtractor={(item) => item.id} />
            )}

            {cart.length > 0 && (
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>💰 المجموع الكلي: {total}₪</Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnCash} onPress={() => handlePayment('كاش')}>
                            <Text style={styles.btnText}>الدفع كاش</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnVisa} onPress={() => handlePayment('فيزا')}>
                            <Text style={styles.btnText}>الدفع بفيزا</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    item: { backgroundColor: '#f5f5f5', padding: 12, marginBottom: 10, borderRadius: 8 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    details: { fontSize: 14, color: '#555', marginTop: 4 },
    empty: { fontSize: 16, textAlign: 'center', marginTop: 40, color: '#888' },
    totalContainer: { marginTop: 20 },
    total: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
    buttons: { flexDirection: 'row', justifyContent: 'space-around' },
    btnCash: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 6, width: '40%', alignItems: 'center' },
    btnVisa: { backgroundColor: '#2196F3', padding: 12, borderRadius: 6, width: '40%', alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' },
    returnBtn: { marginTop: 20, padding: 12, backgroundColor: '#007AFF', borderRadius: 8, alignItems: 'center' },
    returnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
