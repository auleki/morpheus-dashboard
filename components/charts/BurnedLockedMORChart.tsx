import {StyleSheet, Text, View} from "react-native";
import {LineChart} from "react-native-gifted-charts";
import {useEffect, useState} from "react";
import {generateDates, includeDateWithData} from "@/utils/utils";

export default function BurnedLockedMORChart() {
    const [chartData, setChartData] = useState([])
    let burnedData = [
        { value: 1400 },
        { value: 3900 },
        { value: 5400 },
        { value: 6900 },
        { value: 8900 },
        { value: 10900 },
        { value: 11000 },
        { value: 12000 },
    ]
    const lockedData = [
        { value: 1000 },
        { value: 3200 },
        { value: 5000 },
        { value: 6000 },
        { value: 8100 },
        { value: 10000 },
        { value: 12000 },
        { value: 13000 },
    ]
    useEffect(() => {
        const _chartData = includeDateWithData(lockedData)
        setChartData(_chartData)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Burned / Locked MOR </Text>
            {chartData.length ? (
                <LineChart
                    areaChart
                    curved
                    startFillColor={'#2876da'}
                    initialSpacing={10}
                    spacing={40}
                    yAxisIndicesHeight={40}
                    yAxisLabelWidth={100}
                    
                    textFontSize={6}
                    endFillColor={'#2876da'}
                    endOpacity={0.3}
                    color={'#2876da'}
                    data={chartData}
                />
            ) : (
                <View>
                    <Text>Loading chart...</Text>
                </View>
            ) }
            <Text style={styles.footerTitle}>Total Burned MOR till now: 11794.74 MOR</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#333'
    },
    footerTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'gray'
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        shadowColor: '#000',
        overflow: 'auto',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    }
})