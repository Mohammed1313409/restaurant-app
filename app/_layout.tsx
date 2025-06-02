import { Slot } from 'expo-router';
import { CartProvider } from './context/CartContext';
import { DishProvider } from './context/DishContext';

export default function RootLayout() {
    return (
        <DishProvider>
            <CartProvider>
                <Slot />
            </CartProvider>
        </DishProvider>
    );
}
