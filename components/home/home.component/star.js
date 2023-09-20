import React from "react"
import { Text, View, Image, StyleSheet } from "react-native"
import { Spacer, myHeight, myWidth } from "../../../game/common"
import { myFontSize, myFonts, myLetSpacing } from "../../../ultils/myFonts"
import { myColors } from "../../../ultils/myColors"

export const Stars = ({ num }) => {

    const starAll = []
    const number = parseInt(num)
    for (let i = 0; i < 5; i++) {
        starAll.push(
            <Image key={i} source={require('../../assets/home_main/home/star.png')}
                style={[styles.star,
                {
                    tintColor: number > i ? myColors.star : myColors.offColor,
                    // tintColor: myColors.star
                }]}
            />
        )
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {starAll}
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
    star: {
        width: myHeight(1.8),
        height: myHeight(1.8),
        marginEnd: myWidth(0.8),
        resizeMode: 'contain',
    }
})