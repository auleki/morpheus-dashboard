import {Pressable, StyleSheet, Text, View} from "react-native";

export default function PieChartKey({range = '100-200', color, onPress, id, isExcluded = false, value}: {
    range: string,
    color: string,
    onPress: Function,
    id: number,
    isExcluded: boolean,
    value: number | string
}) {
    
    // console.log({range, id, value, color})
    
    if (value === 0) return null // only show keys that have values higher than 0
    
    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{...styles.keyContainer, backgroundColor: `${isExcluded ? '#1a1a1a' : '#fff'}`}}>
                <Text style={{...styles.keyLabel, textDecorationLine: `${isExcluded ? 'line-through': 'none'}`}}>{range}</Text>
                <View style={{backgroundColor: color, ...styles.chartKey}}/>
                <Text style={styles.keyValue}>{value?.toLocaleString()}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    chartKey: {
        height: 10,
        width: 20,
        borderRadius: 3,
        color: "#fff"
    },
    keyContainer: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
    },
    keyLabel: {
        color: "#333"
    },
    keyValue: {
        fontWeight: 'bold'
    }
})