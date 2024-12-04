import {StyleSheet, Text, View} from "react-native";
import {BarChart, LineChart} from "react-native-gifted-charts";

export default function StakersOverTimePoolChart() {
    // const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]
    const capitalData = [
        {value: 15, label: 'Tue'}, 
        {value: 30, label: 'Wed'}, 
        {value: 26, label: 'Thur'}, 
        {value: 40, label: 'Fri'}
    ];
    const codeData = [{value: 35}, {value: 40}, {value: 41}, {value: 43}];
    const combinedData = [{value: 10}, {value: 12}, {value: 14}, {value: 25}];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stakers Over Time Per Pool</Text>
            {/*<BarChart data = {data} />*/}
            <LineChart
                data={capitalData}
                // lineGradient
                yAxisColor={'#fff'}
                yAxisIndicesColor={'#fff'}
                // showYAxisIndices
                isAnimated
                startFillColor={"#fff"}
                xAxisColor={'#fff'}
                xAxisIndicesColor={'#fff'}
                data2={codeData}
                color2={"#ea4040"}
                data3={combinedData}
                color3={"#0de74b"}
                color={'#fcb507'}
                thickness={2}
                curved={true}
                dataPointsColor={'red'}
                dataPointsColor2={'yellow'}
                dataPointsColor3={'white'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingLeft: 20,
        paddingRight: 50,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
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
    }
})