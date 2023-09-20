import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Spacer, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const RestRating = ({ navigation, }) => {
    const [starI, setStarI] = useState(undefined)
    const [instruction, setInstruction] = useState(null)
    const starArr = []

    for (let i = 0; i < 5; i++) {
        starArr.push(
            <TouchableOpacity key={i} activeOpacity={0.9} style={{
                paddingHorizontal: myWidth(2.5)
            }} onPress={() => setStarI(i)}>
                <Image source={require('../assets/home_main/home/star.png')}
                    style={{
                        width: myWidth(8),
                        height: myWidth(8),
                        resizeMode: 'contain',
                        tintColor: starI >= i ? myColors.star : myColors.offColor
                    }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            position: 'absolute', height: '100%', width: '100%',
            zIndex: 500, backgroundColor: "#00000050",
        }}>
            <View style={{
                backgroundColor: myColors.background,
                flex: 1, marginHorizontal: myWidth(4),
                marginVertical: myHeight(2.5), borderRadius: myWidth(6)
            }}>


                <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{
                    alignItems: 'center', flexGrow: 1
                }}>
                    <Spacer paddingT={myHeight(3)} />

                    {/* loc */}
                    <Image style={{
                        height: myWidth(40),
                        width: myWidth(40),
                        borderRadius: myWidth(50),
                        // backgroundColor: myColors.background,
                        resizeMode: 'contain',
                    }} source={require('../assets/home_main/home/resI.jpg')} />

                    <Spacer paddingT={myHeight(3.5)} />
                    {/* Rate Your Meal */}
                    <Text numberOfLines={1} style={[styles.textCommon, {
                        fontSize: myFontSize.xBody,
                        fontFamily: myFonts.bodyBold,
                    }]}>Rate your meal from</Text>

                    <Spacer paddingT={myHeight(0.5)} />
                    {/* small line */}
                    <View style={{
                        width: '25%', borderTopWidth: myHeight(0.2),
                        borderColor: myColors.primaryT
                    }} />

                    <Spacer paddingT={myHeight(1.3)} />
                    {/* Rest Name */}
                    <Text numberOfLines={1} style={[styles.textCommon, {
                        fontSize: myFontSize.medium0,
                        fontFamily: myFonts.heading,
                    }]}>Burger's King</Text>


                    <Spacer paddingT={myHeight(4)} />

                    {/* Rating */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        {starArr}
                    </View>

                    <Spacer paddingT={myHeight(4)} />

                    <View style={{ width: '100%', }}>
                        <TextInput placeholder="Write your instructions"
                            multiline={true}
                            autoCorrect={false}
                            numberOfLines={2}
                            placeholderTextColor={myColors.offColor}
                            selectionColor={myColors.primary}
                            cursorColor={myColors.primaryT}
                            value={instruction} onChangeText={setInstruction}
                            style={{
                                height: myHeight(14),
                                textAlignVertical: 'top',
                                borderRadius: myWidth(2),
                                paddingBottom: ios ? myHeight(1.2) : myHeight(100) > 600 ? myHeight(0.8) : myHeight(0.1),
                                paddingTop: ios ? myHeight(1.4) : myHeight(100) > 600 ? myHeight(1.4) : myHeight(0.2),
                                fontSize: myFontSize.body,
                                color: myColors.text,
                                includeFontPadding: false,
                                fontFamily: myFonts.body,
                                marginHorizontal: myWidth(6),
                                paddingHorizontal: myWidth(3),
                                backgroundColor: myColors.divider,

                            }}
                        />
                    </View>
                    <Spacer paddingT={myHeight(2)} />

                    {/* Line */}
                    <View style={{
                        width: '100%', borderTopWidth: myHeight(0.25),
                        borderColor: myColors.divider
                    }} />

                    <Spacer paddingT={myHeight(0.7)} />

                    {/* Cash Payable & price */}
                    <View style={{
                        alignItems: 'center', flexDirection: 'row',
                        paddingHorizontal: myWidth(4)
                    }}>
                        <Text numberOfLines={1} style={[styles.textCommon, {
                            flex: 1,
                            fontSize: myFontSize.xBody,
                            fontFamily: myFonts.body,
                        }]}>Cash Payable</Text>
                        <Text numberOfLines={1} style={[styles.textCommon, {
                            fontSize: myFontSize.xBody,
                            fontFamily: myFonts.body,
                        }]}>$180</Text>
                    </View>
                </KeyboardAwareScrollView>
                {/* Ok button */}
                <TouchableOpacity activeOpacity={0.9} onPress={() => null}
                    style={{
                        backgroundColor: myColors.primaryT,
                        borderRadius: myHeight(0.8),
                        paddingVertical: myHeight(1.3),
                        marginVertical: myHeight(2.5),
                        marginHorizontal: myWidth(4),
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>

                    <Text style={[
                        styles.textCommon,
                        {
                            fontSize: myFontSize.body,
                            fontFamily: myFonts.bodyBold,
                            color: myColors.background,
                        }
                    ]}>Ok</Text>
                </TouchableOpacity>
            </View>

        </View>
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