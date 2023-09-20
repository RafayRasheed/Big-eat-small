import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { myFontSize, myFonts, myLetSpacing } from "../../ultils/myFonts";
import { myColors } from "../../ultils/myColors";
import { Spacer, StatusbarH, myHeight, myWidth } from "../../game/common";
import { addCart, removeItemCart, removeResCart } from "../../redux/cart_reducer";


export const CartDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { restaurant } = route.params
    const { cart } = useSelector(state => state.cart)
    const resCart = cart.filter(res => res.restaurant.id == restaurant.id)[0]
    const { cartItems } = resCart

    function addToCart(item, quantity, totalPrice) {
        dispatch(addCart({ restaurant, item, quantity, totalPrice }))
        // navigation.goBack()
    }
    function removeItem(item, totalPrice) {
        dispatch(removeItemCart({ resId: restaurant.id, item, totalPrice }))
    }

    function removeAll() {
        dispatch(removeResCart({ resId: restaurant.id }))
        navigation.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.background, }}>
            <View style={{
                flex: 1, backgroundColor: myColors.background,
                // borderBottomStartRadius: myWidth(5),
                // borderBottomEndRadius: myWidth(5),
                // elevation: 2,
                shadowColor: myColors.shadow
            }}>
                <Spacer paddingT={myHeight(1.2)} />

                <StatusbarH />

                {/*Top  My Cart Heading */}
                <View style={{
                    flexDirection: 'row', paddingHorizontal: myWidth(4),
                    alignItems: 'center'
                }}>
                    {/* Back */}
                    <TouchableOpacity
                        style={{
                            paddingEnd: myWidth(3)
                        }}
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={{
                                width: myHeight(2.6),
                                height: myHeight(2.6),
                                resizeMode: 'contain',
                            }}
                            source={require('../assets/home_main/home/back.png')}
                        />
                    </TouchableOpacity>


                    <Text numberOfLines={1} style={[styles.textCommon, {
                        flex: 1,
                        fontFamily: myFonts.bodyBold, fontSize: myFontSize.xBody2
                    }]}>{restaurant.name}</Text>
                    <TouchableOpacity style={{}} activeOpacity={0.5} onPress={removeAll}>
                        <Text style={[styles.textCommon,
                        {
                            color: myColors.primaryT, fontFamily: myFonts.bodyBold,
                            fontSize: myFontSize.body3
                        }]}>Clear All</Text>
                    </TouchableOpacity>
                </View>
                <Spacer paddingT={myHeight(1.2)} />

                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: myWidth(4) }}>
                    {cartItems.map((cartItem, i) => {
                        const { item } = cartItem

                        return (
                            <View key={i} style={{
                                flexDirection: 'row', marginVertical: myHeight(1.15),
                                paddingHorizontal: myWidth(2.5), borderRadius: myWidth(1.5),
                                backgroundColor: myColors.background, elevation: 4.5,
                                paddingVertical: myHeight(0.8),
                            }}>
                                <Image style={{
                                    width: myHeight(10),
                                    height: myHeight(10),
                                    resizeMode: 'contain',
                                    borderRadius: myWidth(1.5)
                                }} source={item.images[0]} />

                                <Spacer paddingEnd={myWidth(2.5)} />
                                <View style={{ flex: 1 }}>
                                    {/* name */}
                                    <Text numberOfLines={1} style={[styles.textCommon,
                                    {
                                        fontSize: myFontSize.xBody,
                                        fontFamily: myFonts.bodyBold,
                                    }]}>{item.name}</Text>



                                    {/* price & subtotal */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={[styles.textCommon,
                                            {
                                                color: myColors.text3,
                                                fontSize: myFontSize.body,
                                                fontFamily: myFonts.bodyBold,
                                            }]}>Price: </Text>
                                            <Text style={[styles.textCommon,
                                            {
                                                fontSize: myFontSize.body,
                                                fontFamily: myFonts.heading,
                                            }]}>{item.price}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                            <Text style={[styles.textCommon,
                                            {
                                                color: myColors.text3,
                                                fontSize: myFontSize.body,
                                                fontFamily: myFonts.bodyBold,
                                            }]}>Sub Total: </Text>
                                            <Text style={[styles.textCommon,
                                            {
                                                fontSize: myFontSize.body,
                                                fontFamily: myFonts.heading,
                                            }]}>{cartItem.totalPrice} </Text>
                                        </View>
                                    </View>

                                    {item.selectOptions &&
                                        <View style={{ paddingTop: myHeight(0.4), paddingBottom: myHeight(0.2) }}>
                                            {
                                                item.selectOptions.map((option, i) =>

                                                    <View key={i} style={{ flexDirection: 'row', }}>
                                                        <Text style={[styles.textCommon,
                                                        {
                                                            fontSize: myFontSize.xSmall,
                                                            color: myColors.text,
                                                            fontFamily: myFonts.bodyBold,
                                                            paddingTop: myHeight(0.3)
                                                        }]}>{option.name}: <Text style={{ color: myColors.textL4 }}>{option.value}</Text></Text>
                                                    </View>
                                                )

                                            }


                                        </View>
                                    }

                                    <Spacer paddingT={myHeight(0.3)} />
                                    {/* plus miunus & remove */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {/* plus miunus*/}
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.75} onPress={() => {
                                                if (cartItem.quantity > 1) {
                                                    addToCart(item, -1, parseInt(item.price) * (-1))
                                                }
                                            }}>
                                                <Image style={{
                                                    height: myHeight(3.5),
                                                    width: myHeight(3.5),
                                                    marginTop: myHeight(0.7),
                                                    resizeMode: 'contain',
                                                }} source={require('../assets/home_main/home/minusBtn.png')} />
                                            </TouchableOpacity>

                                            <View style={{ minWidth: myWidth(10), alignItems: 'center' }}>

                                                <Text numberOfLines={1} style={[styles.textCommon, {
                                                    fontSize: myFontSize.xBody,
                                                    fontFamily: myFonts.body,
                                                }]}>{cartItem.quantity}</Text>

                                            </View>

                                            {/* plus */}
                                            <TouchableOpacity activeOpacity={0.75} onPress={() => {

                                                addToCart(item, 1, parseInt(item.price))

                                            }}>
                                                <Image style={{
                                                    height: myHeight(3.5),
                                                    width: myHeight(3.5),
                                                    marginTop: myHeight(0.7),
                                                    resizeMode: 'contain',
                                                }} source={require('../assets/home_main/home/plusBtn.png')} />
                                            </TouchableOpacity>
                                        </View>

                                        {/* remove */}
                                        <TouchableOpacity activeOpacity={0.6}
                                            style={{
                                                borderWidth: myHeight(0.15), borderColor: myColors.textL4,
                                                paddingHorizontal: myWidth(4), paddingVertical: myHeight(0.3),
                                                borderRadius: myWidth(1.5)
                                            }}
                                            onPress={() => {
                                                if (cartItems.length > 1) {

                                                    removeItem(item, cartItem.totalPrice)
                                                    return
                                                }
                                                removeAll()
                                            }}>
                                            <Text style={[styles.textCommon,
                                            {
                                                fontFamily: myFonts.xxSmall,
                                                fontSize: myFontSize.body
                                            }]}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                    })}

                    <Spacer paddingT={myWidth(10)} />

                </ScrollView>
                {/* <Spacer paddingT={myHeight(1.5)} /> */}
            </View>

            {/* Bottom */}
            <View style={{
                paddingHorizontal: myWidth(4.5),
                justifyContent: 'flex-end',
                borderTopStartRadius: myWidth(7),
                borderTopEndRadius: myWidth(7),
                borderWidth: 1, borderColor: myColors.dot,
                marginTop: -myWidth(7), backgroundColor: myColors.primaryL5
            }}>
                <Spacer paddingT={myHeight(2.5)} />


                {/* Amount & Items */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={[styles.textCommon, {
                            color: myColors.text, fontFamily: myFonts.bodyBold,
                            fontSize: myFontSize.body3
                        }]}>Amount</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={[styles.textCommon, {
                                color: myColors.primaryT, fontFamily: myFonts.heading,
                                fontSize: myFontSize.medium0, marginBottom: myHeight(0.45)
                            }]}>Rs. </Text>
                            <Text style={[styles.textCommon, {
                                color: myColors.primaryT, fontFamily: myFonts.heading,
                                fontSize: myFontSize.xMedium
                            }]}>{resCart.subTotal}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.textCommon, {
                            color: myColors.text, fontFamily: myFonts.bodyBold,
                            fontSize: myFontSize.body3
                        }]}>Items</Text>

                        <Text style={[styles.textCommon, {
                            color: myColors.primaryT, fontFamily: myFonts.heading,
                            fontSize: myFontSize.medium3
                        }]}>{cartItems.length}</Text>
                    </View>
                </View>

                <Spacer paddingT={myHeight(1.5)} />

                {/* Buttons */}
                <View style={{
                    width: '100%', borderRadius: myWidth(1.5),
                    flexDirection: 'row', overflow: 'hidden',
                    borderWidth: myHeight(0.15),
                    borderColor: myColors.text
                }}>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => navigation.navigate('RestaurantDetail', { item: restaurant, backScreen: 'CartDetail', params: route.params })}
                        style={{
                            flex: 0.5,
                            paddingVertical: myHeight(1), alignItems: 'center',
                            backgroundColor: myColors.background
                        }}>
                        <Text style={[styles.textCommon, {
                            color: myColors.text,
                            fontFamily: myFonts.heading,
                            fontSize: myFontSize.body4
                        }]}>Add More Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.85}
                        style={{
                            flex: 0.5,
                            paddingVertical: myHeight(1),
                            alignItems: 'center', backgroundColor: myColors.text
                        }}>
                        <Text style={[styles.textCommon, {
                            color: myColors.background,
                            fontFamily: myFonts.heading,
                            fontSize: myFontSize.body4
                        }]}>Go To Checkout</Text>
                    </TouchableOpacity>

                </View>
                <Spacer paddingT={myHeight(4.5)} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textCommon: {
        color: myColors.text,
        letterSpacing: myLetSpacing.common,
        includeFontPadding: false,
        padding: 0,
    }
})
