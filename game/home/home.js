import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView, Alert, BackHandler, AppState,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import {
    MyButton, MyButtonCircle, MyDoubleText,
    YesNoModal, playBackground, playSound, stopMusic
} from '../component/components';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux'
import { setMute } from '../../redux/states_reducer';
import { getMuteStorage } from '../storageFun';

export const Home = ({ navigation, route }) => {
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const { mute } = useSelector(state => state.GameStates)
    const dispatch = useDispatch()
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {


            appState.current = nextAppState;

            if (appState.current == 'active') {
                const s = getMuteStorage()
                dispatch(setMute(s))
                canPlayMusic()
            } else {

                stopMusic()

            }

        });

        return () => {
            subscription.remove();
        };
    }, []);


    useEffect(() => {
        canPlayMusic()
    }, []);

    function canPlayMusic() {
        if (!mute) {
            playBackground()

        }
    }
    const onBackPress = () => {
        if (showYesNoModal) {
            setShowYesNoModal(false)

            return true

        }
        setShowYesNoModal(true)
        return true
    };
    function onCancel() {

        // playSound('click')
        // playBackground()
        setShowYesNoModal(false)
    }
    function onOK() {
        playSound('click')

        BackHandler.exitApp()

    }

    function OnStart() {
        // navigation.navigate('Game')
        playSound('click')

        setTimeout(() => {
            navigation.navigate('Game', { playerCount: [0, 0], startPlayer: 0 })

        }, 40)


    }
    function onSound() {
        // navigation.navigate('Game')
        if (mute) {
            dispatch(setMute(false))
            playBackground()
        }
        else {
            dispatch(setMute(true))
            stopMusic()
        }


    }
    function onHelp() {

    }


    useFocusEffect(
        React.useCallback(() => {

            BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
            );
            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }, [showYesNoModal])
    );
    return (
        <>

            <ImageBackground
                style={{
                    flex: 1,
                    // backgroundColor: 'brown',
                    paddingHorizontal: myWidth(4),
                    alignItems: 'center', justifyContent: 'space-between',
                }}
                source={require('../assets/background2.png')} resizeMode='cover'
            >


                <View style={{ width: '100%' }}>
                    <StatusbarH />
                    <Spacer paddingT={myHeight(1)} />

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                        paddingHorizontal: myWidth(1)
                    }}>
                        <MyButtonCircle size={myHeight(7.5)} fun={onHelp} imageSize={myHeight(4)}
                            image={require('../assets/rule.png')}
                        />
                        <MyButtonCircle size={myHeight(7.5)} fun={onSound} imageSize={myHeight(4)}
                            image={mute ? require('../assets/mute.png') : require('../assets/sound.png')}
                        />
                    </View>
                    <Spacer paddingT={myHeight(2)} />
                    <ImageBackground
                        style={{ height: myWidth(88) / 2, width: myWidth(88), justifyContent: 'center', alignSelf: 'center' }}
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

                    <Spacer paddingT={myHeight(7)} />

                </View>
            </ImageBackground>
            {
                showYesNoModal &&
                <YesNoModal yesFun={onOK} noFun={onCancel} text='Are You Sure You Want To Exit' />
            }

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