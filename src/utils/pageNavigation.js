import react from "react";
import { useNavigation } from "@react-navigation/native";


function pageNavigation() {
    const navigation = useNavigation();    

    const navigateToBudget = () => {
        navigation.navigate('Budget');
    };
    const navigateToProfile = () => {
        navigation.navigate('Account');
    };
    const navigateToOverview = () => {
        navigation.navigate('Overview');
    };
    const navigateToSetting = () => {
        navigation.navigate('Setting');
    };
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };
    return {
        navigateToBudget,
        navigateToProfile,
        navigateToOverview,
        navigateToSetting,
        navigateToLogin
    }
}
export default pageNavigation