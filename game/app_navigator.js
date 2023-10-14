import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Game } from "./home/game"
import { Home } from "./home/home"
import { Winner } from "./home/Winner"
import { useLayoutEffect } from "react"
import { GameNavigator } from "./game_navigator"


const AppTAB = createStackNavigator()

export const AppNavigator = ({ navigation, route }) => {

    return (
        <NavigationContainer>
            <AppTAB.Navigator
                // initialRouteName="StartupNavigator"
                // initialRouteName={containFirstTime() ? containLogin() ? 'HomeBottomNavigator' : "AccountNavigator" : "StartupScreen"}
                screenOptions={{
                    animation: 'fade',
                    headerShown: false,
                }}
            >
                <AppTAB.Screen component={GameNavigator} name="GameNavigator" />



            </AppTAB.Navigator>
        </NavigationContainer>
    )
}