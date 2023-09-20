import React from "react"
import { Text, View, Image, StyleSheet } from "react-native"
import { Spacer, myHeight, myWidth } from "../../../game/common"
import { myFontSize, myFonts, myLetSpacing } from "../../../ultils/myFonts"
import { myColors } from "../../../ultils/myColors"


export const ResturantH = ({ item }) => {
    return (
        <View style={{ paddingBottom: myHeight(1.3), }}>

            <View style={styles.container}>
                <Image style={styles.image} source={item.images[0]} />
                {/* Text Portion */}
                <View style={{ paddingHorizontal: myHeight(0.7) }}>

                    <Spacer paddingT={myHeight(1)} />
                    {/* Name */}
                    <Text numberOfLines={1}
                        style={[styles.textCommon, {
                            fontSize: myFontSize.body2,
                            fontFamily: myFonts.bodyBold,

                        }]}>{item.name}</Text>
                    <Spacer paddingT={myHeight(0.2)} />

                    {/* Location */}
                    <View style={styles.containerLocation}>
                        <Image style={styles.imageLoc}
                            source={require('../../assets/home_main/home/loc.png')} />
                        <Spacer paddingEnd={myWidth(0.8)} />
                        <Text numberOfLines={2} style={[styles.textCommon, {
                            flex: 1,
                            fontSize: myFontSize.small2,
                            fontFamily: myFonts.body,
                            color: myColors.text,

                        }]}>{item.location}</Text>
                    </View>


                </View>

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        width: myWidth(40),
        height: myHeight(24),
        marginEnd: myWidth(4.5),
        borderRadius: myWidth(2.5),
        backgroundColor: myColors.background,
        // justifyContent:'space-between',
        margin: 1,
        elevation: 3,
    },

    containerLocation: {
        flexDirection: 'row',
    },
    textName: {
        fontFamily: myFonts.heading, fontSize: myFontSize.medium, color: myColors.text,
    },
    textLoc: {
        fontFamily: myFonts.medium, fontSize: myFontSize.tiny, color: myColors.text,
        width: '89%'
    },
    textCommon: {
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
    },
    image: {
        width: '100%',
        height: '62%', borderTopLeftRadius: myWidth(3),
        borderRadius: myWidth(3), resizeMode: 'cover'
    },
    imageLoc: {
        width: myHeight(2), height: myHeight(2),
        resizeMode: 'contain', marginTop: myHeight(0.2)

    }
})