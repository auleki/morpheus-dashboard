import {Tabs} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Text, StyleSheet} from "react-native";

export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#54ff55',
                    tabBarInactiveTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1a1a1a',
                    },
                    headerShadowVisible: false,
                    headerTintColor: '#54ff55',
                    
                    tabBarStyle: {
                        backgroundColor: '#1a1a1a',
                        borderColor: 'none',
                    },
                }}
            >

                <Tabs.Screen
                    name="dashboard"
                    options={{
                        title: 'Dashboard',
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons
                                name={focused ? 'pie-chart-sharp' : 'pie-chart-outline'}
                                color={focused ? color : '#ffffff'}
                                size={24}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons
                                name={focused ? 'information-circle' : 'information-circle-outline'}
                                color={focused ? color : '#ffffff'}
                                size={24}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
    }
})