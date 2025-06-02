import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {

            await AsyncStorage.removeItem('user');

            const user = await AsyncStorage.getItem('user');
            console.log('🔍 المستخدم الموجود:', user);

            if (user) {
                router.replace('/home');
            } else {
                router.replace('/login');
            }

            setLoading(false);
        };

        checkLogin();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>جارٍ التحقق من حالة الدخول...</Text>
            </View>
        );
    }

    return null;
}
