import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, View, Text, FlatList, Modal, UIManager, LayoutAnimation } from 'react-native'
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import { Categories, Restaurants, } from './home_data'
import { ResturantH } from './home.component/resturant_hori';
import { Banners } from './home.component/banner';
import { RestaurantInfo } from './home.component/restaurant_info';
import { RestRating } from './rest_rating_screen';
import { getLogin } from '../functions/storageMMKV';

if (!ios && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}
export const HomeScreen = ({ navigation }) => {
    const name = "Someone";

    // re.turn (<Test />)
    useEffect(() =>
        console.log(getLogin())
        , [])
    return (

        <SafeAreaView style={styles.container}>
            <StatusbarH />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

                <Spacer paddingT={myHeight(1.4)} />
                <Text style={[styles.textCommon, {
                    fontSize: myFontSize.medium2,
                    fontFamily: myFonts.heading,
                    alignSelf: 'center',

                }]}>Food<Text style={{ color: myColors.primaryT }}>app</Text></Text>

                <Spacer paddingT={myHeight(1.5)} />
                {/* Search */}
                <TouchableOpacity activeOpacity={0.8} style={{
                    flexDirection: 'row', alignItems: 'center', width: myWidth(85),
                    backgroundColor: myColors.divider, alignSelf: 'center', paddingVertical: myHeight(1.3),
                    borderRadius: myWidth(2.5)

                }} onPress={() => navigation.navigate('Search')}>
                    <Spacer paddingEnd={myWidth(4)} />
                    <Image style={{
                        height: myHeight(2.2), width: myHeight(2.2), resizeMode: 'contain', tintColor: myColors.offColor
                    }} source={require('../assets/home_main/home/search.png')} />
                    <Spacer paddingEnd={myWidth(3)} />

                    <Text style={[styles.textCommon, {
                        fontSize: myFontSize.body,
                        fontFamily: myFonts.bodyBold,
                        color: myColors.offColor
                    }]}>Search dishes, restaurants</Text>
                </TouchableOpacity>

                <Spacer paddingT={myHeight(3)} />

                {/* Banner */}
                <Banners />

                <Spacer paddingT={myHeight(2.5)} />
                {/* CAtegories*/}
                <View>
                    {/* Categories & see all*/}
                    <View style={{
                        paddingHorizontal: myWidth(4), alignItems: 'center', flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={[styles.textCommon, {
                            fontSize: myFontSize.xxBody,
                            fontFamily: myFonts.bodyBold,
                        }]}>Categories</Text>

                        {/* See all */}
                        <TouchableOpacity style={{
                            flexDirection: 'row', alignItems: 'center', paddingVertical: myHeight(0.4),
                            paddingStart: myWidth(2)
                        }} activeOpacity={0.6} onPress={() => navigation.navigate('CategoryFull')}>

                            <Text
                                style={[styles.textCommon, {
                                    fontSize: myFontSize.body2,
                                    fontFamily: myFonts.bodyBold,
                                    color: myColors.primaryT
                                }]}>See All</Text>
                            <Image style={{
                                height: myHeight(1.5), width: myHeight(1.5), marginStart: myWidth(1),
                                resizeMode: 'contain', tintColor: myColors.primaryT
                            }} source={require('../assets/home_main/home/go.png')} />
                        </TouchableOpacity>
                    </View>

                    <Spacer paddingT={myHeight(0.3)} />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: myWidth(1) }}>

                        {Categories.slice(0, 4).map((item, i) =>

                            <View key={i} style={{ padding: myHeight(1.4), paddingEnd: myWidth(2) }}>
                                <TouchableOpacity activeOpacity={0.8} style={{
                                    flexDirection: 'row', alignItems: 'center', borderRadius: myHeight(15),
                                    backgroundColor: myColors.background,
                                    // backgroundColor:myColors.primaryL,  
                                    padding: myHeight(0.8), elevation: 8
                                }} onPress={() => navigation.navigate('RestaurantAll', { name: item.name, restaurants: Restaurants })}>
                                    <View style={{
                                        height: myHeight(5), width: myHeight(5), borderRadius: myHeight(5),
                                        backgroundColor: '#00000008',
                                        // backgroundColor:myColors.background, 
                                        alignItems: 'center', justifyContent: 'center'
                                    }} >
                                        <Image style={{
                                            maxHeight: myHeight(4.2), maxWidth: myHeight(4.2),
                                            resizeMode: 'contain',
                                        }} source={item.image} />
                                    </View>

                                    <Spacer paddingEnd={myWidth(2)} />
                                    <Text
                                        style={[styles.textCommon, {
                                            fontSize: myFontSize.body2,
                                            fontFamily: myFonts.heading,
                                        }]}>{item.name}</Text>
                                    <Spacer paddingEnd={myWidth(2.7)} />

                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>

                </View>

                <Spacer paddingT={myHeight(3)} />
                {/* New Arrival  Complete*/}
                <View>
                    {/* New Arrivals*/}
                    <View style={{ paddingHorizontal: myWidth(4), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.textCommon, {
                            fontSize: myFontSize.xxBody,
                            fontFamily: myFonts.bodyBold,
                        }]}>New Arrivals</Text>

                        {/* See all */}
                        <TouchableOpacity style={{
                            flexDirection: 'row', alignItems: 'center', paddingVertical: myHeight(0.4),
                            paddingStart: myWidth(2)
                        }} activeOpacity={0.6} onPress={() => navigation.navigate('RestaurantAll', { name: 'New Arrivals', restaurants: Restaurants })}>

                            <Text
                                style={[styles.textCommon, {
                                    fontSize: myFontSize.body2,
                                    fontFamily: myFonts.bodyBold,
                                    color: myColors.primaryT
                                }]}>See All</Text>
                            <Image style={{
                                height: myHeight(1.5), width: myHeight(1.5), marginStart: myWidth(1),
                                resizeMode: 'contain', tintColor: myColors.primaryT
                            }} source={require('../assets/home_main/home/go.png')} />
                        </TouchableOpacity>
                    </View>

                    <Spacer paddingT={myHeight(1.3)} />
                    {/* Restuarant */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: myWidth(4) }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            {Restaurants.map((item, i) =>
                                <TouchableOpacity key={i} activeOpacity={0.95}
                                    onPress={() => navigation.navigate('RestaurantDetail', { item })} >
                                    <RestaurantInfo restaurant={item} />
                                </TouchableOpacity>
                            )}
                        </View>

                    </ScrollView>
                </View>

                <Spacer paddingT={myHeight(3)} />
                {/*Nearby Restaurants  Complete*/}
                <View>
                    {/* Nearby Restaurants*/}
                    <View style={{ paddingHorizontal: myWidth(4), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.textCommon, {
                            fontSize: myFontSize.xxBody,
                            fontFamily: myFonts.bodyBold,
                        }]}>Nearby Restaurants</Text>

                        <TouchableOpacity style={{
                            flexDirection: 'row', alignItems: 'center', paddingVertical: myHeight(0.4),
                            paddingStart: myWidth(2)
                        }} activeOpacity={0.6} onPress={() => navigation.navigate('RestaurantAll', { name: 'Nearby Restaurants', restaurants: Restaurants })}>

                            <Text
                                style={[styles.textCommon, {
                                    fontSize: myFontSize.body2,
                                    fontFamily: myFonts.bodyBold,
                                    color: myColors.primaryT
                                }]}>See All</Text>
                            <Image style={{
                                height: myHeight(1.5), width: myHeight(1.5), marginStart: myWidth(1),
                                resizeMode: 'contain', tintColor: myColors.primaryT
                            }} source={require('../assets/home_main/home/go.png')} />
                        </TouchableOpacity>
                    </View>

                    <Spacer paddingT={myHeight(1.3)} />
                    {/* Restuarant */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: myWidth(4) }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            {Restaurants.map((item, i) =>
                                <TouchableOpacity key={i} activeOpacity={0.95}
                                    onPress={() => navigation.navigate('RestaurantDetail', { item })} >
                                    <RestaurantInfo restaurant={item} />
                                </TouchableOpacity>
                            )}
                        </View>

                    </ScrollView>
                </View>


                <Spacer paddingT={myHeight(4)} />
            </ScrollView>

        </SafeAreaView>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.background
    },


    //Text
    textCommon: {
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
    },

})