import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('خطأ', 'يرجى إدخال البريد وكلمة المرور');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('خطأ', 'البريد الإلكتروني غير صالح');
            return;
        }

        const storedUser = await AsyncStorage.getItem('user');
        if (!storedUser) {
            Alert.alert('خطأ', 'لا يوجد حساب مسجل، يرجى إنشاء حساب أولاً');
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
            router.replace('/home');
        } else {
            Alert.alert('خطأ', 'البريد أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>تسجيل الدخول</Text>

            <TextInput placeholder="البريد الإلكتروني" style={styles.input} onChangeText={setEmail} />
            <TextInput placeholder="كلمة المرور" style={styles.input} secureTextEntry onChangeText={setPassword} />

            <Button title="دخول" onPress={handleLogin} />

            <Text style={styles.registerText}>
                <Text>ليس لديك حساب؟ </Text>
                <Text style={styles.link} onPress={() => router.push('/signup')}>
                    أنشئ حساب جديد
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 8 },
    registerText: { marginTop: 16, textAlign: 'center', fontSize: 16, color: '#444' },
    link: { color: '#007AFF', fontWeight: 'bold' },
});
