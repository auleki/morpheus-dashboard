import {ScrollView, Text, View} from "react-native";
import StakeTimeDistributionChart from "@/components/charts/StakeTimeDistributionChart";
import PowerMultiplierDistributionChart from "@/components/charts/PowerMultiplierDistributionChart";
import MORHoldersChart from "@/components/charts/MORHoldersChart";
import BurnedLockedMORChart from "@/components/charts/BurnedLockedMORChart";
import StakersOverTimePoolChart from "@/components/charts/StakersOverTimePoolChart";
import PriceVolumeChart from "@/components/charts/PriceVolumeChart";
import TotalCirculatingSupply from "@/components/charts/TotalCirculatingSupply";

const Dashboard = () => {

    return (
        <ScrollView
            contentContainerStyle={{
                height: '100%',
                width: '100%',
                gap: 150,
                overflowY: 'scroll',
                backgroundColor: '#1a1a1a',
                paddingTop: 40,
                paddingBottom: 80,
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
            }}>
            <StakeTimeDistributionChart/>
            <PowerMultiplierDistributionChart/>
            <MORHoldersChart/>
            {/*<TotalCirculatingSupply/>*/}
            {/*<BurnedLockedMORChart/>*/}
            {/*<StakersOverTimePoolChart/>*/}
            {/*<PriceVolumeChart/>*/}
        </ScrollView>
    )
}

export default Dashboard