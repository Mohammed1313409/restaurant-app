
import { router } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>

            <TextInput placeholder="Email" style={styles.input} />
            <TextInput placeholder="Password" style={styles.input} secureTextEntry />

            <Button title="Login" onPress={() => router.push('/home')} />

            <Text style={styles.signupText}>
                Don't have an account? <Text style={{ color: 'blue' }}>Sign up</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 16,
    },
});
