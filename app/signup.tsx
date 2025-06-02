import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert('خطأ', 'يرجى تعبئة جميع الحقول');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('خطأ', 'يرجى إدخال بريد إلكتروني صالح');
            return;
        }

        const user = { name, email, password };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        router.replace('/home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>إنشاء حساب</Text>

            <TextInput placeholder="الاسم الكامل" style={styles.input} onChangeText={setName} />
            <TextInput placeholder="البريد الإلكتروني" style={styles.input} onChangeText={setEmail} />
            <TextInput placeholder="كلمة المرور" style={styles.input} secureTextEntry onChangeText={setPassword} />

            <Button title="تسجيل" onPress={handleSignup} />

            <TouchableOpacity onPress={() => router.push('/login')} style={styles.backButton}>
                <Text style={styles.backText}>← الرجوع إلى تسجيل الدخول</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 8 },
    backButton: { marginTop: 16, alignItems: 'center' },
    backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
});
