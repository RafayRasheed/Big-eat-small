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
import { minimax } from './checking';
import { current } from '@reduxjs/toolkit';
import { minimax2, printPlayer0 } from './checking2';
import { checkWinEasy, minimaxEasy } from './checkingEasy';

const lineContainerSize = myWidth(75)
const lineWidthSize = lineContainerSize / 20
const boxSize = (lineContainerSize - (lineWidthSize * 2)) / 3
const mockSizes = [boxSize / 1.75, boxSize / 1.38, boxSize / 1.05]

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


export const Game = ({ navigation }) => {
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
    const [start, setStart] = useState(false)
    // let dummyBoard2 = dummyBoard

    useEffect(() => {
        if (activePlayer == 0 && start) {
            BotPlay()
            // setChange(!change)
        }

    }, [activePlayer, start])
    function goPlayBot(s) {


        let tt = {
            ...playerZeroMocks[s.indexMock],
            index: s.indexMock
        }

        let ind = s.index
        const item = mockInLines[ind]
        // playerZeroMocks.map((mock, index) => {
        //     if (mock.show) {
        //         tt = { ...mock, index }
        //     }
        // })
        setCurrent(tt)

        setTimeout(() => {
            addMock(item, ind, tt)
        }, 0)
    }
    function BotPlayEasy() {

        let p0Mock = []
        playerZeroMocks.map((p, index) => {
            if (p.show && p0Mock.findIndex(it => it.size == p.size) == -1) {
                p0Mock.push({ size: p.size, index })
            }

        })
        let singleResult = {}
        console.log('------------------------------------------')
        console.log('------------------------------------------')
        p0Mock.map((it) => {
            const mySize = it.size
            let mo2 = []

            mockInLines.map((it, i) => {
                const { player, size } = it
                if (player == 1 && size < mySize) {
                    mo2.push({ player: null, size: null })

                }
                else {

                    mo2.push({ player, size })
                }
            })

            const s = minimaxEasy(mo2, 0, -10000, 10000, 0,)
            if (singleResult.score) {

                if (s.score < singleResult.score) {
                    singleResult = {
                        ...s,
                        indexMock: it.index,
                        size: mySize,

                    }
                }
            }
            else {
                singleResult = {
                    ...s,
                    indexMock: it.index,
                    size: mySize,
                }
            }
            console.log(singleResult)
        })

        goPlayBot(singleResult)

    }
    function BotPlayEasy2() {


        let p0Mock = []
        playerZeroMocks.map((p, index) => {
            if (p.show && p0Mock.findIndex(it => it.size == p.size) == -1) {
                p0Mock.push({ size: p.size, index })
            }

        })
        let singleResult = null
        let fixesResult = null
        let AllResult = []
        console.log('------------------------------------------', p0Mock)
        console.log('------------------------------------------')


        // p0Mock.map((it) =>
        for (j = 0; j < p0Mock.length; j++) {
            const it = p0Mock[j]
            const mySize = it.size
            let mo2 = []

            mockInLines.map((it, i) => {
                const { player, size } = it
                if (player == 1 && size < mySize) {
                    mo2.push({ player: null, size: null })

                }
                else {

                    mo2.push({ player, size })
                }
            })

            const s = minimaxEasy(mo2, 0, -10000, 10000, 0,)
            if (s.index == 0 || s.index) {

                singleResult = {
                    ...s,
                    indexMock: it.index,
                    size: mySize,

                }


                mo2[singleResult.index].player = 0
                mo2[singleResult.index].size = mySize
                const isBottWin = checkWinEasy(mo2, 0) ? true : false
                if (isBottWin) {
                    break
                }
                let mo3 = []

                mockInLines.map((it, i) => {
                    const { player, size } = it
                    if (i == singleResult.index) {
                        mo3.push({ player: 0, size: mySize })

                    }
                    else {

                        mo3.push({ player, size })
                    }
                })
                let isOpenantWin = false
                const s2 = minimaxEasy(mo3, 0, -10000, 10000, 1,)

                if (s2.index == 0 || s2.index) {


                    mo3[s2.index].player = 1
                    mo3[s2.index].size = mySize
                    isOpenantWin = checkWinEasy(mo3, 1) ? true : false
                    if (isOpenantWin == true) {
                        const it = p0Mock[p0Mock.length - 1]

                        fixesResult = {
                            ...singleResult,
                            index: s2.index,
                            indexMock: it.index,
                            size: it.size,
                        }
                    }

                    console.log('-------------', s2.index, singleResult.index, isOpenantWin)
                    // printPlayer0(mo3)
                    // console.log(singleResult, isOpenantWin, s2)

                }

                if (!isOpenantWin) {
                    if (singleResult.score || singleResult.score == 0) {
                        if (s.score < singleResult.score) {
                            singleResult = {
                                ...s,
                                indexMock: it.index,
                                size: mySize,

                            }
                        }
                    }
                    else {
                        singleResult = {
                            ...s,
                            indexMock: it.index,
                            size: mySize,
                        }
                    }
                }
            }
        }
        singleResult = fixesResult ? fixesResult : singleResult

        console.log(fixesResult)
        console.log('-------------', singleResult)
        goPlayBot(singleResult)

    }
    function BotPlay() {


        let p0Mock = []
        let player0Remaining = 0
        playerZeroMocks.map((p, index) => {
            if (p.show) {
                player0Remaining += 1
                const i2 = p0Mock.findIndex(it => it.size == p.size)
                if (i2 == -1) {
                    p0Mock.push({ size: p.size, index, count: 1 })

                } else {
                    p0Mock[i2].count = p0Mock[i2].count + 1
                }
            }

        })
        let singleResult = null
        let fixesResult = null
        let AllResult = []
        console.log('------------------------------------------',)
        console.log('------------------------------------------')

        if (player0Remaining == 9 && mockInLines[4].player==null) {
            fixesResult = {
                index: 4, indexMock: 8, score: -17, size: 2
            }
            goPlayBot(fixesResult)

            return
        }
        // p0Mock.map((it) =>
        for (j = 0; j < p0Mock.length; j++) {
            const it = p0Mock[j]
            const mySize = it.size
            let mo2 = []

            mockInLines.map((it, i) => {
                const { player, size } = it
                if (player == 1 && size < mySize) {
                    mo2.push({ player: null, size: null })

                }
                else {

                    mo2.push({ player, size })
                }
            })

            const s = minimaxEasy(mo2, 0, -10000, 10000, 0,)

            if (s.index == 0 || s.index) {

                singleResult = {
                    ...s,
                    indexMock: it.index,
                    size: mySize,

                }


                mo2[singleResult.index].player = 0
                mo2[singleResult.index].size = mySize
                const isBottWin = checkWinEasy(mo2, 0) ? true : false
                if (isBottWin) {
                    fixesResult = singleResult
                    // singleResult.newScore = 10000000
                    break
                }
                let mo3 = []
                let p1Mock = []
                playerOneMocks.map((p, index) => {
                    if (p.show) {
                        const i2 = p1Mock.findIndex(it => it.size == p.size)
                        if (i2 == -1) {
                            p1Mock.push({ size: p.size, index, count: 1 })

                        } else {
                            p1Mock[i2].count = p1Mock[i2].count + 1
                        }
                    }

                })
                mockInLines.map((it, i) => {
                    const { player, size } = it
                    if (i == singleResult.index) {
                        mo3.push({ player: 0, size: mySize })

                    }
                    else {

                        mo3.push({ player, size })
                    }
                })
                let isOpenantWin = false
                const s2 = minimaxEasy(mo3, 0, -10000, 10000, 1,)

                if (s2.index == 0 || s2.index) {


                    mo3[s2.index].player = 1
                    mo3[s2.index].size = mySize
                    isOpenantWin = checkWinEasy(mo3, 1) ? true : false
                    if (isOpenantWin == true) {
                        let it = p0Mock[p0Mock.length - 1]
                        if (p1Mock.length < p0Mock.length) {
                            it = p0Mock[p1Mock.length - 1]
                        }
                        // if (p1Mock.findIndex(s => s.size == it.size)==-1) {
                        //     it = p0Mock[p0Mock.length - 1]
                        // }
                        fixesResult = {
                            ...singleResult,
                            index: s2.index,
                            indexMock: it.index,
                            size: it.size,
                        }
                    }
                    else {
                        AllResult.push(singleResult)

                        // singleResult.newScore = 10
                    }

                    console.log('-------------', s2.index, singleResult.index, isOpenantWin)
                    // printPlayer0(mo3)
                    // console.log(singleResult, isOpenantWin, s2)

                }




                // if (fixesResult == null) {
                //     if (singleResult.score || singleResult.score == 0) {
                //         if (s.score < singleResult.score) {
                //             singleResult = {
                //                 ...s,
                //                 indexMock: it.index,
                //                 size: mySize,

                //             }
                //         }
                //     }
                //     else {
                //         singleResult = {
                //             ...s,
                //             indexMock: it.index,
                //             size: mySize,
                //         }
                //     }
                // }
            }
        }

        singleResult = fixesResult ? fixesResult :AllResult.length? AllResult[AllResult.length - 1]:singleResult

        console.log('-------------AllResult', singleResult)
        goPlayBot(singleResult)
 
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
        const { iniMock, ini0, ini1 } = generateMockInLines()

        setMockInLines(iniMock)
        setPlayerZeroMocks(ini0)
        setPlayerOneMocks(ini1)
        setTimeout(() => {

            setStart(true)
        }, 200)

    }, [])

    useEffect(() => {

        if (isWinner != false) {
            if (isWinner == null) {
                setTimeout(() => {
                    playSound('game')

                }, 100)
                setLastPlayer(lastPlayer == 0 ? 1 : 0)

            }
            else {
                playSound('win')
                setLastPlayer(isWinner.player)

            }
            setTimeout(() => {
                setShowWinnerModal(true)
                // navigation.replace('Winner', { playerCount, startPlayer: 1 })

                // Alert.alert('show modal')
            }, 1000)
        }
    }, [isWinner])
    function refresh() {
        const { iniMock, ini0, ini1 } = generateMockInLines()
        setMockInLines(iniMock)
        setPlayerZeroMocks(ini0)
        setPlayerOneMocks(ini1)
        setCurrent(null)

        if (isWinner != null) {
            setTimeout(() => {
                setStart(false)
                setStart(true)
            }, 500)
        }
        setActivePlayer(lastPlayer)
        setIsWinner(false)
        setShowWinnerModal(false)
        setChange(!change)



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
                winner.style = {
                    width: lineWidthSize, height: lineContainerSize,
                    left: (boxSize / 2) - (lineWidthSize / 2) + ((boxSize + lineWidthSize) * i),
                    top: 0,
                    right: 0,
                    transform: [{ rotate: '0deg' }]
                }
            }
        })
        // console.log(isWimmer, winner)
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


    function addMock(item, index, current) {
        // let playerZero = []
        // let playerOne = []
        // const id = posX.toString() + posY.toString()
        const newItem = {
            ...item,
            player: current.player,
            size: current.size,
        }

        const newArray = mockInLines
        newArray[index] = newItem
        if (current.player == 0) {
            playerZeroMocks[current.index].show = false
            setPlayerZeroMocks(playerZeroMocks)

        }
        else {
            playerOneMocks[current.index].show = false
            setPlayerOneMocks(playerOneMocks)

        }



        setMockInLines(newArray)
        setCurrent(null)
        // console.log(newArray)
        const win = checkWinner(activePlayer, newArray)

        if (win && win.player != null) {
            playerCount[win.player] = playerCount[win.player] + 1
            setPlayerCount(playerCount)
            setIsWinner(win)

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
            }
            else {
                setIsWinner(null)
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
            }
            else {
                setIsWinner(null)
                return
            }

        }
        playSound('place')


        setChange(!change)

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
        }, 800)
    }

    const Goots = ({ }) => {
        return (
            null
        )
    }


    return (
        <>
            <ImageBackground
                style={{
                    flex: 1,
                    //  backgroundColor: 'yellow',
                    alignItems: 'center'
                }}
                source={require('../assets/background.png')} resizeMode='cover'
            >
                <StatusbarH />
                <View style={{ flex: 1, justifyContent: 'space-between', }}>
                    {/* Player 0 Portion */}
                    <View style={{
                        borderBottomWidth: 5, paddingBottom: myHeight(1),

                        borderColor: activePlayer == 0 ? myColors.player1 : '#00000030',
                        backgroundColor: activePlayer == 0 ? myColors.player1 + '25' : '#00000005',
                    }}>
                        <View style={{
                            flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end',
                            alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: myWidth(2),
                            // backgroundColor: 'red'
                        }}>

                            {
                                playerZeroMocks.map((mock, index) => {
                                    const active = (activePlayer == mock.player) && mock.show != false
                                    return (
                                        <TouchableOpacity key={index} activeOpacity={active ? 0.7 : 1}
                                            style={{
                                                flexBasis: '16%', marginTop: myHeight(0.5),
                                                transform: [{ rotate: mock.id == current?.id ? '25deg' : '0deg' }]
                                            }} onPress={() => {
                                                if (active) {
                                                    setCurrent((current && current?.id == mock.id) ? null : { ...mock, index })
                                                } else if (activePlayer != mock.player && mock.show != false) {
                                                    playSound('wrong')
                                                }
                                            }}>
                                            <View style={{ width: mockSizes[mock.size] / 1.2, height: mockSizes[mock.size] / 1.2 }}>

                                                {mock.show != false &&
                                                    <Image style={{ width: '100%', height: '100%' }}
                                                        source={mock.player == 0 ? require('../assets/redd.png') :
                                                            require('../assets/bluee.png')} />
                                                }
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

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
                                                addMock(item, index, current)
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


                                                }} source={item.player == 0 ? require('../assets/redd.png') : require('../assets/bluee.png')} />
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
                                colors={isWinner.player == 0 ? [myColors.player1, '#de645d', '#e88c87'] : [myColors.player2, '#5198d3', '#81c1f7']}
                                style={[isWinner.style, {
                                    borderRadius: 1000, position: 'absolute',
                                    borderWidth: 0, elevation: 6, zIndex: 100,

                                    //  overflow: 'hidden'
                                }]} />
                        }
                    </View>
                    {/* Player 1 Portion */}
                    <View style={{
                        borderTopWidth: 5, paddingTop: myHeight(1),

                        borderColor: activePlayer == 1 ? myColors.player2 : '#00000020',
                        backgroundColor: activePlayer == 1 ? myColors.player2 + '35' : '#00000010',

                    }}>
                        <View style={{
                            flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end',
                            alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: myWidth(2),
                            // backgroundColor: 'red'
                        }}>

                            {
                                playerOneMocks.map((mock, index) => {
                                    const active = (activePlayer == mock.player) && mock.show != false

                                    return (
                                        <TouchableOpacity key={index} activeOpacity={active ? 0.7 : 1}
                                            style={{
                                                flexBasis: '16%', marginTop: myHeight(0.5),
                                                transform: [{ rotate: mock.id == current?.id ? '25deg' : '0deg' }]
                                            }} onPress={() => {
                                                if (active) {
                                                    setCurrent(current ? null : { ...mock, index })
                                                } else if (activePlayer != mock.player && mock.show != false) {
                                                    playSound('wrong')
                                                }

                                            }}>
                                            <View style={{ width: mockSizes[mock.size] / 1.2, height: mockSizes[mock.size] / 1.2 }}>

                                                {mock.show != false &&
                                                    <Image style={{ width: '100%', height: '100%' }}
                                                        source={mock.player == 0 ? require('../assets/redd.png') :
                                                            require('../assets/bluee.png')} />
                                                }
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

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