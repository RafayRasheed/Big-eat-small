import { useEffect, useRef, useState } from "react"
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { myFontSize, myFonts, myLetSpacing } from "../../ultils/myFonts"
import { myColors } from "../../ultils/myColors"
import { Loader, MyError, Spacer, ios, myHeight, myWidth } from "../../game/common"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// import Flag from './account.component/conPass_select';



export const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [conPass, setconPass] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPass] = useState(null)
    const [verifyLog, setVerifyLog] = useState(false)
    const flagRef = useRef(null)
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
        if (verifyLog) {
            navigation.navigate('Verification')
        }
    }, [verifyLog])

    const onSignUp = () => {
        setIsLoading(true)
        if (verifyName() && verifyEmail() && verifyPass() && verifyconPass()) {
            setTimeout(() => {
                setIsLoading(false)
                setVerifyLog(true)
            }, 2000)
        } else {
            setIsLoading(false)
            return false
        }
    }


    function verifyEmail() {
        if (email) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email)) {
                return true
            }
            setErrorMessage('Please Enter a Valid Email')
            return false
        }
        setErrorMessage('Please Enter a Email')
        return false
    }
    function verifyName() {
        if (name) {
            return true
        }
        setErrorMessage('Please Enter a Name')
        return false
    }
    function verifyconPass() {
        if (conPass) {
            if (conPass == password) {
                return true
            }
            setErrorMessage('Password do not match')
            return false
        }
        setErrorMessage('Please Enter a Password Again')
        return false
    }

    function verifyPass() {
        if (password) {
            return true
        }
        setErrorMessage('Please Enter a Password')
        return false
    }



    // const KeyboardAware = listenToKeyboardEvents = () =>{
    //     <ScrollView {}
    // }


    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <Loader />}
            {errorMessage && <MyError message={errorMessage} />}
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <View>
                    {/* Content */}
                    <View style={styles.containerContent}>
                        <Spacer paddingT={myHeight(6.5)} />

                        {/* Text Portion */}
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textSignUp}>Sign Up</Text>
                            <Spacer paddingT={myHeight(0.75)} />
                            <Text style={styles.textWelcome}>Please enter your details</Text>
                        </View>

                        <Spacer paddingT={myHeight(4.3)} />
                        {/* Input Portion */}
                        <View>
                            {/* Name Portion */}
                            <View style={styles.containerInputPortion}>
                                <Image style={styles.imageInput} source={require('../assets/account/iName.png')} />
                                <Spacer paddingEnd={myWidth(2.5)} />
                                <TextInput placeholder=" Full Name"
                                    placeholderTextColor={myColors.offColor}
                                    selectionColor={myColors.primaryT}
                                    style={styles.containerInput} cursorColor={myColors.primaryT}
                                    value={name} onChangeText={setName}
                                    autoCorrect={false} />
                            </View>
                            <Spacer paddingT={myHeight(1.5)} />



                            {/* Email Portion */}
                            <View style={styles.containerInputPortion}>
                                <Image style={styles.imageInput} source={require('../assets/account/iEmail.png')} />
                                <Spacer paddingEnd={myWidth(2.5)} />
                                <TextInput placeholder=" Email Address"
                                    autoCapitalize='none'
                                    placeholderTextColor={myColors.offColor}
                                    selectionColor={myColors.primaryT}
                                    style={styles.containerInput} cursorColor={myColors.primaryT}
                                    value={email} onChangeText={setEmail}
                                    autoCorrect={false} />
                            </View>

                            <Spacer paddingT={myHeight(1.5)} />
                            {/* Password Portion */}
                            <View style={styles.containerInputPortion}>
                                <Image style={styles.imageInput} source={require('../assets/account/iPass.png')} />
                                <Spacer paddingEnd={myWidth(2.5)} />
                                <TextInput placeholder=" Password"
                                    secureTextEntry={hidePass}
                                    placeholderTextColor={myColors.offColor}
                                    selectionColor={myColors.primaryT}
                                    style={styles.containerInput} cursorColor={myColors.primaryT}
                                    value={password} onChangeText={setPass}
                                    autoCorrect={false} />
                                <TouchableOpacity activeOpacity={0.6} onPress={() => setHidePass(!hidePass)}>
                                    <Image style={styles.imageEye}
                                        source={hidePass ? require('../assets/account/eyeC.png') : require('../assets/account/eyeO.png')} />
                                </TouchableOpacity>
                            </View>


                            <Spacer paddingT={myHeight(1.5)} />
                            {/*Confirm Password Portion */}
                            <View style={styles.containerInputPortion}>
                                <Image style={styles.imageInput} source={require('../assets/account/iPass.png')} />
                                <Spacer paddingEnd={myWidth(2.5)} />
                                <TextInput placeholder=" Confirm Password"
                                    secureTextEntry={hideConPass}
                                    placeholderTextColor={myColors.offColor}
                                    selectionColor={myColors.primaryT}
                                    style={styles.containerInput} cursorColor={myColors.primaryT}
                                    value={conPass} onChangeText={setconPass}
                                    autoCorrect={false} />
                                <TouchableOpacity activeOpacity={0.6} onPress={() => setHideConPass(!hideConPass)}>
                                    <Image style={styles.imageEye}
                                        source={hideConPass ? require('../assets/account/eyeC.png') : require('../assets/account/eyeO.png')} />
                                </TouchableOpacity>
                            </View>
                            <Spacer paddingT={myHeight(3.4)} />

                            {/* Sign Button */}
                            <TouchableOpacity activeOpacity={0.6} onLongPress={() => navigation.navigate('Verification')}
                                onPress={onSignUp} style={styles.containerSign}>
                                <Text style={styles.textSignBu}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Spacer paddingT={myHeight(4.2)} />
                    {/* Or sign with */}
                    <View style={styles.containerOrSignWith}>
                        <View style={styles.containerLine} />
                        <Text style={styles.textSignWith}>Or sign up with</Text>
                        <View style={styles.containerLine} />
                    </View>

                    <Spacer paddingT={myHeight(4.3)} />
                    {/* Social Portion */}
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        {/* Google Button */}
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null}
                            style={styles.containerSocial}>
                            <Image style={styles.imageSocial} source={require('../assets/account/google.png')} />
                        </TouchableOpacity>
                        {/* Facebook Button */}
                        <Spacer paddingEnd={myWidth(4.4)} />
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null}
                            style={styles.containerSocial}>
                            <Image style={styles.imageSocial} source={require('../assets/account/facebook.png')} />
                        </TouchableOpacity>
                        <Spacer paddingEnd={myWidth(4.4)} />
                        {/* Apple Button */}
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null}
                            style={styles.containerSocial}>
                            <Image style={styles.imageSocial} source={require('../assets/account/apple.png')} />
                        </TouchableOpacity>
                    </View>

                    <Spacer paddingT={myHeight(3.6)} />

                    {/* Already have an Acc*/}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textAlreHaveAcc}>Already have an account? </Text>

                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
                            <Spacer paddingT={myHeight(1)} />
                            <Text style={styles.textSignIn}>Sign In!</Text>
                            <Spacer paddingT={myHeight(1)} />

                        </TouchableOpacity>
                    </View>

                </View>

                {/* Terms & Policy */}
                <View style={styles.containerTermCond}>
                    {/* First line */}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null}>
                            <Text style={styles.textTermCondColor}>Terms & Conditions </Text>
                        </TouchableOpacity>

                        <Text style={styles.textTermCond}>and </Text>

                        <TouchableOpacity activeOpacity={0.6} onPress={() => null}>
                            <Spacer paddingT={myHeight(1)} />
                            <Text style={styles.textTermCondColor}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Second Line */}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={styles.textTermCond}>Copyrights 2023 </Text>

                        <TouchableOpacity activeOpacity={0.6} onPress={() => null}>
                            <Text style={styles.textTermCondColor}>M-Rides Inc</Text>
                            <Spacer paddingT={myHeight(0.7)} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </ScrollView> */}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.background,
    },
    containerContent: {
        // flex: 1,
        paddingHorizontal: myWidth(10),
    },
    containerInputPortion: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: myHeight(1.47),
        paddingHorizontal: myWidth(2.5),
        borderWidth: myHeight(0.1),
        borderColor: myColors.primary,
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
        fontSize: myFontSize.body,
        color: myColors.text,
        fontFamily: myFonts.bodyBold,
        includeFontPadding: false,
        paddingHorizontal: 0,
        paddingVertical: ios ? myHeight(1.2) : myHeight(100) > 600 ? myHeight(0.8) : myHeight(0.1),


    },
    containerSign: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: myColors.primaryT,
        paddingVertical: myHeight(1.2),
        borderRadius: myWidth(2.2)
    },
    containerOrSignWith: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        paddingHorizontal: myWidth(4.6),
    },
    containerLine: {
        flex: 1,
        borderTopWidth: myHeight(0.15),
        borderColor: myColors.dot,
    },
    containerSocial: {
        paddingHorizontal: myWidth(4.18),
        paddingVertical: myHeight(0.65),
        borderRadius: myWidth(1),
        borderWidth: myHeight(0.09),
        borderColor: myColors.primaryT,
    },

    containerTermCond: {
        justifyContent: 'center',
        alignItems: 'center',
    },



    //Text
    textTermCond: {
        fontSize: myFontSize.xxSmall,
        fontFamily: myFonts.bodyBold,
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,

    },

    textTermCondColor: {
        fontSize: myFontSize.xxSmall,
        fontFamily: myFonts.bodyBold,
        color: myColors.primaryT,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,


    },


    textSignUp: {
        fontSize: myFontSize.xMedium,
        fontFamily: myFonts.bodyBold,
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,


    },

    textSignBu: {
        fontSize: myFontSize.body2,
        fontFamily: myFonts.headingBold,
        color: myColors.background,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

    },
    textWelcome: {
        fontSize: myFontSize.body2,
        fontFamily: myFonts.bodyBold,
        color: myColors.offColor,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

    },
    textSignWith: {
        fontSize: myFontSize.xxSmall,
        fontFamily: myFonts.heading,
        color: myColors.text,
        paddingHorizontal: myWidth(2.3),
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

    },
    textAlreHaveAcc: {
        fontSize: myFontSize.body,
        fontFamily: myFonts.body,
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

    },
    textSignIn: {
        fontSize: myFontSize.body,
        fontFamily: myFonts.heading,
        color: myColors.primaryT,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,

    },
    // textSocial: {
    //     fontSize: myFontSize.xxSmall,
    //     fontFamily: myFonts.body,
    //     color: myColors.primaryT,
    //     letterSpacing: myLetSpacing.common,
    // },


    //Image 
    imageInput: {
        height: myHeight(2.2),
        width: myHeight(2.2),
        tintColor: myColors.primaryT,
        resizeMode: 'contain',
    },
    imageSocial: {
        height: myHeight(3.76),
        width: myHeight(3.76),
        resizeMode: 'contain',
    },
    imageEye: {
        height: myHeight(2.5),
        width: myHeight(2.5),
        resizeMode: 'contain',
        tintColor: myColors.primaryT
    }


})