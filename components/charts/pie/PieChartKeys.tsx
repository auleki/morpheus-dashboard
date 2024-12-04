import {StyleSheet, Text, View} from "react-native";
import PieChartKey from "@/components/charts/pie/PieChartKey";
import {PieDataType} from "@/types/charts";
import {PieChartKeysType} from "@/types/components";

export default function PieChartKeys({pieData, onPress, excludedChartData}: PieChartKeysType) {
    return (
        <View style={styles.container}>
            {/*CHART KEYS*/} 
            {pieData.map((data, index) => (
                <PieChartKey 
                    isExcluded={excludedChartData.includes(data.id)} 
                    id={data.id} 
                    onPress={onPress}
                    range={data.keyValue} 
                    value={data.value}
                    color={data.color} 
                    key={index} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    chartKey: {
        height: 10,
        width: 20,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'white',
    },
    keyContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})