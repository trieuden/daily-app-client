import react from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


function SettingController() {
    const actionLogout = async (setKey) => {        
        try {
            await AsyncStorage.setItem("currentAccount", "0");
            setKey(false);
        } catch (e) {}
    };
    return {
        actionLogout,
    }
}
export default SettingController
