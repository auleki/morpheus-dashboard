import {Text, View, StyleSheet} from "react-native";
import {Link, Stack} from "expo-router";

export default function SettingsScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Wild Settings'}} />
            <View style={styles.container}>
                <Text style={styles.text}>Settings Screen</Text>
                <Link href={"/"} style={styles.button}>Go Home</Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252922e",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "crimson"
    },
    button: {
        fontSize: 16,
        textDecorationLine: 'underline',
        backgroundColor: "#1a1a1a",
        padding: 10,
        color: "#fff",
        borderRadius: 5
    }
})