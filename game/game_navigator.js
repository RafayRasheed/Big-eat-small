import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Game } from "./home/game"
import { Home } from "./home/home"
import { Winner } from "./home/Winner"
import { useEffect, useLayoutEffect } from "react"
import { playBackground, playSound } from "./component/components"
import { useDispatch, useSelector } from "react-redux"
import { setMute } from "../redux/states_reducer"
import { getMuteStorage } from "./storageFun"


const AppTAB = createStackNavigator()
const musicScreen = ["Home"];

export const GameNavigator = ({ navigation, route }) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setMute(getMuteStorage()))
    // }, [])
    let s = true
    const { mute } = useSelector(state => state.GameStates)

    // useLayoutEffect(() => {

    //     console.log(getFocusedRouteNameFromRoute(route))
    if (musicScreen.includes(getFocusedRouteNameFromRoute(route)) && !mute) {

        playBackground()
    }

    return (
        <AppTAB.Navigator
            // initialRouteName="StartupNavigator"
            // initialRouteName={containFirstTime() ? containLogin() ? 'HomeBottomNavigator' : "AccountNavigator" : "StartupScreen"}
            screenOptions={{
                animation: 'fade',
                headerShown: false,
            }}
        >
            <AppTAB.Screen component={Home} name="Home" />
            <AppTAB.Screen component={Game} name="Game" />
            <AppTAB.Screen component={Winner} name="Winner" />


        </AppTAB.Navigator>
    )
}