import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '.././context/CartContext';

export default function ItemDetailsScreen() {
    const { itemId } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const item = {
        id: itemId as string,
        name: 'اسم الصنف ',
        description: 'هذا وصف تفصيلي للصنف ومكوناته الغذائية',
        calories: 320,
        rating: 4.6,
        comments: [
            { user: 'أحمد', text: 'لذيذ جدًا!' },
            { user: 'سارة', text: 'أنصح بتجربته 👍' },
        ],
    };

    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (!comment.trim()) return;
        item.comments.push({ user: 'أنت', text: comment });
        setComment('');
        Alert.alert('تم إضافة تعليقك ✅');
    };

    const handleAddToCart = () => {
        addToCart({ id: item.id, name: item.name, quantity: 1 });
        Alert.alert(
            '✅ تمت الإضافة',
            'هل تريد إضافة منتج آخر؟',
            [
                { text: 'نعم', onPress: () => router.push('/home') },
                { text: 'لا، انتقل إلى السلة', onPress: () => router.push('/cart') },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right']}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.meta}>🔥 {item.calories} كالوري | ⭐ {item.rating}</Text>

                <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
                    <Text style={styles.cartText}>أضف للسلة 🛒</Text>
                </TouchableOpacity>

                <Text style={styles.commentsTitle}>💬 التعليقات:</Text>
                {item.comments.map((c, i) => (
                    <Text key={i} style={styles.comment}>• {c.user}: {c.text}</Text>
                ))}

                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    placeholder="اكتب تعليقك..."
                    style={styles.input}
                />
                <TouchableOpacity style={styles.addBtn} onPress={handleAddComment}>
                    <Text style={styles.addText}>إضافة تعليق</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    desc: { fontSize: 16, marginBottom: 8 },
    meta: { fontSize: 14, color: '#666', marginBottom: 12 },
    cartBtn: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
    cartText: { color: '#fff', fontWeight: 'bold' },
    commentsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    comment: { fontSize: 14, marginBottom: 4 },
    input: { borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 10, marginBottom: 6 },
    addBtn: { backgroundColor: '#28a745', padding: 10, borderRadius: 6, alignItems: 'center' },
    addText: { color: '#fff', fontWeight: '600' },
});
