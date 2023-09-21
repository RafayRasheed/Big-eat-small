import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView, Alert, BackHandler,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import LinearGradient from 'react-native-linear-gradient';
import { MyButton, MyDoubleText } from '../component/components';

export const Winner = ({ navigation, route }) => {
    const [change, setChange] = useState(false)
    const { title, playerCount, startPlayer } = route.params

    function onPlayAgain() {

        navigation.replace('Game', { playerCount, startPlayer })
    }

    function onExit() {

        navigation.replace('Home')
    }
    return (
        <View style={{
            flex: 1
        }}>


            <ImageBackground
                style={{
                    flex: 1, alignItems: 'center',
                    paddingHorizontal: myWidth(4),
                }}
                source={require('../assets/background.png')} resizeMode='cover'

            >
                <Spacer paddingT={myHeight(10)} />
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>

                    <View style={{ width: myWidth(38), alignItems: 'center' }}>
                        {/* <Text numberOfLines={1} style={[styles.textCommon, {
                        fontFamily: myFonts.headingBold,
                        fontSize: myFontSize.large * 1.2,
                        color: 'black',
                        width: '100%',
                        textAlign: 'center'
                    }]}>Player 1</Text>
                    <Spacer paddingT={myHeight(3)} /> */}
                        <Image
                            style={{
                                height: myWidth(38), width: myWidth(38),
                                resizeMode: 'cover', transform: [{ rotate: '0deg' }],

                            }} source={require('../assets/redd.png')} />

                        <Spacer paddingT={myHeight(4)} />
                        <Text style={[styles.textCommon, {
                            fontFamily: myFonts.heading,
                            fontSize: myFontSize.large * 2.5,
                            color: myColors.text
                        }]}>{playerCount[0]}</Text>
                    </View>

                    <Spacer paddingEnd={myWidth(8)} />
                    <View style={{ width: myWidth(38), alignItems: 'center' }}>
                        {/* <Text numberOfLines={1} style={[styles.textCommon, {
                        fontFamily: myFonts.headingBold,
                        fontSize: myFontSize.large * 1.2,
                        color: 'black',
                        width: '100%',
                        textAlign: 'center'
                    }]}>Player 1</Text>
                    <Spacer paddingT={myHeight(3)} /> */}
                        <Image
                            style={{
                                height: myWidth(38), width: myWidth(38),
                                resizeMode: 'cover', transform: [{ rotate: '0deg' }]

                            }} source={require('../assets/bluee.png')} />

                        <Spacer paddingT={myHeight(4)} />
                        <Text style={[styles.textCommon, {
                            fontFamily: myFonts.heading,
                            fontSize: myFontSize.large * 2.5,
                            color: 'black',
                        }]}>{playerCount[1]}</Text>
                    </View>
                </View>

                <Spacer paddingT={myHeight(5)} />
                <MyButton text={'Play Again'} size={myWidth(50)} fun={onPlayAgain} />
                <Spacer paddingT={myHeight(1.5)} />
                <MyButton text={'Exit'} size={myWidth(50)} fun={onExit} />

                {/* 
                <TouchableOpacity activeOpacity={0.8} style={{
                    height: myWidth(50) / 3, width: myWidth(50),
                    alignItems: 'center'
                }} onPress={() => {
                    BackHandler.exitApp();

                }}>
                    <Image
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain',

                        }} source={require('../assets/button.png')} />
                    <Text style={[styles.textCommon, {
                        fontFamily: myFonts.headingBold,
                        fontSize: myFontSize.medium2,
                        height: '100%',
                        width: myWidth(100), textAlign: 'center',
                        textAlignVertical: 'center',
                        // b: - myWidth(50) / 3,
                        // backgroundColor: 'transparent',
                        position: 'absolute',
                        color: 'brown'
                    }]}>PLAY AGAIN</Text>
                </TouchableOpacity> */}
            </ImageBackground>
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