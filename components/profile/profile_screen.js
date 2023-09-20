import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';


export const Profile = ({ navigation }) => {

    const Common = ({ navigate, iconSize, icon, tind = myColors.primaryT, name }) => (
        <View onPress={() => navigation.navigate(navigate)}
            style={{}}>
            <Spacer paddingT={myHeight(2.5)} />

            <View style={{ flexDirection: 'row', alignItems: 'center', }}
                activeOpacity={0.8} onPress={() => null}>

                <View style={{ width: myHeight(5), paddingStart: myWidth(0.5) }}>
                    <Image style={{
                        height: iconSize,
                        width: iconSize,
                        resizeMode: 'contain',
                        tintColor: myColors.primaryT
                    }} source={icon} />
                </View>

                {/* <Spacer paddingEnd={myWidth(4)} /> */}

                <Text numberOfLines={1} style={[styles.textCommon, {
                    flex: 1,
                    fontSize: myFontSize.xBody2,
                    fontFamily: myFonts.bodyBold,
                }]}>{name}</Text>

                <Image style={{
                    height: myHeight(2),
                    width: myHeight(2),
                    resizeMode: 'contain',
                    marginTop: myHeight(0.4),
                    tintColor: myColors.offColor
                }} source={require('../assets/home_main/home/go.png')} />

            </View>
            <Spacer paddingT={myHeight(2.5)} />
        </View>
    )
    return (
        <>
            {/* <StatusBar backgroundColor={orderModal ? '#00000030' : myColors.background} /> */}
            <SafeAreaView style={{ flex: 1, backgroundColor: myColors.background }}>
                <StatusbarH />

                <Spacer paddingT={myHeight(2)} />
                {/* Pofile & Name */}
                <View style={{
                    flexDirection: 'row', paddingHorizontal: myWidth(4),
                    alignItems: 'center',
                }}>

                    {/* image */}
                    <View style={{
                        borderRadius: myWidth(100), overflow: 'hidden',
                        // backgroundColor: myColors.primaryL5, padding: myHeight(1.3),
                        // borderWidth: myWidth(0.1), borderColor: myColors.textL4, 
                    }}>
                        <Image source={require('../assets/profile/profile.png')}
                            style={{
                                width: myHeight(7.5),
                                height: myHeight(7.5),
                                resizeMode: 'contain',
                                // tintColor: myColors.primaryT
                            }}
                        />

                    </View>
                    <Spacer paddingEnd={myWidth(4)} />
                    {/* Name */}
                    <Text numberOfLines={1} style={[styles.textCommon, {
                        flex: 1,
                        fontSize: myFontSize.medium,
                        fontFamily: myFonts.heading,
                    }]}>Wali Muhammed</Text>
                </View>

                <Spacer paddingT={myHeight(2.5)} />

                <ScrollView bounces={false} contentContainerStyle={{ paddingHorizontal: myWidth(4), flexGrow: 1, }} >

                    {/* Profile */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => null}
                        style={{}}>
                        <Common icon={require('../assets/profile/user.png')} iconSize={myHeight(2.6)}
                            name={'Profile'} navigate={'ProfileDetails'}
                        />

                    </TouchableOpacity>
                    {/* Divider */}
                    <View style={{ borderTopWidth: myHeight(0.18), borderColor: myColors.dot, }} />



                    {/* Favourites */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Favourite')}
                        style={{}}>

                        <Common icon={require('../assets/home_main/home/heart.png')} iconSize={myHeight(2.6)}
                            name={'Favourites'} navigate={'Favourite'}
                        />
                    </TouchableOpacity>
                    {/* Divider */}
                    <View style={{ borderTopWidth: myHeight(0.18), borderColor: myColors.dot, }} />


                    <TouchableOpacity activeOpacity={0.7} onPress={() => null}
                        style={{}}>

                        {/* Notifications */}
                        <Common icon={require('../assets/profile/bellF.png')} iconSize={myHeight(2.8)}
                            name={'Notifications'} navigate={'Notification'}
                        />
                    </TouchableOpacity>
                    {/* Divider */}
                    <View style={{ borderTopWidth: myHeight(0.18), borderColor: myColors.dot, }} />


                    {/* Customer Support */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => null}
                        style={{}}>

                        <Common icon={require('../assets/profile/customer.png')} iconSize={myHeight(3.2)}
                            name={'Customer Support'} tind={null} navigate={''}
                        />
                    </TouchableOpacity>
                    {/* Divider */}
                    <View style={{ borderTopWidth: myHeight(0.18), borderColor: myColors.dot, }} />



                    {/* Share App */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => null}
                        style={{}}>

                        <Common icon={require('../assets/profile/share.png')} iconSize={myHeight(2.8)}
                            name={'Share App'} navigate={''}
                        />
                    </TouchableOpacity>
                    {/* Divider */}
                    <View style={{ borderTopWidth: myHeight(0.18), borderColor: myColors.dot, }} />




                    {/* Report a bug */}
                    {/* <Common icon={require('../assets/profile/bug.png')} iconSize={myHeight(3)}
                        name={'Report a bug'} navigate={''}
                    /> */}
                    {/* Divider */}
                    {/* <View style={{ borderTopWidth: myHeight(0.18), borderColor: myColors.dot, }} /> */}
                </ScrollView>

            </SafeAreaView>
        </>
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