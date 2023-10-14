import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView, Alert,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import LinearGradient from 'react-native-linear-gradient'
import SoundPlayer from 'react-native-sound-player'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

export const MyButton = ({ size = 0, text, fun, fontSize = myFontSize.medium2, fontFamily = myFonts.headingBold }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{

            height: size / 3, width: size,
            alignItems: 'center', overflow: 'hidden'
            // backgroundColor: 'red'
        }} onPress={fun}>
            <ImageBackground style={{
                height: '100%', width: '100%',
                alignItems: 'center',
                // backgroundColor: 'red'
            }} source={require('../assets/button.png')} resizeMode='contain'>


                <Text style={[styles.textCommon, {
                    fontFamily,
                    fontSize,
                    height: '100%',
                    width: '100%', textAlign: 'center',
                    textAlignVertical: 'center',
                    // b: - size / 3,
                    // backgroundColor: 'transparent',
                    position: 'absolute',
                    color: myColors.woodD
                }]}>{text}</Text>
            </ImageBackground>
        </TouchableOpacity>

    )

}
export const MyButtonCircle = ({ size = 0, image, imageSize = myHeight(3), fun }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{

            height: size, width: size,
            alignItems: 'center', overflow: 'hidden'
            // backgroundColor: 'red'
        }} onPress={fun}>
            <ImageBackground style={{
                height: '100%', width: '100%',
                alignItems: 'center', justifyContent: 'center',
                // backgroundColor: 'red'
            }} source={require('../assets/buttonC.png')} resizeMode='contain'>
                <Image
                    style={{
                        height: imageSize, width: imageSize,
                        transform: [{ rotate: '0deg' }],
                        resizeMode: 'contain',
                        tintColor: myColors.woodD,

                    }} source={image} />
            </ImageBackground>
        </TouchableOpacity>

    )

}
export const MyDoubleText = ({
    frontColor = myColors.wood, backColor = 'black', text = '',
    fontSize = myFontSize.large * 1.15, fontFamily = myFonts.headingBold,
    pos = 3.5

}) => {
    return (

        <View style={{ width: '100%', }}>
            <Text style={[styles.textCommon, {
                fontFamily,
                fontSize,
                width: '100%',
                color: backColor,
                textAlign: 'center',
                letterSpacing: 3,


            }]}>{text}</Text>
            <Text style={[styles.textCommon, {
                fontFamily,
                fontSize,
                color: frontColor,
                textAlign: 'center',
                width: '100%',

                left: -pos,
                letterSpacing: 3,
                position: 'absolute',
            }]}>{text}</Text>
        </View>

    )

}
export const YesNoModal = ({ yesFun, noFun, text = '' }) => {
    return (
        <View style={{
            height: '100%', width: '100%', position: 'absolute', zIndex: 100,
            backgroundColor: '#00000080', alignItems: 'center', justifyContent: 'center'
        }}>
            <Animated.View entering={FadeIn}
                exiting={FadeOut}
                style={{}}>
                <ImageBackground
                    style={{
                        // flex: 1,
                        // backgroundColor: 'brown',
                        paddingHorizontal: myWidth(4),
                        alignItems: 'center',
                        height: myWidth(90) / 2, width: myWidth(90),

                    }}
                    source={require('../assets/board.png')} resizeMode='contain'
                >
                    <Spacer paddingT={myHeight(1)} />
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', }}>

                        <MyDoubleText text={text}
                            frontColor={myColors.wood} fontSize={myFontSize.medium0}
                            fontFamily={myFonts.heading} pos={2} />
                    </View>

                    <View style={{
                        width: '100%',
                        //  paddingHorizontal: myWidth(5),
                        marginBottom: myHeight(3), flexDirection: 'row',
                        justifyContent: 'space-around',
                        // backgroundColor: 'blue'
                    }}>


                        <MyButton key={'cancel'} text={'Cancel'} size={myWidth(32)} fun={noFun} fontSize={myFontSize.body3} />
                        <MyButton key={'ok'} text={'Ok'} size={myWidth(32)} fun={yesFun} fontSize={myFontSize.body3} />
                    </View>

                </ImageBackground>

            </Animated.View>
        </View>
    )
}

export function playSound(name) {
    try {
        // play the file tone.mp3
        SoundPlayer.stop()
        SoundPlayer.playSoundFile(name, 'mp3')
        // or play from url
        // SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
}
export function playBackground() {
    playSound('background2')
}
export function stopMusic() {
    SoundPlayer.stop()
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