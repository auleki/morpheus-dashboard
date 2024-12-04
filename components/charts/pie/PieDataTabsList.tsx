import {StyleSheet, Text, View} from "react-native";
import {PieDataTabsListProps} from "@/types/chart";

export default function PieDataTabsList({pieDataTabs, onTabChange, activePieDataTab}: PieDataTabsListProps) {
    return (
        <View style={styles.dataTabs}>
            {pieDataTabs.map((dataTab: string) => (
                <Text
                    onPress={() => onTabChange(dataTab)}
                    style={dataTab === activePieDataTab ? styles.dataTabActive : styles.dataTab}>
                    {dataTab === 'total' ? 'All' : dataTab}
                </Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
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
})