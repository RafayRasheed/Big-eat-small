import React, { useRef, useState, useEffect } from 'react';
import { Image, Pressable, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import { MyError, Spacer, ios, myHeight, myWidth } from '../../game/common';

export const NewPassword = ({ navigation }) => {
    const [password, setPassword] = useState(null)
    const flagRef = useRef(null)
    const [confirmPass, setConfirmPass] = useState(null)
    const [verifyDone, setverifyDone] = useState(false)
    const [hidePass, setHidePass] = useState(true);
    const [hideConPass, setHideConPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)
        }
    }, [errorMessage])

    useEffect(() => {
        if (verifyDone) {
            navigation.navigate('DonePassword')
        }
    }, [verifyDone])

    function onSubmit() {
        if (verifyPass() && verifyConPass()) {
            setverifyDone(true)
        }
        // navigation.navigate('DonePassword')

    }
    function verifyPass() {
        if (password) {
            return true
        }
        setErrorMessage('Please Enter a Password')
        return false
    }

    function verifyConPass() {
        if (confirmPass) {
            if (password === confirmPass) {
                return true
            }
            setErrorMessage('Password Do Not Match')
            return false
        }
        setErrorMessage('Please Enter a Password Again')
        return false
    }
    return (
        <SafeAreaView style={styles.container}>

            {errorMessage && <MyError message={errorMessage} />}
            <Spacer paddingT={myHeight(7)} />

            <View style={{ paddingHorizontal: myWidth(10), alignItems: 'center' }}>
                {/* New Password */}
                <Text style={styles.textNewPass}>New Password</Text>
                <Spacer paddingT={myHeight(1.1)} />
                <Text style={styles.textDes}>Enter your new password</Text>

                <Spacer paddingT={myHeight(5.2)} />
                {/* Password Portion */}
                <View style={styles.containerInputPortion}>
                    <Image style={styles.imageInput} source={require('../assets/account/iPass.png')} />
                    <Spacer paddingEnd={myWidth(1.8)} />
                    <TextInput placeholder="Password"
                        secureTextEntry={hidePass}
                        password={true}
                        clearTextOnFocus={false}
                        textContentType='password'
                        autoCorrect={false}
                        placeholderTextColor={myColors.offColor}
                        selectionColor={myColors.primaryT}
                        style={styles.containerInput} cursorColor={myColors.primaryT}
                        value={password} onChangeText={setPassword}
                    />
                    <TouchableOpacity activeOpacity={0.6} onPress={() => setHidePass(!hidePass)}>
                        <Image style={styles.imageEye}
                            source={hidePass ? require('../assets/account/eyeC.png') : require('../assets/account/eyeO.png')} />
                    </TouchableOpacity>
                </View>
                <Spacer paddingT={myHeight(2.15)} />
                {/* Confirm Password Portion */}
                <View style={styles.containerInputPortion}>
                    <Image style={styles.imageInput} source={require('../assets/account/iPass.png')} />
                    <Spacer paddingEnd={myWidth(1.8)} />
                    <TextInput placeholder="Confirm Password"
                        secureTextEntry={hideConPass}
                        password={true}
                        clearTextOnFocus={false}
                        textContentType='password'
                        autoCorrect={false}
                        placeholderTextColor={myColors.offColor}
                        selectionColor={myColors.primaryT}
                        style={styles.containerInput} cursorColor={myColors.primaryT}
                        value={confirmPass} onChangeText={setConfirmPass}
                    />
                    <TouchableOpacity activeOpacity={0.6} onPress={() => setHideConPass(!hideConPass)}>
                        <Image style={styles.imageEye}
                            source={hideConPass ? require('../assets/account/eyeC.png') : require('../assets/account/eyeO.png')} />
                    </TouchableOpacity>
                </View>
                <Spacer paddingT={myHeight(2.2)} />

                {/* Back to sign in */}
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('SignIn')}>
                    <Spacer paddingT={myHeight(1)} />
                    <Text style={styles.textBackToSign}>Back to Sign in</Text>
                    <Spacer paddingT={myHeight(1)} />
                </TouchableOpacity>
                <Spacer paddingT={myHeight(2.2)} />

                {/* Sign Button */}
                <TouchableOpacity activeOpacity={0.6} onPress={onSubmit}
                    onLongPress={() => navigation.navigate('DonePassword')} style={styles.containerSign}>
                    <Text style={styles.textSendBu}>Submit</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.background,
    },
    containerInputPortion: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: myHeight(1.47),
        paddingHorizontal: myWidth(2.5),
        borderWidth: myHeight(0.09),
        borderColor: myColors.primaryT,
        backgroundColor: myColors.background,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

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
    textNewPass: {
        fontSize: myFontSize.large,
        fontFamily: myFonts.bodyBold,
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

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
        fontFamily: myFonts.headingBold,
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
        tintColor: myColors.primaryT

    },
    imageInput: {
        height: myHeight(2.2),
        width: myHeight(2.2),
        resizeMode: 'contain',
        tintColor: myColors.primaryT

    },
    imageEye: {
        height: myHeight(2.5),
        width: myHeight(2.5),
        resizeMode: 'contain',
        tintColor: myColors.primaryT
    }


})