import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { MMKV } from 'react-native-mmkv';
import { myColors } from './ultils/myColors';
import { myHeight, printWithPlat } from './game/common';
import { AppNavigator } from './game/app_navigator';
import { Provider, useDispatch } from 'react-redux';

import SplashScreen from 'react-native-splash-screen'
import storeRedux from './store_redux';
import { setMute } from './redux/states_reducer';
import { getMuteStorage } from './game/storageFun';
import KeepAwake from 'react-native-keep-awake';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
const myId = '20230920170218702' + (myHeight(100)).toFixed().toString()
// import { enableLatestRenderer } from 'react-native-maps';

// enableLatestRenderer();
// const storage = new MMKV()



export default function App() {

  useEffect(() => {
    printWithPlat('Started Successfully')
    SplashScreen.hide()
    KeepAwake.activate();
    // console.log(getDateInt(new Date()))

    // console.log()

    // setInterval(() => {
    //   const st = new Date().toUTCString()

    //   database()
    //     .ref(`/game/playing`).child(myId).update({
    //       active: st
    //     })
    // }, 10000)

    // const s = new Date().toString()
    // database()
    //   .ref(`/game/playing`).child(getDateInt(new Date()))
    //   .set({
    //     player1: 'rafay5',
    //     player2: 'rafay6',
    //     active: s,
    //   }).then(() => {
    //     // console.log('Han Ustaad Hogaya', d)

    //   })
    //   .catch((er) => {
    //     console.log('Error on set order',)

    //   })

  }, [])
  const isAndroid = Platform.OS == 'android'
  // const OsVer = Platform.constants['Release']; Android Version like 9,10, 11
  const OsVer = Platform.Version; //API level like 27, 28, 22 

  return (
    <>
      {OsVer >= 23 &&
        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      }

      <Provider store={storeRedux}>
        <AppNavigator />
      </Provider>
    </>
  );
}

