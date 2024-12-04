import {Text, View, StyleSheet} from "react-native";
import {Grid, StackedAreaChart, XAxis, YAxis} from "react-native-svg-charts";
import * as shape from 'd3-shape'
import {LineChart} from "react-native-gifted-charts";
export default function TotalCirculatingSupply () {
    const totalSupply = []
    const circulatingSupply = []
    const data = [
        {value: 1200000},
        {value: 1200000},
        {value: 1200000},
        {value: 1200000},
        {value: 1200000},
        {value: 1200000},
        {value: 1200000},
    ] 
    const dataTwo = [
        {value: 300000},
        {value: 300000},
        {value: 300000},
        {value: 300000},
        {value: 300000},
        {value: 300000},
        {value: 300000},
        
    ]
    // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    // const labels = ['santa', 'matic', 'percu', 'lupton', 'kulde', 'sazlo', 'veanmer', 'xasp', 'jerb', 'wonky', 'dacor', 'brew']
    
    const contentInset = { top: 20, bottom: 20 }
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Supply Chart (Last 5 Days)</Text>
            {/*<LineChart*/}
            {/*    yAxisSide={0}*/}
            {/*    areaChart */}
            {/*    data={data} */}
            {/*    data2={dataTwo}*/}
            {/*    spacing={44}*/}
            {/*    initialSpacing={0}*/}
            {/*    startOpacity={0.4}*/}
            {/*    color1={'#BF40BF'}*/}
            {/*    color2={"#eecc20"}*/}
            {/*    dataPointsColor1={'#BF40BF'}*/}
            {/*    dataPointsColor2={'#eecc20'}*/}
            {/*    endOpacity={0.1}*/}
            {/*    startFillColor1={"#BF40BF"}*/}
            {/*    endFillColor1={"#BF40BF"}*/}
            {/*    endFillColor2={'#eecc20'}*/}
            {/*    startFillColor2={"#eecc20"}*/}
            {/*/>*/}
            <LineChart
                areaChart
                
                curved
                data={data}
                data2={dataTwo}
                height={250}
                spacing={44}
                initialSpacing={0}
                color1="skyblue"
                color2="orange"
                textColor1="green"
                dataPointsColor1="blue"
                dataPointsColor2="red"
                startFillColor1="skyblue"
                startFillColor2="orange"
                startOpacity={0.8}
                endOpacity={0.3}
            />
            
            
            <Text style={styles.footerTitle}>Distribution of Total and Circulating Supply over the last 5 days</Text>
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
        height: 'auto',
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