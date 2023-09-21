import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView, Alert,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import LinearGradient from 'react-native-linear-gradient';
import { MyButton } from '../component/components';
import { initialMockInLines, initialMockInLines2, player0Mocks, player0Mocks2, player1Mocks, player1Mocks2 } from './data';

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
function generatePlayerZeroMocks() {
    let array = []
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            const l = {
                id: x.toString() + y.toString(),
                player: null,
                size: null,
                posX: x,
                posY: y,
            }
            array.push(l)
        }
    }
    return array
}
export const Game = ({ navigation }) => {

    const [change, setChange] = useState(false)

    const [mockInLines, setMockInLines] = useState([])
    const [playerZeroMocks, setPlayerZeroMocks] = useState([])
    const [playerOneMocks, setPlayerOneMocks] = useState([])
    const [current, setCurrent] = useState(null)
    const [playerCount, setPlayerCount] = useState([0, 0])
    const [isWinner, setIsWinner] = useState(false)
    const [winnerModal, setShowWinnerModal] = useState(false)
    const [activePlayer, setActivePlayer] = useState(0)
    useEffect(() => {
        const { iniMock, ini0, ini1 } = generateMockInLines()
        setMockInLines(iniMock)
        setPlayerZeroMocks(ini0)
        setPlayerOneMocks(ini1)
    }, [])

    useEffect(() => {

        if (isWinner != false) {
            setTimeout(() => {
                setShowWinnerModal(true)
                // navigation.replace('Winner', { playerCount, startPlayer: 1 })

                // Alert.alert('show modal')
            }, 500)
        }
    }, [isWinner])
    function refresh() {
        const { iniMock, ini0, ini1 } = generateMockInLines()
        setMockInLines(iniMock)
        setPlayerZeroMocks(ini0)
        setPlayerOneMocks(ini1)
        setCurrent(null)
        setIsWinner(false)
        setActivePlayer(0)
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
        console.log(morePlay)

        return morePlay
    }


    function addMock(item, index, player, size) {
        // let playerZero = []
        // let playerOne = []
        // const id = posX.toString() + posY.toString()
        const newItem = {
            ...item,
            player,
            size,
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
            }

        }

        setChange(!change)
        // newArray.map((item) => {
        //     if (item.player == 0) {
        //         playerZero.push(item)
        //     }
        //     else if (item.player == 1) {
        //         playerOne.push(item)

        //     }
        // })
        // console.log('player 0')
        // playerZero.map(({ player, posX, posY }) => {
        //     console.log(posX, posY)
        // })
        // console.log('player 1')
        // playerOne.map(({ player, posX, posY }) => {
        //     console.log(posX, posY)
        // })
        // setChange(!change)


    }
    // 00 01 02
    // 00 10 20
    function onPlayAgain() {
        refresh()
        Alert.alert('ref')
    }

    function onExit() {
        navigation.goBack()
    }
    return (
        <>
            <ImageBackground
                style={{ flex: 1, backgroundColor: 'yellow', alignItems: 'center' }}
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
                                    const active = (activePlayer == mock.player) && mock.size != null
                                    return (
                                        <TouchableOpacity key={index} activeOpacity={active ? 0.7 : 1}
                                            style={{
                                                flexBasis: '16%', marginTop: myHeight(0.5),
                                                transform: [{ rotate: mock.id == current?.id ? '25deg' : '0deg' }]
                                            }} onPress={() => {
                                                if (active) {
                                                    setCurrent({ ...mock, index })
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
                                                addMock(item, index, current?.player, current?.size)
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
                                    const active = (activePlayer == mock.player) && mock.size != null
                                    return (
                                        <TouchableOpacity key={index} activeOpacity={active ? 0.7 : 1}
                                            style={{
                                                flexBasis: '16%', marginTop: myHeight(0.5),
                                                transform: [{ rotate: mock.id == current?.id ? '25deg' : '0deg' }]
                                            }} onPress={() => {
                                                if (active) {
                                                    setCurrent({ ...mock, index })
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
            {/* {
                <LinearGradient colors={[myColors.yellow3, myColors.yellow4,]}
                    style={{
                        position: 'absolute', height: '100%', width: '100%',
                        alignItems: 'center', paddingHorizontal: myWidth(4)
                    }}>
                    <StatusbarH />
                    <Spacer paddingT={myHeight(5)} />
                    <Text style={[styles.textCommon,
                    {
                        fontSize: myFontSize.large, fontFamily: myFonts.heading,

                    }]}>{'Match Drawn'}</Text>

                </LinearGradient>
            } */}

            {
                winnerModal &&

                <View style={{
                    position: 'absolute', height: '100%', width: '100%',
                    zIndex: 10000,
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
                        <MyButton text={'Play Again'} size={myWidth(50)} fun={refresh} />
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