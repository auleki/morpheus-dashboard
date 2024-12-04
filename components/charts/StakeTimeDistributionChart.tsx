import {Text, View, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {generateUniqueColors} from "@/utils/utils";
import {PieChart} from "react-native-gifted-charts";
import PieDataTabsList from "@/components/charts/pie/PieDataTabsList";
import SecondaryTabSwitch from "@/components/charts/pie/SecondaryTabSwitch";
import PieChartKeys from "@/components/charts/pie/PieChartKeys";
import {PieDataType} from "@/types/charts";
import {API_DISTRO_CHART_DATA} from "@/utils/constants";


export default function StakeTimeDistributionChart() {
    const [pieData, setPieData] = useState<any>([])
    const [poolsChartData, setPoolsChartData] = useState([])
    const [currentPoolChartData, setCurrentPoolChartData] = useState<any>([])
    const [poolChartTabs, setPoolChartTabs] = useState<any[]>([])
    const [activePoolTab, setActivePoolTab] = useState<string>('')
    const [secondaryChartTabs, setSecondaryChartTabs] = useState<string[]>([])
    const [activeSecondaryTab, setActiveSecondaryTab] = useState<string>('')
    const [excludedData, setExcludedData] = useState<[]>([])
    const [chartKeys, setChartKeys] = useState<PieDataType[]>([])
    const [chartBackupData, setChartBackupData] = useState<{}[]>([])

    function formatStakeTimeChartData(_chartData?: any): {} {
        // console.log({_chartData})
        let _chartValues: {}[] = [];
        const _currentPoolData = API_DISTRO_CHART_DATA[activePoolTab][activeSecondaryTab],
            dataKey = 'ranges',
            dataValue = 'frequencies',
            _activePoolChartKeys = _currentPoolData[dataKey],
            _activePoolChartValues = _currentPoolData[dataValue],
            _chartKeys = _activePoolChartKeys.map((data: any) => `${data[0]}${data[1] === null ? "+" : '-' + data[1]}`)
        const _pieChartColors = generateUniqueColors(_activePoolChartValues.length)

        /*
        * 1. Takes the chart data in the raw form based on the current active pool data
        * 2. Formats the keys and values, adding the colors and ID to each data
        * 3. Returns a formatted data for the chart that can then be set as the _currentPoolChartData
        * */
        for (let i = 0; i < _activePoolChartValues.length; i++) {
            _chartValues = [
                ..._chartValues,
                {
                    id: i + 1,
                    value: _activePoolChartValues[i],
                    keyValue: _chartKeys[i],
                    color: _pieChartColors[i]
                },
            ]
        }
        // console.log({_currentPoolData, _chartKeys, _chartValues})
        return _chartValues
    }

    function setupStakeTimeChartData(chartData = {}) {
        const chartTabs = Object.keys(chartData)
        const _activeTab = chartTabs[0]
        const _currentPoolData = API_DISTRO_CHART_DATA[_activeTab]
        const secondaryTabs = Object.keys(_currentPoolData)
        const _activeSecondaryTab = secondaryTabs[0]
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

    function onTabChange(tab: any) {
        setActivePoolTab(tab)
        const newChartData = formatStakeTimeChartData()
        setCurrentPoolChartData(newChartData)
        setChartKeys(newChartData)
        setExcludedData([])
    }

    function onSecondaryTabChange(tab: any) {
        setActiveSecondaryTab(tab)
        const newChartData = formatStakeTimeChartData(currentPoolChartData)
        setCurrentPoolChartData(newChartData)
        setChartKeys(newChartData)
        setExcludedData([])
    }

    function onKeyToggle(id: number) {        
        if (excludedData.includes(id)) {
            // data is hidden -> show the data
            const returnedData = chartBackupData.filter((cdata: PieDataType) => cdata.id === id)[0]
            setExcludedData((data: any) => excludedData.filter(_id => _id != id))
            setCurrentPoolChartData((pdata: PieDataType[]) => [...pdata, returnedData])
        } else {
            // data is shown -> hide the data
            if (currentPoolChartData.length === 1) return

            const _filteredPieData = currentPoolChartData.filter((piedata: PieDataType) => piedata.id != id)
            setExcludedData(xData => [id, ...xData])
            setCurrentPoolChartData(_filteredPieData)
        }
    }

    useEffect(() => {
        setupStakeTimeChartData(API_DISTRO_CHART_DATA)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stake Time Distribution</Text>
            <PieDataTabsList
                pieDataTabs={poolChartTabs}
                onTabChange={onTabChange}
                activePieDataTab={activePoolTab}
            />
            <SecondaryTabSwitch
                activeTab={activeSecondaryTab}
                tabs={secondaryChartTabs}
                onTabChange={onSecondaryTabChange}
            />
            <PieChart
                data={currentPoolChartData}
                radius={150}
                textSize={8}
                showTooltip
            />
            <PieChartKeys
                pieData={chartKeys}
                excludedChartData={excludedData}
                onPress={onKeyToggle}
            />
            <Text style={styles.footerTitle}>Distribution of Stake Time by Frequency</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#ffffff'
    },
    footerTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'gray'
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
})