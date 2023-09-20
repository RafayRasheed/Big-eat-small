import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView, FlatList,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ItemSkeleton, RestaurantInfoSkeleton, RestaurantInfoSkeletonHori } from '../common/skeletons';


export const Favourite = ({ navigation }) => {
    const [i, setI] = useState(0)
    const { favoriteItem, favoriteRestuarnt } = useSelector(state => state.favorite)
    const restaurantLength = favoriteRestuarnt.length
    const ItemLength = favoriteItem.length
    const [isLoadingRes, setIsLoadingRes] = useState(true)
    const [isLoadingItem, setIsLoadingItem] = useState(true)
    useEffect(() => {

    }, [])

    useEffect(() => {
        setIsLoadingItem(ItemLength != 0)
    }, [favoriteItem])

    useEffect(() => {
        setIsLoadingRes(restaurantLength != 0)
    }, [favoriteRestuarnt])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.background }}>
            <StatusbarH />
            {/* Top */}
            <View>
                <Spacer paddingT={myHeight(2)} />
                <View style={{ paddingEnd: myWidth(4), flexDirection: 'row', alignItems: 'center' }}>
                    {/* Search */}

                    {/* Arrow */}
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => navigation.goBack()} style={{ paddingHorizontal: myWidth(4), }}>
                        <Image style={{
                            height: myHeight(2.4),
                            width: myHeight(2.4),
                            resizeMode: 'contain',
                            tintColor: myColors.textL0
                        }} source={require('../assets/home_main/home/back.png')} />
                    </TouchableOpacity>
                    {/* <Spacer paddingEnd={myWidth(2.5)} /> */}
                    <Text style={[styles.textCommon,
                    {
                        fontFamily: myFonts.heading,
                        fontSize: myFontSize.xBody2
                    }]}>
                        Favourites
                    </Text>
                </View>
                {/* <View style={{ height: myHeight(0.6), backgroundColor: myColors.divider }} /> */}
            </View>

            <Spacer paddingT={myHeight(1.5)} />
            {/* Restaurants & Items Headings */}
            <View style={{ flexDirection: 'row', alignItems: "center", }}>
                <Spacer paddingEnd={myWidth(5)} />
                <TouchableOpacity activeOpacity={0.7} onPress={() => setI(0)}>
                    <View style={{
                        paddingHorizontal: myWidth(4),
                        paddingVertical: myHeight(0.6),
                        borderRadius: 500,
                        backgroundColor: i == 0 ? myColors.primary : myColors.divider,
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.textCommon, {
                            fontFamily: myFonts.bodyBold,
                            fontSize: myFontSize.body,
                            color: i == 0 ? myColors.background : myColors.text
                        }]}>Restaurants</Text>
                    </View>
                    {/* <View style={[{
                        backgroundColor: myColors.primaryT,
                        borderRadius: myHeight(3),
                        height: myHeight(0.4),
                        marginTop: -myHeight(0.4)
                    }, i != 0 && { backgroundColor: myColors.background }]} /> */}
                </TouchableOpacity>

                <Spacer paddingEnd={myWidth(5)} />
                <TouchableOpacity activeOpacity={0.7} onPress={() => setI(1)}>
                    <View style={{
                        paddingHorizontal: myWidth(4),
                        paddingVertical: myHeight(0.6),
                        borderRadius: 500,
                        backgroundColor: i == 1 ? myColors.primary : myColors.divider,
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.textCommon, {
                            fontFamily: myFonts.bodyBold,
                            fontSize: myFontSize.body,
                            color: i == 1 ? myColors.background : myColors.text
                        }]}>Items</Text>
                    </View>
                    {/* <View style={[{
                        backgroundColor: myColors.primaryT,
                        borderRadius: myHeight(3),
                        height: myHeight(0.4),
                        marginTop: -myHeight(0.4)
                    }, i != 1 && { backgroundColor: myColors.background }]} /> */}
                </TouchableOpacity>
            </View>

            <Spacer paddingT={myHeight(1)} />
            {/* Line */}
            <View style={{ height: myHeight(0.3), backgroundColor: myColors.divider }} />


            <Spacer paddingT={myHeight(1)} />

            {/* Loading for Restaurant */}
            {
                (isLoadingRes && i == 0) &&
                <>
                    <RestaurantInfoSkeleton isFull={true} />
                    <RestaurantInfoSkeleton isFull={true} />
                    <RestaurantInfoSkeleton isFull={true} />
                </>

            }
            {/* Loading for Items */}
            {
                (isLoadingItem && i == 1) &&
                <>
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                </>

            }


            <Spacer paddingT={myHeight(2)} />

            {/* <FlatList
               
            /> */}
            {
                (!restaurantLength && i == 0) &&
                <Text style={[styles.textCommon, {
                    flex: 1,
                    fontFamily: myFonts.bodyBold,
                    fontSize: myFontSize.medium0,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                }]}>{'No Restaurants Found!'}</Text>
            }
            {
                (!ItemLength && i == 1) &&
                <Text style={[styles.textCommon, {
                    flex: 1,
                    fontFamily: myFonts.bodyBold,
                    fontSize: myFontSize.medium0,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                }]}>{'No Items Found!'}</Text>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    //Text
    textCommon: {
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
    },
})