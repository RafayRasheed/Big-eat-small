import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import { Spacer, ios, myHeight, myWidth } from '../../game/common';
import Lottie from 'lottie-react-native';

export const DonePassword = ({ navigation }) => {
    const [showDone, setShoeDone] = useState(false)


    useEffect(() => {
        setTimeout(() => setShoeDone(true), 100)
    }, [])
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ alignItems: 'center' }}>


                <Spacer paddingT={myHeight(7)} />
                <Text style={styles.textChanPass}>Password Changed</Text>
                {/* Change Password */}
                <Spacer paddingT={myHeight(1.1)} />
                <Text style={styles.textDes}>Your Password Successfully Update</Text>

                <Spacer paddingT={myHeight(10)} />
                <View style={{ height: myHeight(19) }}>

                    {showDone && <Lottie
                        autoPlay={true}
                        loop={false}
                        source={require('../assets/lottie/check.json')}
                        style={{ height: myHeight(19), width: myHeight(19), }}

                    />}
                </View>
                {/* <Image style={styles.imageDone} source={require('../assets/account/done.png')} /> */}
                <Spacer paddingT={myHeight(5)} />
                <Text style={styles.textInst}>You can login your account with your new password.</Text>



            </View>

            {/* Sign Button */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('SignIn')}
                    style={styles.containerSign}>
                    <Text style={styles.textSendBu}>Back to Sign In</Text>
                </TouchableOpacity>
                <Spacer paddingT={myHeight(8)} />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.background,
        justifyContent: 'space-between',
    },
    containerInputPortion: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: myHeight(1.47),
        paddingHorizontal: myWidth(2.5),
        borderWidth: myHeight(0.09),
        borderColor: myColors.primaryT,

    },
    containerInput: {
        flex: 1,
        textAlignVertical: 'center',
        paddingVertical: ios ? myHeight(1.2) : myHeight(100) > 600 ? myHeight(0.8) : myHeight(0.1),
        fontSize: myFontSize.body,
        color: myColors.text,
        includeFontPadding: false,
        fontFamily: myFonts.bodyBold,

        // lineHeight: 0,


    },
    containerSign: {
        width: myWidth(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: myColors.primaryT,
        paddingVertical: myHeight(1.25),
        borderRadius: myWidth(2.2),


    },

    // Text
    textChanPass: {
        fontSize: myFontSize.large,
        fontFamily: myFonts.bodyBold,
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
        alignSelf: 'center',

    },

    textDes: {
        fontSize: myFontSize.body,
        fontFamily: myFonts.body,
        color: myColors.offColor,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
        textAlign: 'center',

    },
    textInst: {
        fontSize: myFontSize.xBody,
        fontFamily: myFonts.body,
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
        marginHorizontal: myWidth(14),
        textAlign: 'center',

    },
    textBackToSign: {
        fontSize: myFontSize.body,
        fontFamily: myFonts.heading,
        color: myColors.offColor,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
        textAlign: 'center',

    },
    textSendBu: {
        fontSize: myFontSize.body2,
        fontFamily: myFonts.heading,
        color: myColors.background,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

    },


    //Image 
    imageBack: {
        height: myHeight(2.25),
        width: myHeight(2.25),
        marginStart: myWidth(7.4),
        resizeMode: 'contain',
    },
    imageInput: {
        height: myHeight(2.2),
        width: myHeight(2.2),
        resizeMode: 'contain',
    },
    imageDone: {
        height: myHeight(11),
        width: myHeight(11),
        resizeMode: 'contain',
    },


})