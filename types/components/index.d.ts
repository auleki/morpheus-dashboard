import {PieDataType} from "@/types/charts";

export type PieChartKeysType = {
    pieData: PieDataType[];
    onPress?: Function;
    excludedChartData: number[];
}