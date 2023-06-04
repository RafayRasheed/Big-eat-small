import React from "react";
import { Text, SafeAreaView, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Spacer, ios, myHeight, myWidth } from "../common";
import { myColors } from "../../ultils/myColors";
import { myFontSize, myFonts, myLetSpacing } from "../../ultils/myFonts";
import { ActivityScreen } from "../activity/activity_screen";
import { HomeNavigator } from "./home_navigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator()

const Icons = {
    HOME: {
        image: require('../assets/home_main/navigator/home.png'),
        style: { width: myWidth(6.5), height: myHeight(2.68) }
    },
    ACTIVITY: {
        image: require('../assets/home_main/navigator/activity.png'),
        style: { width: myWidth(6.2), height: myHeight(2.15) }
    },
    HOT: {
        image: require('../assets/home_main/navigator/cart.png'),
        style: { width:  myHeight(3), height: myHeight(3) }
    },

    // WALLET: require('../assets/home_main/navigator/wallet.png'),
    CART: {
        image: require('../assets/home_main/navigator/cart.png'),
        style: { width: myWidth(5.5), height: myHeight(2.68) }
    },
    ACCOUNT: {
        image: require('../assets/home_main/navigator/account.png'),
        style: { width: myWidth(6.2), height: myHeight(2.68) }
    },
}


const screenOptions = ({ route }) => {
    const name = route.name
    return {
        headerShown: false,
        tabBarStyle: {
            backgroundColor: myColors.background,
            paddingHorizontal: myWidth(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            height: myHeight(7.5),
            paddingBottom: ios ? myHeight(2.2) : myHeight(0.5),
            paddingTop: myHeight(2),
            // position: 'absolute',
        },
        tabBarLabelStyle: {
            display:name=='HOT'?'none':'flex',
            fontSize: myFontSize.xSmall,
            fontFamily: myFonts.bodyBold,
            letterSpacing: myLetSpacing.common,
            paddingTop: myHeight(1),
        },
        tabBarActiveTintColor: myColors.primaryT,
        tabBarInactiveTintColor: myColors.text,
        // tabBarShowLabel:name=='HOT'?true:false,
        tabBarIcon: ({ color }) =>{
            if(name=='HOT') {
                return(
                    <View style={{
                        padding:myHeight(2.5), backgroundColor:color,
                        borderRadius:myHeight(4),
                        marginTop:-myHeight(8) 
                        }}>
                        <Image style={[Icons[name].style, { tintColor: myColors.background, resizeMode: 'contain',}]}
                        source={Icons[name].image} /> 
                    </View>
                    )
            }
            return(
                <Image style={[Icons[name].style, { tintColor: color, resizeMode: 'contain', }]}
                    source={Icons[name].image} />
            )
        },
    }
}

const Xr = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: myColors.blue }}>
        <Spacer paddingT={myHeight(2)} />
        <Text onPress={() => navigation.navigate('AccountNavigator')} style={{ color: 'black' }}>Sign Out</Text>
    </SafeAreaView>
)


export const HomeBottomNavigator = ({ route, navigation }) => {
    return (
        <Tab.Navigator
            tabBarActiveTintColor={myColors.primary}
            headerShown={false}
            screenOptions={screenOptions}
            tabBarShowLabel={false}
            initialRouteName="HOME"
        >
            <Tab.Screen name="HOME" component={HomeNavigator} />
            <Tab.Screen name="ACTIVITY" component={Xr} />
            <Tab.Screen name="HOT" component={Xr} />
            <Tab.Screen name="CART" component={Xr} />
            <Tab.Screen name="ACCOUNT" component={Xr} />

        </Tab.Navigator>


    )
}