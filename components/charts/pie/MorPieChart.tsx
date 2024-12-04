import {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {API_DISTRO_CHART_DATA} from "@/utils/constants";
import {generateUniqueColors} from "@/utils/utils";

export default function MorPieChart({pieChartData}: { pieChartData: any }) {
    const [currentPieData, setCurrentPieData] = useState<any>([])
    const [excludedData, setExcludedData] = useState<number[]>([])
    const [pieDataTabs, setPieDataTabs] = useState<string[]>([])
    const [activePieDataTab, setActivePieDataTab] = useState('')
    const [pieChartKeysData, setPieChartKeysData] = useState<any>([])
    const [chartBackupData, setChartBackupData] = useState<any>([]);
    const [chartKeys, setChartKeys] = useState<{}[]>([])
    const [poolChartTabs, setPoolChartTabs] = useState<any[]>([])
    const [activePoolTab, setActivePoolTab] = useState<string>('')
    const [secondaryChartTabs, setSecondaryChartTabs] = useState<string[]>([])
    const [currentPoolChartData, setCurrentPoolChartData] = useState<any>([])
    const [activeSecondaryTab, setActiveSecondaryTab] = useState<string>('')
    

    // REVIEW
    function setupStakeTimeChartData(chartData = {}) {
        const chartTabs = Object.keys(chartData)
        const _activeTab = chartTabs[0]
        const _currentPoolData = pieChartData[_activeTab]
        const secondaryTabs = Object.keys(_currentPoolData)
        const _activeSecondaryTab = secondaryTabs[0]
        // Need to have something that would umbrella these two pieces of data: i.e -> accessor??
        const dataKey = 'ranges'
        const dataValue = 'frequencies'

        // set the power_multiplier and stake_time
        setPoolChartTabs(chartTabs)
        setSecondaryChartTabs(secondaryTabs)

        // set structure for chart data
        // id, keyValue, value, color
        const _activePoolDataKeys = _currentPoolData[_activeSecondaryTab][dataKey]
        const _activePoolDataValues: [] = _currentPoolData[_activeSecondaryTab][dataValue]
        const pieChartColors = generateUniqueColors(_activePoolDataValues.length)

        const _chartKeys = _activePoolDataKeys.map((data: any) => `${data[0]}${data[1] === null ? "+" : '-' + data[1]}`)
        let _chartValues: [{ color: string; keyValue: any; id: number; value: never }] = [] as any;
        for (let i = 0; i < _activePoolDataValues.length; i++) {
            _chartValues = [
                ..._chartValues,
                {
                    id: i + 1,
                    value: _activePoolDataValues[i],
                    keyValue: _chartKeys[i],
                    color: pieChartColors[i]
                },
            ]
        }

        setActivePoolTab(chartTabs[0])
        setActiveSecondaryTab(secondaryTabs[0])
        setCurrentPoolChartData(_chartValues)
        setChartKeys(_chartValues)
        setChartBackupData(_chartValues)
    }

    // R
    function formatStakeTimeChartData(_chartData: any) {
    }

    function onTabChange(tab: any) {
    }

    function onSecondaryTabChange(tab: any) {
    }

    function onKeyToggle(id: number) {
    }

    useEffect(() => {
        setupStakeTimeChartData()
    }, []);

    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    footerTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'gray'
    },
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    dataTab: {
        color: 'gray',
        borderStyle: 'solid',
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    dataTabActive: {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        borderBottomWidth: 1
    },
    container: {
        height: 'auto',
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 20,
        display: 'flex',
        gap: 25,
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
}
})