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
import database from '@react-native-firebase/database';

export const Home = ({ navigation, route }) => {
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const [ID, SetID] = useState(null)
    const { mute } = useSelector(state => state.GameStates)
    const dispatch = useDispatch()
    const appState = useRef(AppState.currentState);

    function Yes() {

        database()
            .ref(`/game/playing`)
            // .orderByKey()
            .once('value')
            .then(snapshot => {
                let s = 0
                let found = null
                let deleted = []
                snapshot.forEach(documentSnapshot1 => {
                    const order = documentSnapshot1.val()
                    const s1 = new Date(order.active)
                    const s2 = new Date().toUTCString()
                    const s3 = new Date(s2)
                    const time = (((s3 - s1) / 1000) / 60).toFixed(2)
                    console.log(time)

                    if (time > 2) {

                        deleted.push(documentSnapshot1.key)
                        return
                    }

                    // if (found) {
                    //   return
                    // }

                    if (order.player1) {
                        s += 1

                    }
                    // console.log(order.player2, time, found)
                    if (order.player2) {
                        s += 1
                        return
                    }

                    if (!order.player2 && time < 0.5 && !found) {
                        found = documentSnapshot1.key
                        return

                    }

                });
                console.log('Players Online', s)
                console.log('Player Game', found)
                console.log('Deleted Game', deleted)

                if (found) {
                    const s = new Date().toUTCString()

                    database()
                        .ref(`/game/playing`).child(found).update({
                            player2: 'Rafay2',
                            active: s,
                        }).then(() => {
                            navigation.navigate('Game', { gameID: found, myPlayer: 1 })

                        })
                }
                else {
                    const i = getDateInt(new Date())
                    const s = new Date().toUTCString()
                    database()
                        .ref(`/game/playing`).child(i)
                        .set({
                            player1: 'Rafay',
                            active: s,
                        }).then(() => {
                            SetID(i)
                            // navigation.navigate('Game', { gameID: i, myPlayer: 0 })

                            console.log('Han Naya Game')

                        })
                        .catch((er) => {
                            console.log('Error on  Naya Game', er)

                        })
                }

                deleted.map(val => {
                    database()
                        .ref(`/game/playing`).child(val).remove()
                })

            })
            .catch((er) => {
                console.log('Error on set order', er)

            });

    }
    function getDateInt(date) {
        const adjustSting = function (string, size) {
            const len = string.length
            let myStr = ''
            for (let i = 0; i < size - len; i++) {
                myStr += '0'
            }
            return (myStr + string)

        }
        const randomcode = Math.floor(Math.random() * 899999 + 100000)

        const year = adjustSting(date.getUTCFullYear().toString(), 2)
        const month = adjustSting(date.getUTCMonth().toString(), 2)
        const day = adjustSting(date.getUTCDate().toString(), 2)
        const hours = adjustSting(date.getUTCHours().toString(), 2)
        const minutes = adjustSting(date.getUTCMinutes().toString(), 2)
        const seconds = adjustSting(date.getUTCSeconds().toString(), 2)
        const mili = adjustSting(date.getUTCMilliseconds().toString(), 3)
        const code = year + month + day + hours + minutes + seconds + mili + randomcode

        return code


    }

    useEffect(() => {

        if (ID) {
            database()
                .ref(`/game/playing`).child(ID).on('value', snapshot => {
                    const s = snapshot.val()
                    // console.log('User data: ', );
                    if (s.player2) {
                        navigation.navigate('Game', { gameID: ID, myPlayer: 0 })
                    }
                });
        }
    }, [ID])

    useEffect(() => {
        // Yes()

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
        Yes()
        // setTimeout(() => {
        //     navigation.navigate('Game', { playerCount: [0, 0], startPlayer: 0 })

        // }, 40)


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
                        style={{ height: myWidth(88) / 2.22, width: myWidth(88), justifyContent: 'center', alignSelf: 'center' }}
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

            {
                <View style={{
                    position: 'absolute',
                    zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    height: '100%', width: '100%', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ImageBackground
                        style={{ height: myWidth(95) / 1.3, width: myWidth(95), justifyContent: 'center', alignSelf: 'center' }}
                        source={require('../assets/board3.png')} resizeMode='contain'
                    >
                        <View style={{
                            height: '100%',
                            width: '100%',
                            flexDirection: 'row', paddingHorizontal: myWidth(2.5),
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                width: myWidth(35), alignItems: 'center',
                                transform: [{ translateX: 50 }]
                                // marginStart: myWidth(2.5),
                                // backgroundColor: 'red'
                            }}>
                                <Spacer paddingT={myWidth(12)} />
                                <Image style={{ width: myWidth(28), height: myWidth(28) }}
                                    source={require('../assets/bluee.png')} />
                                <Spacer paddingT={myWidth(2)} />

                                <Text numberOfLines={2} style={[styles.textCommon, {
                                    fontFamily: myFonts.headingBold,
                                    fontSize: myFontSize.xMedium,
                                    color: myColors.woodD,
                                    textAlign: 'center',
                                    width: '100%',
                                    // backgroundColor: 'red'


                                }]}>Rafay1</Text>
                            </View>
                            <View style={{
                                width: myWidth(20),
                                alignItems: 'center',
                                marginTop: myWidth(25)
                                // justifyContent: 'center'
                                // backgroundColor: 'black'
                            }}>

                                <MyDoubleText fontSize={myFontSize.large} text='VS' frontColor={myColors.wood} />
                            </View>

                            <View style={{
                                width: myWidth(35), alignItems: 'center',
                                // marginStart: myWidth(2.5),
                                // backgroundColor: 'red'
                            }}>
                                <Spacer paddingT={myWidth(12)} />
                                <Image style={{ width: myWidth(28), height: myWidth(28) }}
                                    source={require('../assets/redd.png')} />
                                <Spacer paddingT={myWidth(2)} />

                                <Text numberOfLines={2} style={[styles.textCommon, {
                                    fontFamily: myFonts.headingBold,
                                    fontSize: myFontSize.xMedium,
                                    color: myColors.woodD,
                                    textAlign: 'center',
                                    width: '100%',
                                    // backgroundColor: 'red'


                                }]}>Rafay2</Text>
                            </View>


                        </View>


                    </ImageBackground>
                </View>
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