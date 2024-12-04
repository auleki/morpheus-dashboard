import {View, StyleSheet, Text} from "react-native";
import {SecondaryTabSwitchProps} from "@/types/chart";

export default function SecondaryTabSwitch({tabs, onTabChange, activeTab}: SecondaryTabSwitchProps) {

    return (
        <View style={styles.container}>
            {tabs.map((tab: any) => (
                <Text
                    style={activeTab === tab ? styles.activeTab : styles.inactiveTab}
                    onPress={() => onTabChange(tab)}
                >
                    {tab}
                </Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1a1a",
        color: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    text: {
        fontSize: 16,
    },
    activeTab: {
        color: "#fff"
    },
    inactiveTab: {
        color: '#333'
    }
})