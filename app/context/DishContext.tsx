import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Dish {
    id: string;
    name: string;
    description: string;
    calories: number;
    rating: number;
}

type DishContextType = {
    getDishes: (categoryId: string) => Dish[];
    saveDishes: (categoryId: string, dishes: Dish[]) => void;
};

const DishContext = createContext<DishContextType | undefined>(undefined);

export const DishProvider = ({ children }: { children: ReactNode }) => {
    const [dishMap, setDishMap] = useState<Record<string, Dish[]>>({});

    useEffect(() => {
        const loadDishes = async () => {
            const json = await AsyncStorage.getItem('dishes');
            if (json) setDishMap(JSON.parse(json));
        };
        loadDishes();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('dishes', JSON.stringify(dishMap));
    }, [dishMap]);

    const getDishes = (categoryId: string): Dish[] => dishMap[categoryId] || [];

    const saveDishes = (categoryId: string, dishes: Dish[]) => {
        setDishMap((prev) => ({ ...prev, [categoryId]: dishes }));
    };

    return (
        <DishContext.Provider value={{ getDishes, saveDishes }}>
            {children}
        </DishContext.Provider>
    );
};

export const useDishes = () => {
    const context = useContext(DishContext);
    if (!context) throw new Error('useDishes must be used within DishProvider');
    return context;
};
