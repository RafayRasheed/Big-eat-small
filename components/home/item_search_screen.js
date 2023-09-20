import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView, StyleSheet, TouchableOpacity, Image,
    View, Text, StatusBar, TextInput,
    Linking, Platform, ImageBackground, SafeAreaView,
} from 'react-native';
import { MyError, Spacer, StatusbarH, ios, myHeight, myWidth } from '../../game/common';
import { myColors } from '../../ultils/myColors';
import { myFontSize, myFonts, myLetSpacing } from '../../ultils/myFonts';
import Lottie from 'lottie-react-native';
import { ItemInfo } from './home.component/item_info';

export const ItemSearch = ({ navigation, route }) => {
    const [search, setSearch] = useState(null)
    const [load, setLoad] = useState(null)
    const { items } = route.params
    const { restaurant } = route.params

    const Loader = () => (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{
                marginTop: -myHeight(15),
                alignItems: 'center',
            }}>
                <Lottie
                    autoPlay={true}
                    loop={true}
                    source={require('../assets/lottie/spoonL.json')}
                    style={{
                        height: myHeight(38), width: myHeight(38),
                    }}
                />

                <Text style={[styles.textCommon, {
                    fontSize: myFontSize.body3,
                    color: myColors.textL4,
                    fontFamily: myFonts.bodyBold,
                    marginTop: -myHeight(11)
                }]}>Loading....</Text>
            </View>
        </View>
    )
    useEffect(() => {

        if (search && search.length == 1) {
            setLoad(true)
        }
    }, [search])


    useEffect(() => {
        if (load) {
            setTimeout(() =>
                setLoad(false)
                , 3000)
        }
    }, [load])
    return (

        <>

            <SafeAreaView style={{
                flex: 1, backgroundColor: myColors.background,
            }}>
                <StatusbarH />

                <Spacer paddingT={myHeight(1)} />
                {/* Top */}
                {/* Search */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: myWidth(4),
                    borderRadius: myWidth(2),
                    backgroundColor: myColors.offColor7,
                    marginHorizontal: myWidth(4)
                }}>
                    {/* Arrow */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={{}}>
                        <Image style={{
                            height: myHeight(2.4),
                            width: myHeight(2.4),
                            resizeMode: 'contain',
                            tintColor: myColors.textL0
                        }} source={require('../assets/home_main/home/back.png')} />
                    </TouchableOpacity>
                    <Spacer paddingEnd={myWidth(2.5)} />
                    <TextInput placeholder=" Search Item "
                        placeholderTextColor={myColors.textL5}
                        autoCorrect={false}
                        selectionColor={myColors.primaryT}
                        style={{
                            flex: 1,
                            textAlignVertical: 'center',
                            paddingVertical: ios ? myHeight(0.8) : myHeight(100) > 600 ? myHeight(0.7) : myHeight(0.1),
                            fontSize: myFontSize.xxSmall,
                            color: myColors.text,
                            includeFontPadding: false,
                            fontFamily: myFonts.bodyBold,
                        }}
                        cursorColor={myColors.primaryT}
                        value={search} onChangeText={setSearch}
                    // value={search} onChangeText={(val) => null}
                    />
                </View>
                <Spacer paddingEnd={myWidth(3)} />



                {/* Icon Empty Or Content */}

                {
                    load ? <Loader /> :
                        (search) ?
                            <View style={{ flex: 1 }}>
                                <ScrollView contentContainerStyle={{ paddingHorizontal: myWidth(4.1) }} showsVerticalScrollIndicator={false}>
                                    <Spacer paddingT={myHeight(1.3)} />

                                    {items?.map((cat, i) =>
                                        <View key={i}>
                                            {cat?.items?.map((item, i) =>
                                                <View>
                                                    <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => navigation.navigate('ItemDetails', { item, restaurant })}>
                                                        <ItemInfo item={item} />
                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                        </View>
                                    )}
                                </ScrollView>
                            </View>
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Lottie
                                    autoPlay={true}
                                    loop={true}
                                    source={require('../assets/lottie/food.json')}
                                    style={{ height: myHeight(27), width: myHeight(27), marginTop: -myHeight(3) }}

                                />
                            </View>
                }

            </SafeAreaView>

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