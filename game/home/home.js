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

export const Home = ({ navigation }) => {
    const [change, setChange] = useState(false)

    function OnStart() {
        navigation.navigate('Game')
    }

    return (
        <ImageBackground
            style={{ flex: 1, backgroundColor: 'yellow', paddingHorizontal: myWidth(4), alignItems: 'center', justifyContent: 'space-between' }}
            source={require('../assets/background2.png')} resizeMode='cover'
        >

            {/* <View>
                <Spacer paddingT={myHeight(4)} />
                <MyDoubleText text='Tic Tac Toe' frontColor={myColors.woodD} />
                <MyDoubleText text='Big Eat Small' frontColor={myColors.woodD} />

            </View> */}
            <View>
                <StatusbarH />
                <Spacer paddingT={myHeight(3)} />
                <ImageBackground
                    style={{ height: myWidth(82) / 2, width: myWidth(82), justifyContent: 'center', }}
                    source={require('../assets/board.png')} resizeMode='contain'
                >
                    <MyDoubleText text='Tic Tac Toe' frontColor={myColors.wood} />
                    <MyDoubleText text='Big Eat Small' frontColor={myColors.wood} />
                </ImageBackground>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{
                        height: myHeight(30), width: myHeight(30) * 1.84,
                        maxWidth: myWidth(96),
                        transform: [{ rotate: '0deg' }], resizeMode: 'contain',

                    }} source={require('../assets/check.png')} />
                <Spacer paddingT={myHeight(2.5)} />
                <MyButton text={'Start Game'} size={myWidth(50)} fun={OnStart} />

                {/* <TouchableOpacity activeOpacity={0.8} style={{
                    height: myWidth(50) / 3, width: myWidth(50),
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
                        width: '100%', textAlign: 'center',
                        textAlignVertical: 'center',
                        // b: - myWidth(50) / 3,
                        // backgroundColor: 'red',
                        position: 'absolute',
                        color: 'brown'
                    }]}>PLAY AGAIN</Text>
                </TouchableOpacity> */}

                <Spacer paddingT={myHeight(7)} />

            </View>
        </ImageBackground>
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