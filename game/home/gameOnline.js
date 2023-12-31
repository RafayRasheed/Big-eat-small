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
import { MyButton, YesNoModal, playSound } from '../component/components';
import { initialMockInLines, initialMockInLines2, player0Mocks, player0Mocks2, player1Mocks, player1Mocks2 } from './data';
import SoundPlayer from 'react-native-sound-player';
import { useFocusEffect } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const ratio = myHeight(100) / myWidth(100)
// const lineContainerSize = RFValue(250)
const fullWidth = myWidth(100)
const timePerChal = 10000
const lineContainerSize = myWidth(37) * ratio
const lineWidthSize = lineContainerSize / 20
const boxSize = (lineContainerSize - (lineWidthSize * 2)) / 3
const mockSizes = [boxSize / 1.75, boxSize / 1.38, boxSize / 1.05]

function winnerStayles(styleData) {
    const code = styleData.code
    const num = styleData.num
    if (code == 'D1') {
        return {
            width: lineWidthSize, height: lineContainerSize,
            left: (lineContainerSize / 2) - lineWidthSize / 2,
            top: 0,
            right: 0,
            transform: [{ rotate: '-45deg' }]
        }
    }
    if (code == 'D2') {
        return {
            width: lineWidthSize, height: lineContainerSize,
            left: (lineContainerSize / 2) - lineWidthSize / 2,
            top: 0,
            right: 0,
            transform: [{ rotate: '45deg' }]
        }
    }
    if (code == 'H') {
        return {
            width: lineContainerSize, height: lineWidthSize,
            left: 0,
            top: (boxSize / 2) - (lineWidthSize / 2) + ((boxSize + lineWidthSize) * num),
            right: 0,
            transform: [{ rotate: '0deg' }]
        }
    }
    if (code == 'V') {
        return {
            width: lineWidthSize, height: lineContainerSize,
            left: (boxSize / 2) - (lineWidthSize / 2) + ((boxSize + lineWidthSize) * num),
            top: 0,
            right: 0,
            transform: [{ rotate: '0deg' }]
        }
    }

}
const Lines = ({ deg = '0deg' }) => {
    const SingleLine = () => (
        <LinearGradient colors={['#e3b727', '#e6be3e', '#ebc754']}
            style={{
                width: lineWidthSize, height: lineContainerSize,
                borderRadius: 1000,
                borderWidth: 1, elevation: 6,
                //  overflow: 'hidden'
            }} />
    )
    return (
        <View style={{
            flexDirection: 'row', width: '100%', height: '100%', position: 'absolute',
            justifyContent: 'center', transform: [{ rotate: deg }]
        }}>
            <SingleLine />
            <Spacer paddingEnd={boxSize} />
            <SingleLine />
        </View>
    )
}


function generateMockInLines() {
    let iniMock = []
    let ini0 = []
    let ini1 = []
    let count = 0
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            count += 1
            const id = x.toString() + y.toString()
            const idM1 = '0' + count.toString()
            const idM2 = '1' + count.toString()
            const l = {
                id,
                player: null,
                size: null,
                posX: x,
                posY: y,
            }
            const m1 = { id: idM1, player: 0, show: true, size: x }
            const m2 = { id: idM2, player: 1, show: true, size: x }
            iniMock.push(l)
            ini0.push(m1)
            ini1.push(m2)
        }
    }
    return { iniMock, ini0, ini1 }
}

