import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Game } from "./home/game"
import { Home } from "./home/home"
import { Winner } from "./home/Winner"


const AppTAB = createStackNavigator()

export const AppNavigator = () => {
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
                <AppTAB.Screen component={Home} name="Home" />
                <AppTAB.Screen component={Game} name="Game" />
                <AppTAB.Screen component={Winner} name="Winner" />


            </AppTAB.Navigator>
        </NavigationContainer>
    )
}