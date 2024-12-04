import {API_DISTRO_CHART_DATA} from "@/utils/constants";

export function generateDates(days: number = 0) {
    const dateList = []
    const today = new Date()
    const tomorrow = new Date()
    let i = 0
    while (i < days) {
        tomorrow.setDate(today.getDate() + i)
        dateList.push(tomorrow.toLocaleDateString())
        i++
    }
    return dateList
}

export function includeDateWithData(data = [{}]) {
    // console.log('include with data')
    const dateList = generateDates(data.length)
    console.log({dateList, data})
    for (let i = 0; i < data.length; i++) {
        const currentData = data[i]
        data[i] = {...currentData, label: dateList[i]}
    }
    console.log({data})
    return data
}

export function generateUniqueColors(count: number): string[] {
    const generatedColors: string[] = [];
    const minColorDifference = 30; // Threshold for color difference

    // Helper function to check color similarity
    const isColorTooSimilar = (newColor: string) => {
        return generatedColors.some(existingColor => {
            const newRGB = hexToRgb(newColor);
            const existingRGB = hexToRgb(existingColor);

            // Calculate color difference
            const colorDiff = Math.max(
                Math.abs(newRGB.r - existingRGB.r),
                Math.abs(newRGB.g - existingRGB.g),
                Math.abs(newRGB.b - existingRGB.b)
            );

            return colorDiff < minColorDifference;
        });
    };

    // Helper to convert hex to RGB
    function hexToRgb(hex: string) {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // Generate colors
    while (generatedColors.length < count) {
        const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

        if (!generatedColors.includes(newColor) && !isColorTooSimilar(newColor)) {
            generatedColors.push(newColor);
        }
    }

    return generatedColors;
}

export function formatStakeTimeChartData(
    _chartData: {},
    _activePoolTab: string,
    _activeSecondaryTab: string,
    _dataKey: string = 'ranges',
    _dataValue: string = 'frequencies'
): {} {
    // console.log({_chartData})
    let _chartValues: {}[] = [];
    const _currentPoolData = _chartData[_activePoolTab][_activeSecondaryTab],
        dataKey = _dataKey,
        dataValue = _dataValue,
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
    return _chartValues
}

export function setupStakeTimeChartData(_chartData = {}) {
    const chartTabs = Object.keys(_chartData)
    const _activeTab = chartTabs[0]
    const _currentPoolData = _chartData[_activeTab]
    const secondaryTabs = Object.keys(_currentPoolData)
    const _activeSecondaryTab = secondaryTabs[0]
    const dataKey = 'ranges'
    const dataValue = 'frequencies'

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
    
    return {
        activePoolTab: chartTabs[0],
        activeSecondaryTab: secondaryTabs[0],
        currentPoolChartData: _chartValues,
        chartKeys: _chartKeys,
        chartTabs,
        secondaryTabs
    }
}