export const GameOnline = ({ navigation, route }) => {
    const { gameID = null, myPlayer = null } = route.params
    const [change, setChange] = useState(false)

    const [mockInLines, setMockInLines] = useState([])
    const [playerZeroMocks, setPlayerZeroMocks] = useState([])
    const [playerOneMocks, setPlayerOneMocks] = useState([])
    const [current, setCurrent] = useState(null)
    const [lastPlayer, setLastPlayer] = useState(0)

    const [playerCount, setPlayerCount] = useState([0, 0])
    const [isWinner, setIsWinner] = useState(false)

    const [winnerModal, setShowWinnerModal] = useState(false)
    const [activePlayer, setActivePlayer] = useState(lastPlayer)
    const [showYesNoModal, setShowYesNoModal] = useState(false)

    const TimeLine0 = useSharedValue(0);
    const TimeLine1 = useSharedValue(0);
    const TimeLine0Style = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: -TimeLine0.value }],
        };
    });
    const TimeLine1Style = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: -TimeLine1.value }],
        };
    });
    function updateData(data) {
        // const s = new Date().toUTCString()
        const dataU = data ? data : { mockInLines, playerZeroMocks, playerOneMocks, current, lastPlayer, playerCount, winnerModal, activePlayer }
        dataU.updateBy = myPlayer
        database()
            .ref(`/game/playing`).child(gameID).child('game')
            .update(dataU)
    }
    useEffect(() => {


        PlayersTimer(activePlayer)

    }, [activePlayer])

    function PlayersTimer(activePlayer) {
        TimeLine0.value = 0
        TimeLine1.value = 0
        if (activePlayer == 1) {
            TimeLine1.value = withTiming(fullWidth, { duration: timePerChal })
            setTimeout(() => {
                setActivePlayer(0)
                // Alert.alert('Timeout 1')
            }, timePerChal)
        }
        else {
            TimeLine0.value = withTiming(fullWidth, { duration: timePerChal })
            setTimeout(() => {
                setActivePlayer(1)

                // Alert.alert('Timeout 0')
            }, timePerChal)
        }
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
    const onBackPress = () => {
        if (showYesNoModal) {
            setShowYesNoModal(false)

            return true

        }
        setShowYesNoModal(true)
        return true
    };
    function onCancel() {
        playSound('click')

        setShowYesNoModal(false)
    }
    function onOK() {
        // Alert.alert('sdg')
        // playSound('click')

        onExit()

    }




    useEffect(() => {
        playSound('click')

        const { iniMock, ini0, ini1 } = generateMockInLines()
        setMockInLines(iniMock)
        setPlayerZeroMocks(ini0)
        setPlayerOneMocks(ini1)

        const onValueChange = database().ref(`/game/playing`).child(gameID).child('game').on('value', snapshot => {
            if (snapshot.val()) {

                const game = snapshot.val()
                // const game = val.game

                if (game.updateBy != myPlayer) {


                    const { mockInLines, playerZeroMocks, playerOneMocks, current,
                        lastPlayer, playerCount, winnerModal, isWinner,
                        activePlayer } = game


                    setMockInLines([...mockInLines])
                    setPlayerZeroMocks([...playerZeroMocks])
                    setPlayerOneMocks([...playerOneMocks])
                    setCurrent(current ? current : null)
                    setLastPlayer(lastPlayer)
                    setPlayerCount(playerCount)
                    setIsWinner(isWinner)
                    setActivePlayer(activePlayer)
                }

            }


            else {
                const data = { current, lastPlayer, playerCount, winnerModal, activePlayer, isWinner }
                data.mockInLines = iniMock
                data.playerZeroMocks = ini0
                data.playerOneMocks = ini1

                console.log('new')
                database()
                    .ref(`/game/playing`).child(gameID).update({
                        game: data
                    })
                updateData(data)
            }

        })

        return () => {
            database().ref(`/game/playing`).child(gameID).child('game').off('value', onValueChange)
        }


    }, [])

    useEffect(() => {

        if (isWinner != false) {
            handleWinner()
        }
        else {
            setShowWinnerModal(false)
        }
    }, [isWinner])
    function handleWinner() {
        if (isWinner == null) {
            setTimeout(() => {
                playSound('game')

            }, 100)
            setLastPlayer(lastPlayer == 0 ? 1 : 0)

        }
        else {
            setTimeout(() => {

                if (isWinner.player == myPlayer) {

                    playSound('win')
                }
                else {
                    playSound('game')

                }
            }, 100)
            setLastPlayer(isWinner.player)

        }
        setTimeout(() => {
            setShowWinnerModal(true)
            // navigation.replace('Winner', { playerCount, startPlayer: 1 })

            // Alert.alert('show modal')
        }, 1000)
    }
    function refresh() {
        const { iniMock, ini0, ini1 } = generateMockInLines()

        setMockInLines(iniMock)
        setPlayerZeroMocks(ini0)
        setPlayerOneMocks(ini1)
        setCurrent(null)
        setActivePlayer(lastPlayer)
        setIsWinner(false)
        setShowWinnerModal(false)
        setChange(!change)

        const up = {
            mockInLines: [...iniMock],
            playerZeroMocks: [...ini0],
            playerOneMocks: [...ini1],
            current: null,
            activePlayer: lastPlayer,
            isWinner: false,

        }
        updateData(up)


    }

    function checkWinner(player, data) {
        let winner = { player: null, pos: [], style: {} }
        let isWimmer = false
        const d1 = ['00', '11', '22']
        let d1C = 0
        let d2C = 0
        const d2 = ['02', '11', '20']
        // const x = { 0: [], 1: [], 2: [] }
        // const y = { 0: [], 1: [], 2: [] }
        const x = [[], [], []]
        const y = [[], [], []]

        let allCount = 0

        // const player = 1
        // const data = [
        //     { player: 1, id: '00', posX: 0, posY: 0 }, { player: 1, id: '01', posX: 0, posY: 1 }, { player: 0, id: '02', posX: 0, posY: 2 },
        //     { player: 1, id: '10', posX: 1, posY: 0 }, { player: 0, id: '11', posX: 1, posY: 1 }, { player: 1, id: '12', posX: 1, posY: 2 },
        //     { player: 1, id: '20', posX: 2, posY: 0 }, { player: 1, id: '21', posX: 2, posY: 1 }, { player: 0, id: '22', posX: 2, posY: 2 },
        // ]

        data.map((item, i) => {
            if (item.player == player) {
                // for Diagonal 1
                if (d1.findIndex(it => it == item.id) != -1) {
                    d1C += 1
                }

                // for Diagonal 2
                if (d2.findIndex(it => it == item.id) != -1) {
                    d2C += 1
                }

                //for horizontal
                x[item.posX] = [...x[item.posX], item.id]

                //for vertical
                y[item.posY] = [...y[item.posY], item.id]

            }
            if (item.player != null) {
                allCount += 1
            }
        })
        // Check Diagonal 1
        if (d1C == 3) {
            winner.player = player
            winner.pos = d1
            isWimmer = true
            winner.styleData = {
                code: 'D1'
            }
            winner.style = {
                width: lineWidthSize, height: lineContainerSize,
                left: (lineContainerSize / 2) - lineWidthSize / 2,
                top: 0,
                right: 0,
                transform: [{ rotate: '-45deg' }]
            }
        }

        // Check Diagonal 2
        if (d2C == 3 && !isWimmer) {
            winner.player = player
            winner.pos = d2
            isWimmer = true
            winner.styleData = {
                code: 'D2'
            }
            winner.style = {
                width: lineWidthSize, height: lineContainerSize,
                left: (lineContainerSize / 2) - lineWidthSize / 2,
                top: 0,
                right: 0,
                transform: [{ rotate: '45deg' }]
            }
        }

        // Check Horizontal
        x.map((xx, i) => {
            if (xx.length >= 3 && !isWimmer) {
                winner.player = player
                winner.pos = xx
                isWimmer = true
                winner.styleData = {
                    code: 'H',
                    num: i
                }
                winner.style = {
                    width: lineContainerSize, height: lineWidthSize,
                    left: 0,
                    top: (boxSize / 2) - (lineWidthSize / 2) + ((boxSize + lineWidthSize) * i),
                    right: 0,
                    transform: [{ rotate: '0deg' }]
                }
            }
        })

        // Check Vertical
        y.map((yy, i) => {
            if (yy.length >= 3 && !isWimmer) {
                winner.player = player
                winner.pos = yy
                isWimmer = true
                winner.styleData = {
                    code: 'V',
                    num: i
                }
                winner.style = {
                    width: lineWidthSize, height: lineContainerSize,
                    left: (boxSize / 2) - (lineWidthSize / 2) + ((boxSize + lineWidthSize) * i),
                    top: 0,
                    right: 0,
                    transform: [{ rotate: '0deg' }]
                }
            }
        })
        if (isWimmer) {
            return winner
        }
        else if (allCount == 9) {
            return winner
        }
        else {
            return false
        }
    }
    function isMorePlay(CheckPlayer, maxSize, newArray) {
        let morePlay = false
        newArray.map(({ player, size }) => {
            if (player == CheckPlayer && size < maxSize) {
                morePlay = true

            }
        })

        return morePlay
    }


    function addMock(item, index, player, size) {
        // let playerZero = []
        // let playerOne = []
        // const id = posX.toString() + posY.toString()
        let newUpdateData = {}
        const newItem = {
            ...item,
            player,
            size,
        }

        const newArray = [...mockInLines]
        newArray[index] = newItem
        if (myPlayer == 0) {
            const a = [...playerZeroMocks]
            const b = a[current.index]

            const c = {
                ...b,
                show: false
            }
            a[current.index] = c

            setPlayerZeroMocks(a)
            newUpdateData.playerZeroMocks = a

        }
        else {
            // const p1m = [...playerOneMocks]
            // p1m[current.index].show = false

            const a = [...playerOneMocks]
            const b = a[current.index]

            const c = {
                ...b,
                show: false
            }
            a[current.index] = c
            setPlayerOneMocks(a)
            newUpdateData.playerOneMocks = a

        }



        setMockInLines(newArray)

        setCurrent(null)
        newUpdateData.mockInLines = newArray
        newUpdateData.current = null
        const win = checkWinner(activePlayer, newArray)

        if (win && win.player != null) {
            playerCount[win.player] = playerCount[win.player] + 1
            setPlayerCount(playerCount)
            setIsWinner(win)
            newUpdateData.playerCount = playerCount
            newUpdateData.isWinner = win
            updateData(newUpdateData)
            return

        }

        let morePlay = true
        if (activePlayer == 0) {
            if (win) {
                let maxSize = 0
                playerOneMocks.map(({ show, size }) => {
                    if (show && maxSize < size) {
                        maxSize = size
                    }
                })

                morePlay = isMorePlay(0, maxSize, newArray)
            }
            if (morePlay) {
                setActivePlayer(1)
                newUpdateData.activePlayer = 1
            }
            else {
                setIsWinner(null)
                newUpdateData.isWinner = null
                updateData(newUpdateData)

                return
            }
        }
        else {
            if (win) {

                let maxSize = 0
                playerZeroMocks.map(({ show, size }) => {
                    if (show && maxSize < size) {
                        maxSize = size
                    }
                })

                morePlay = isMorePlay(1, maxSize, newArray)
            }

            if (morePlay) {
                setActivePlayer(0)
                newUpdateData.activePlayer = 0

            }
            else {
                setIsWinner(null)
                newUpdateData.isWinner = null
                updateData(newUpdateData)

                return
            }

        }
        playSound('place')
        setChange(!change)
        updateData(newUpdateData)


    }
    // 00 01 02
    // 00 10 20
    function onPlayAgain() {
        playSound('click')

        refresh()

    }

    function onExit() {
        playSound('click')
        setTimeout(() => {

            navigation.goBack()
        }, 0)
    }


    return (
        <>
            <ImageBackground
                style={{
                    flex: 1,
                    //  backgroundColor: 'yellow',
                    alignItems: 'center'
                }}
                source={require('../assets/background.jpg')} resizeMode='cover'
            >
                <StatusbarH />
                <View style={{ flex: 1, justifyContent: 'space-between', }}>
                    {/* Player 0 Portion */}
                    <View style={{
                        borderBottomWidth: myHeight(0.9),
                        // borderColor: activePlayer != myPlayer ? myColors.yellow1 : '#00000040',
                        borderColor: '#00000060',
                        paddingBottom: myHeight(1),

                        backgroundColor: activePlayer != myPlayer ? myColors.player1 + '30' : '#00000000',
                    }}>
                        <View style={{
                            flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end',
                            alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: myWidth(2),
                            // backgroundColor: 'red'
                        }}>

                            {
                                playerZeroMocks.map((mock, index) => {
                                    {/* const active = (0 == myPlayer) && (activePlayer == mock.player) && mock.show != false */ }
                                    const active = false
                                    const show = myPlayer == 0 ? playerOneMocks[index].show : mock.show

                                    return (
                                        <TouchableOpacity
                                            key={index} activeOpacity={active ? 0.7 : 1}
                                            style={{
                                                flexBasis: '16%', marginTop: myHeight(0.5),
                                                transform: [{ rotate: mock.id == current?.id ? '25deg' : '0deg' }]
                                            }} onPress={() => {
                                                if (active) {
                                                    const cu = (current && current?.id == mock.id) ? null : { ...mock, index }
                                                    setCurrent(cu)
                                                    updateData({ current: cu })
                                                } else if (activePlayer != mock.player && mock.show != false) {
                                                    playSound('wrong')
                                                }
                                            }}>
                                            <View style={{ width: mockSizes[mock.size] / 1.2, height: mockSizes[mock.size] / 1.2 }}>

                                                {show != false &&
                                                    <Image style={{ width: '100%', height: '100%' }}
                                                        source={require('../assets/redd.png')} />
                                                }
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <Animated.View
                            style={[{
                                height: myHeight(0.9),
                                bottom: -myHeight(0.9),
                                width: '100%', position: 'absolute',

                                backgroundColor: activePlayer != myPlayer ? myColors.player1 : 'transparent',
                            }, TimeLine0Style]}

                        />
                    </View>
                    <View style={{
                        width: lineContainerSize, height: lineContainerSize,
                        alignSelf: 'center',
                        // backgroundColor: 'blue'
                    }}>

                        <Lines deg='0deg' />
                        <Lines deg='90deg' />

                        {
                            mockInLines.map((item, index) => {
                                const isActive = current != null && (item.size == null || item.size < current?.size)

                                if (item.size != null) {

                                }
                                return (
                                    <TouchableOpacity activeOpacity={isActive ? 0.7 : 1}

                                        key={index} style={{
                                            backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center',
                                            width: boxSize, height: boxSize, position: 'absolute',
                                            top: ((boxSize + lineWidthSize) * item.posX), left: ((boxSize + lineWidthSize) * item.posY),
                                            // backgroundColor: 'red'

                                        }}
                                        onPress={() => {
                                            if (isActive) {
                                                addMock(item, index, current?.player, current?.size)

                                            }
                                            else {
                                                playSound('wrong')
                                            }

                                        }}
                                    >

                                        {
                                            item.size != null ?
                                                <Image style={{

                                                    width: mockSizes[item.size], height: mockSizes[item.size],


                                                }} source={item.player != myPlayer ? require('../assets/redd.png') : require('../assets/bluee.png')} />
                                                : <TouchableOpacity style={{
                                                    height: '0%', width: '0%',
                                                    backgroundColor: '#00000010'
                                                }} />

                                        }

                                    </TouchableOpacity>

                                )
                            })
                        }


                        {
                            isWinner &&

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={isWinner.player != myPlayer ? [myColors.player1, '#de645d', '#e88c87'] : [myColors.player2, '#5198d3', '#81c1f7']}
                                style={[winnerStayles(isWinner.styleData), {
                                    borderRadius: 1000, position: 'absolute',
                                    borderWidth: 0, elevation: 6, zIndex: 100,

                                    //  overflow: 'hidden'
                                }]} />
                        }
                    </View>
                    {/* Player 1 Portion */}
                    <View style={{
                        borderTopWidth: myHeight(0.9), paddingTop: myHeight(1),

                        borderColor: '#00000060',
                        // borderColor: activePlayer == myPlayer ? myColors.player2 : '#00000040',
                        backgroundColor: activePlayer == myPlayer ? myColors.player2 + '35' : '#00000000',

                    }}>
                        <View style={{
                            flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end',
                            alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: myWidth(2),
                            // backgroundColor: 'red'
                        }}>

                            {
                                playerOneMocks.map((mock, index) => {
                                    {/* const active = (activePlayer == myPlayer) && (activePlayer == mock.player) && mock.show != false */ }
                                    const show = myPlayer == 0 ? playerZeroMocks[index].show : mock.show
                                    const active = (activePlayer == myPlayer) && show != false

                                    return (
                                        <TouchableOpacity key={index} activeOpacity={active ? 0.7 : 1}
                                            style={{
                                                flexBasis: '16%', marginTop: myHeight(0.5),
                                                transform: [{ rotate: mock.id == current?.id ? '25deg' : '0deg' }]
                                            }} onPress={() => {
                                                if (active) {
                                                    // const cu = current ? null : { ...mock, index }
                                                    const s = {
                                                        ...mock,
                                                        player: myPlayer,
                                                        index,
                                                    }
                                                    const cu = (current && current?.id == mock.id) ? null : { ...s }
                                                    setCurrent(cu)
                                                    // updateData({ current: cu })

                                                } else if (activePlayer != mock.player && mock.show != false) {
                                                    playSound('wrong')
                                                }

                                            }}>
                                            <View style={{ width: mockSizes[mock.size] / 1.2, height: mockSizes[mock.size] / 1.2 }}>

                                                {show != false &&
                                                    <Image style={{ width: '100%', height: '100%' }}
                                                        source={require('../assets/bluee.png')} />
                                                }
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <Animated.View
                            style={[{
                                height: myHeight(0.9),
                                top: -myHeight(0.9),
                                width: '100%', position: 'absolute',

                                backgroundColor: activePlayer == myPlayer ? myColors.player2 : 'transparent',

                            }, TimeLine1Style]} />

                    </View>
                </View>

            </ImageBackground>

            {
                winnerModal &&

                <View style={{
                    position: 'absolute', height: '100%', width: '100%',
                    zIndex: 10,
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

                                    }} source={require('../assets/bluee.png')} />

                                <Spacer paddingT={myHeight(4)} />
                                <Text style={[styles.textCommon, {
                                    fontFamily: myFonts.heading,
                                    fontSize: myFontSize.large * 2.5,
                                    color: myColors.text
                                }]}>{playerCount[myPlayer]}</Text>
                            </View>

                            <Spacer paddingEnd={myWidth(8)} />
                            <View style={{ width: myWidth(38), alignItems: 'center' }}>

                                <Image
                                    style={{
                                        height: myWidth(38), width: myWidth(38),
                                        resizeMode: 'cover', transform: [{ rotate: '0deg' }]

                                    }} source={require('../assets/redd.png')} />

                                <Spacer paddingT={myHeight(4)} />
                                <Text style={[styles.textCommon, {
                                    fontFamily: myFonts.heading,
                                    fontSize: myFontSize.large * 2.5,
                                    color: 'black',
                                }]}>{playerCount[myPlayer == 0 ? 1 : 0]}</Text>
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

            }

            {
                showYesNoModal &&
                <YesNoModal yesFun={onOK} noFun={onCancel} text='Are You Sure You Want To Exit The Game' />
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