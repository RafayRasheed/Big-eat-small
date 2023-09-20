import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { myFontSize, myFonts, myLetSpacing } from "../../ultils/myFonts"
import { myColors } from "../../ultils/myColors"
import { Categories, offers } from "./home_data";
import { Spacer, StatusbarH, myHeight, myWidth } from "../../game/common";
import { RestaurantInfo } from "./home.component/restaurant_info";
import { RestaurantInfoFull } from "./home.component/restaurant_info_full";

export const RestaurantAll = ({ navigation, route }) => {
    const { restaurants } = route.params
    const { name } = route.params
    const [search, setSearch] = useState(null)

    return (
        <View style={{ paddingHorizontal: myWidth(0), flex: 1, backgroundColor: myColors.background }}>
            <StatusbarH />
            <Spacer paddingT={myHeight(1)} />
            {/* Top */}
            <View style={{ paddingHorizontal: myWidth(4.5), flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.6} style={{ padding: myHeight(1) }}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/common/back.png')} style={{
                        width: myHeight(2.4),
                        height: myHeight(2.4),
                        resizeMode: 'contain',
                    }} />
                </TouchableOpacity>
                <Spacer paddingEnd={myWidth(2)} />
                <Text style={[styles.textCommon, {
                    flex: 1,
                    fontSize: myFontSize.xBody2,
                    fontFamily: myFonts.heading,
                }]}>{name}</Text>
            </View>

            <Spacer paddingT={myHeight(1.5)} />
            <View style={{ paddingHorizontal: myWidth(4), flexDirection: 'row', alignItems: 'center' }}>
                {/* Search */}
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    backgroundColor: myColors.divider, alignSelf: 'center',
                    paddingVertical: myHeight(0.8),
                    borderRadius: myHeight(1.2)
                }}>
                    <Spacer paddingEnd={myWidth(4)} />
                    <Image style={{
                        height: myHeight(2.2),
                        width: myHeight(2.2),
                        resizeMode: 'contain',
                        tintColor: myColors.textL4
                    }} source={require('../assets/home_main/home/search.png')} />
                    <Spacer paddingEnd={myWidth(3)} />

                    <TextInput
                        style={{
                            flex: 1,
                            padding: 0, fontSize: myFontSize.body,
                            fontFamily: myFonts.bodyBold, alignItems: 'center',
                            includeFontPadding: false,
                        }}
                        placeholder="Search Restaurants"
                        cursorColor={myColors.primaryT}
                        placeholderTextColor={myColors.offColor}
                        value={search}

                        onChangeText={setSearch}
                    />
                </View>
            </View>
            <Spacer paddingT={myHeight(1.5)} />
            {/* <View style={{
                borderTopWidth: myHeight(0.1), alignSelf: 'flex-end',
                borderColor: myColors.offColor, width: "100%"
            }} /> */}

            <ScrollView showsVerticalScrollIndicator={false}>

                {restaurants.map((item, i) =>
                    <TouchableOpacity key={i} activeOpacity={0.95}
                        onPress={() => navigation.navigate('RestaurantDetail', { item })} >
                        <RestaurantInfoFull restaurant={item} />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    textCommon: {
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
    },
})
