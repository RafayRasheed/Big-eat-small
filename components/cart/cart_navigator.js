import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Cart } from "./cart_screen";
import { CartDetails } from "./cart_details_screen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { myColors } from "../../ultils/myColors";
import { ios, myHeight, myWidth, tabBarStyle } from "../../game/common";
import { CartDetail } from "./cart_detail_screen";





const CartTAB = createNativeStackNavigator();

export const CartNavigator = ({ navigation, route }) => {
    // React.useLayoutEffect(() => {
    //     if (getFocusedRouteNameFromRoute(route) == 'CartDetails') {
    //         navigation.setOptions({ tabBarStyle: { display: 'none' } })

    //     } else {
    //         navigation.setOptions(tabBarStyle)
    //     }
    // }, [route, navigation])

    return (
        <>
            {/* <StatusBar backgroundColor={hideStatus ? 'transparent' : myColors.background} translucent={hideStatus} /> */}
            <CartTAB.Navigator
                screenOptions={({ navigation }) => {
                    return {
                        detachPreviousScreen: !navigation.isFocused(),
                        animation: 'fade',
                        headerShown: false,
                    }
                }}
                // screenOptions={{
                //     animation: 'fade',
                //     headerShown: false,
                // }}
                initialRouteName="Cart"
            >
                <CartTAB.Screen component={Cart} name="Cart" />
                <CartTAB.Screen component={CartDetail} name="CartDetail" />
                {/* <CartTAB.Screen component={CartDetails} name="CartDetails" /> */}



            </CartTAB.Navigator>
        </>
    )
} 