import {Text, View, StyleSheet} from "react-native";
import {YAxis} from "react-native-svg-charts";
import {useEffect, useState} from "react";
import {formatStakeTimeChartData, setupStakeTimeChartData} from "@/utils/utils"
import PieChartKeys from "@/components/charts/pie/PieChartKeys";
import {PieChart} from "react-native-gifted-charts";
import axios from "axios";
import {POWER_MULTIPLIER_DISTRO_CHART_DATA} from "@/utils/constants";
import PieDataTabsList from "@/components/charts/pie/PieDataTabsList";
import SecondaryTabSwitch from "@/components/charts/pie/SecondaryTabSwitch";
import {PieDataType} from "@/types/charts";

export default function PowerMultiplierDistributionChart() {
    const [pieData, setPieData] = useState<any>([])
    const [currentPieData, setCurrentPieData] = useState<{}>([])
    const [poolsChartData, setPoolsChartData] = useState([])
    const [currentPoolChartData, setCurrentPoolChartData] = useState<any>([])
    const [poolChartTabs, setPoolChartTabs] = useState<any[]>([])
    const [activePoolTab, setActivePoolTab] = useState<string>('')
    const [secondaryChartTabs, setSecondaryChartTabs] = useState<string[]>([])
    const [activeSecondaryTab, setActiveSecondaryTab] = useState<string>('')
    const [excludedData, setExcludedData] = useState<[]>([])
    const [chartKeys, setChartKeys] = useState<PieDataType[]>([])
    const [chartBackupData, setChartBackupData] = useState<{}[]>([])

    function initializeChart() {
        const chartSetup = setupStakeTimeChartData(POWER_MULTIPLIER_DISTRO_CHART_DATA)
        setPoolChartTabs(chartSetup.chartTabs)
        setSecondaryChartTabs(chartSetup.secondaryTabs)
        setActivePoolTab(chartSetup.activePoolTab)
        setActiveSecondaryTab(chartSetup.activeSecondaryTab)
        setCurrentPoolChartData(chartSetup.currentPoolChartData)
        setChartKeys(chartSetup.currentPoolChartData)
        setChartBackupData(chartSetup.currentPoolChartData)
    }

    useEffect(() => {
        initializeChart()
    }, []);
    
    function onTabChange(tab: any) {
        setActivePoolTab(tab)
        const newChartData = formatStakeTimeChartData(POWER_MULTIPLIER_DISTRO_CHART_DATA, activePoolTab, activeSecondaryTab)
        setCurrentPoolChartData(newChartData)
        setChartKeys(newChartData)
        setExcludedData([])
    }

    function onSecondaryTabChange(tab: any) {
        setActiveSecondaryTab(tab)
        console.log({activePoolTab, activeSecondaryTab})
        const newChartData = formatStakeTimeChartData(POWER_MULTIPLIER_DISTRO_CHART_DATA, activePoolTab, activeSecondaryTab)
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Power Multiplier Distribution</Text>
            <PieDataTabsList pieDataTabs={poolChartTabs} onTabChange={onTabChange} activePieDataTab={activePoolTab} />
            <SecondaryTabSwitch tabs={secondaryChartTabs} onTabChange={onSecondaryTabChange} activeTab={activeSecondaryTab} />
            <PieChart data={currentPoolChartData} radius={150} textSize={8} showTooltip />
            <PieChartKeys
                pieData={chartKeys}
                excludedChartData={excludedData}
                onPress={onKeyToggle}
            />
            <Text style={styles.footerTitle}>Distribution of Power Multiplier by Frequency</Text>
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