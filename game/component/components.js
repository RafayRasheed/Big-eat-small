import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView, Alert,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import LinearGradient from 'react-native-linear-gradient'

export const MyButton = ({ size = 0, text, fun, fontSize = myFontSize.medium2 }) => {
    return (

        <ImageBackground style={{
            height: size / 3, width: size,
            alignItems: 'center'
        }} source={require('../assets/button.png')} resizeMode='contain'>
            <TouchableOpacity activeOpacity={0.8} style={{
                height: '100%', width: '100%',
                alignItems: 'center'
            }} onPress={fun}>

                <Text style={[styles.textCommon, {
                    fontFamily: myFonts.headingBold,
                    fontSize,
                    height: '100%',
                    width: myWidth(100), textAlign: 'center',
                    textAlignVertical: 'center',
                    // b: - size / 3,
                    // backgroundColor: 'transparent',
                    position: 'absolute',
                    color: myColors.woodD
                }]}>{text}</Text>
            </TouchableOpacity>
        </ImageBackground>

    )

}
export const MyDoubleText = ({
    frontColor = myColors.wood, backColor = 'black', text = '',
    fontSize = myFontSize.large * 1.15, fontFamily = myFonts.headingBold,

}) => {
    return (

        <View>
            <Text numberOfLines={1} style={[styles.textCommon, {
                fontFamily,
                fontSize,
                width: '100%',
                color: backColor,
                textAlign: 'center',
                letterSpacing: 3,


            }]}>{text}</Text>
            <Text numberOfLines={1} style={[styles.textCommon, {
                fontFamily,
                fontSize,
                color: frontColor,
                textAlign: 'center',
                width: '100%',

                left: -2.5,
                letterSpacing: 3,
                position: 'absolute',
            }]}>{text}</Text>
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