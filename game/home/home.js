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
import Animated, { BounceIn, BounceOut, FadeIn, FadeInDown, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux'
import { setMute } from '../../redux/states_reducer';
import { getMuteStorage } from '../storageFun';
import database from '@react-native-firebase/database';

export const Home = ({ navigation, route }) => {
    let inter = null
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const [findPlayerModal, setFindPlayerModal] = useState(false)
    const [foundOpenant, setFoundOpenant] = useState(false)
    // const [find, setFind] = useState(false)
    const [ID, SetID] = useState(null)
    const { mute } = useSelector(state => state.GameStates)
    const dispatch = useDispatch()
    const appState = useRef(AppState.currentState);
    const val = myWidth(90)
    const TranY = useSharedValue(-val);

    const TranYStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: TranY.value }],
        };
    });



    useEffect(() => {


        if (findPlayerModal) {
            // clearInterval(inter)

            //    const inter2 = setInterval(() => {
            //         // console.log(find)
            //         // if(v>-600){
            //         TranY.value = withTiming(-val, { duration: 0 })


            //         TranY.value = withTiming(val, { duration: 600 })

            //     }, 600)
            //     inter = inter2

        }



        return () => clearInterval(inter);

    }, [findPlayerModal])

    function goToGame(data, player) {
        SetID(null)
        setFoundOpenant({ name: data.player1 })
        findOpenant()
        playSound('place')
        setTimeout(() => {
            navigation.navigate('Game', { gameID: data.key, myPlayer: player })
            resetFindModal()
        }, 2500)
    }
    function findOpenant(data) {
        // console.log(inter)
        // clearInterval(inter)
        // const cc = TranY.value
        // const com = myWidth(80)
        // const t = (cc < -com || cc > com) ? 0 : 500

        TranY.value = withTiming(0, { duration: 600 })

        // TranY.value = withTiming(val, { duration: 600 })
        // setTimeout(() => {

        // TranY.value = withTiming(-val, { duration: 0 })
        // TranY.value = withTiming(0, { duration: 600 })
        // setTimeout(()=>{

        //     // setFindPlayerModal(false)
        // },1000)

        // }, t)

    }
    function Yes() {
        playSound('find')

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
                        found = { ...order, key: documentSnapshot1.key }
                        return

                    }

                });
                console.log('Players Online', s)
                console.log('Player Game', found)
                console.log('Deleted Game', deleted)

                if (found) {
                    const s = new Date().toUTCString()

                    database()
                        .ref('/game/playing').child(found.key).update({
                            player2: 'Rafay2',
                            active: s,
                        }).then(() => {
                            goToGame(found, 1)



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
        if (!ID) {

            return
        }

        const onValueChange = database()
            .ref(`/game/playing`).child(ID).on('value', snapshot => {
                const s = snapshot.val()
                // console.log('User data: ', );
                if (s && s.player2) {
                    const found = {
                        ...s,
                        key: ID
                    }

                    goToGame(found, 0)
                    // navigation.navigate('Game', { gameID: ID, myPlayer: 0 })
                }
            });
        return () => database().ref(`/game/playing`).child(ID).off('value', onValueChange);


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
        if (findPlayerModal) {
            if (foundOpenant) {
                return true

            }
            onLeave()
            return true

        }
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
        playSound('click')
        setFindPlayerModal(true)


        Yes()



    }
    function OnStartOffilne() {
        playSound('click')
        navigation.navigate('GameOffline')



    }
    function resetFindModal() {
        TranY.value = -val
        setFindPlayerModal(false)
        setFoundOpenant(false)
        stopMusic()

    }
    function onLeave() {
        resetFindModal()
        setFoundOpenant(false)
    }
    function onSound() {
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
                    <MyButton text={'Start Game'} size={myWidth(50)} fun={OnStartOffilne} />

                    <Spacer paddingT={myHeight(7)} />

                </View>
            </ImageBackground>
            {
                showYesNoModal &&
                <YesNoModal yesFun={onOK} noFun={onCancel} text='Are You Sure You Want To Exit' />
            }

            {
                findPlayerModal &&
                <View style={{
                    position: 'absolute',
                    zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    height: '100%', width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Animated.View entering={BounceIn.duration(400)} exiting={BounceOut.duration(100)}>

                        <ImageBackground
                            style={{ height: myWidth(95) / 1.3, overflow: 'hidden', width: myWidth(95), justifyContent: 'center', alignSelf: 'center' }}
                            source={require('../assets/board3.png')} resizeMode='contain'
                        >
                            <View style={{
                                width: '100%', height: myWidth(28.5),
                                alignItems: 'center', justifyContent: 'flex-end',
                                // backgroundColor:'red'
                            }}>

                                <MyDoubleText fontSize={myFontSize.medium3} text={foundOpenant ? '' : 'Finding...'} frontColor={myColors.wood} />
                            </View>
                            <View style={{
                                height: '100%',
                                width: '100%',
                                flexDirection: 'row', paddingHorizontal: myWidth(2.5),
                                justifyContent: 'space-between',
                                // overflow: 'hidden'
                                // backgroundColor:'yellow'
                            }}>
                                <Animated.View style={[{
                                    // overflow: 'hidden',
                                    marginVertical: myWidth(3),
                                },]}>

                                    <Animated.View style={[{
                                        width: myWidth(35), alignItems: 'center',
                                        // backgroundColor: 'red',

                                    },]}>
                                        {/* <Spacer paddingT={myWidth(10)} /> */}
                                        <Image style={{ width: myWidth(28), height: myWidth(28) }}
                                            source={require('../assets/bluee.png')} />
                                        <Spacer paddingT={myWidth(2)} />

                                        <Text numberOfLines={1 } style={[styles.textCommon, {
                                            fontFamily: myFonts.headingBold,
                                            fontSize: myFontSize.medium3,
                                            color: myColors.woodD,
                                            textAlign: 'center',
                                            width: '100%',
                                            height: '100%',

                                            // backgroundColor: 'red'


                                        }]}>Rafay</Text>
                                    </Animated.View>
                                </Animated.View>
                                <View style={{
                                    width: myWidth(20),
                                    alignItems: 'center',
                                    marginTop: myWidth(15)
                                    // justifyContent: 'center'
                                    // backgroundColor: 'black'
                                }}>

                                    <MyDoubleText fontSize={myFontSize.large} text='VS' frontColor={myColors.wood} />
                                </View>

                                <Animated.View style={[{
                                    // overflow: 'hidden',
                                    marginVertical: myWidth(3),
                                },]}>

                                    <Animated.View style={[{
                                        width: myWidth(35),
                                        alignItems: 'center',
                                        // backgroundColor: 'blue',

                                    }, TranYStyle]}>


                                        {/* <Spacer paddingT={myWidth(10)} /> */}
                                        <Image style={{ width: myWidth(28), height: myWidth(28) }}
                                            source={require('../assets/redd.png')} />
                                        <Spacer paddingT={myWidth(2)} />

                                        <Text numberOfLines={1} style={[styles.textCommon, {
                                            fontFamily: myFonts.headingBold,
                                            fontSize: myFontSize.medium3,
                                            color: myColors.woodD,
                                            textAlign: 'center',
                                            width: '100%',
                                            height: '100%',

                                            // flex:1,
                                            // backgroundColor: 'red'


                                        }]}>{foundOpenant ? foundOpenant.name : '......'}</Text>

                                    </Animated.View>

                                </Animated.View>


                            </View>


                        </ImageBackground>
                        <View style={{ alignItems: 'center', height: myWidth(15), marginTop: -myWidth(12) }}>
                            {
                                !foundOpenant &&

                                <MyButton text={'Leave'} size={myWidth(43)} fun={onLeave} />
                            }
                        </View>

                        {/* <Spacer paddingT={myHeight(2.5)} /> */}
                    </Animated.View>
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