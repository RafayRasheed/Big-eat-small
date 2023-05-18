import React from "react"
import { SafeAreaView, Image, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { myColors } from "../../ultils/myColors"
import { Spacer, myHeight, myWidth } from "../common"
import { myFontSize, myFonts, myLetSpacing } from "../../ultils/myFonts"

const item = {
    title: 'Earn Coins',
    des: 'Earn coins from all our services to use in app!',
    image: require('../assets/startup/startup5.png'),
    style: { width: myWidth(70), height: myHeight(27) },
}
export const Started = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <View style={styles.containerMid} >
                    {/* <Image /> */}
                    <Image style={[styles.imageMid, item.style]} source={item.image} />
                    {/* <Spacer paddingT={myHeight(0.8)} /> */}
                    <Text style={styles.textTitle}> {item.title}</Text>
                    <Spacer paddingT={myHeight(0.8)} />
                    <Text style={styles.textDes}>{item.des}</Text>
                    <Spacer paddingT={myHeight(4)} />
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.replace('AccountNavigator')} style={styles.containerStart}>
                <Text style={styles.textStart}>Get Started</Text>
            </TouchableOpacity>
            <Spacer paddingT={myHeight(15)} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.background,
    },
    containerStart: {
        backgroundColor: myColors.primaryT,
        paddingVertical: myHeight(1),
        borderRadius: myHeight(3),
        width: myWidth(42),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    containerMid: {
        width: myWidth(100),
        alignItems: 'center',
    },


    textStart: {
        fontSize: myFontSize.xBody,
        fontFamily: myFonts.bodyBold,
        color: myColors.background,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
    },
    textTitle: {
        fontSize: myFontSize.large,
        fontFamily: myFonts.bodyBold,
        color: myColors.text,
        includeFontPadding: false,
        padding: 0,

    },
    textDes: {
        fontSize: myFontSize.body,
        fontFamily: myFonts.body,
        color: myColors.text,
        includeFontPadding: false,
        padding: 0,

    },
    //Image
    imageMid: {
        resizeMode: 'contain',
        // backgroundColor: 'blue',


    },

})