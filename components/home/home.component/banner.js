import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Spacer, myHeight, myWidth } from "../../../game/common"
import { myFontSize, myFonts, myLetSpacing } from "../../../ultils/myFonts"
import { myColors } from "../../../ultils/myColors"
import { offers } from "../home_data";
import LinearGradient from "react-native-linear-gradient";

export const Banners = () => {
    const [i, setI] = useState(0)
    const dotArr = []
    const offerWidthSScroll = myWidth(95)
    const lenOffers = Object.keys(offers).length

    // Loop for dots
    for (let j = 0; j < lenOffers; j++) {
        dotArr.push(<View key={j} style={[{
            height: myHeight(1), width: j == i ? myHeight(1.5) : myHeight(1),
            margin: 3, borderRadius: myHeight(0.8),
            backgroundColor: j == i ? myColors.primary : myColors.dot,
        }]} />)
    }

    //Offer Scroll
    function handleScroll(event) {
        const a = (event.nativeEvent.contentOffset.x) / offerWidthSScroll
        let b = Math.round(a)
        if (i != b && b < lenOffers) {
            setI(b)
        }
    }

    return (
        <View>
            <ScrollView
                onScroll={handleScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1, justifyContent: 'center',
                    paddingHorizontal: myWidth(5)
                }}
                pagingEnabled
                snapToInterval={offerWidthSScroll}
                scrollEventThrottle={1}
            >
                {offers.map((item, i) =>
                    <View key={i} style={{ flex: 1 }}>
                        {/* Offers */}
                        <LinearGradient
                            colors={item.colors}
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                width: myWidth(90), height: myHeight(20),
                                borderRadius: myHeight(5), backgroundColor: '#FFE1B4',
                                marginEnd: myWidth(5), elevation: 1, overflow: 'hidden'
                            }}
                            // for horizontal
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {/* Content Offers */}
                            <View style={{ maxWidth: '45%', paddingStart: '7.1%', justifyContent: 'center' }}>

                                <Text style={{
                                    fontFamily: myFonts.headingBold, fontSize: myFontSize.xBody, color: myColors.background,
                                }}>{item.title}</Text>

                                <Text numberOfLines={2} style={{
                                    fontFamily: myFonts.heading, fontSize: myFontSize.small, color: myColors.background,
                                }}>{item.des}</Text>

                                <Spacer paddingT={myHeight(1)} />
                                {/* Order */}
                                <TouchableOpacity activeOpacity={0.8}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => null}>
                                    <Text style={{
                                        fontFamily: myFonts.headingBold, fontSize: myFontSize.small3, color: myColors.background,
                                    }}>Details <Image style={{
                                        height: myHeight(1), width: myHeight(1), resizeMode: 'contain', tintColor: myColors.background
                                    }} source={require('../../assets/home_main/home/go.png')} /></Text>
                                </TouchableOpacity>
                            </View>

                            {/* Image Offers */}
                            <Image style={{
                                maxWidth: '55%', maxHeight: '100%', justifyContent: 'flex-end',
                                resizeMode: 'contain',
                            }} source={item.image} />
                        </LinearGradient>

                    </View>
                )
                }
            </ScrollView>
            <Spacer paddingT={myHeight(1.6)} />
            {/*Dots */}
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {dotArr}
            </View>
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
