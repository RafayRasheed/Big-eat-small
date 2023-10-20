import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { MMKV } from 'react-native-mmkv';
import { myColors } from './ultils/myColors';
import { myHeight, printWithPlat } from './game/common';
import { AppNavigator } from './game/app_navigator';
import { Provider, useDispatch } from 'react-redux';

import SplashScreen from 'react-native-splash-screen'
import storeRedux from './redux/store_redux';
import { setMute } from './redux/states_reducer';
import { getMuteStorage } from './game/storageFun';
import KeepAwake from 'react-native-keep-awake';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

// import { enableLatestRenderer } from 'react-native-maps';

// enableLatestRenderer();
// const storage = new MMKV()



export default function App() {
  function Yes() {

    database()
      .ref(`/game/playing`)
      // .orderByKey()
      .once('value')
      .then(snapshot => {
        let s = 0
        let found = null
        let deleted = []
        snapshot.forEach(documentSnapshot1 => {
          const order = documentSnapshot1.val()
          const s1 = new Date(order.active)
          const s2 = new Date()
          const time = (((s2 - s1) / 1000) / 60).toFixed(2)

          console.log(time)
          if (time > 2) {

            deleted.push(documentSnapshot1.key)
            return
          }

          // if (found) {
          //   return
          // }

          if (order.player1) {
            s += 1

          }
          if (order.player2) {
            s += 1
            return
          }
          if (!order.player2 && time < 1 && !found) {
            found = documentSnapshot1.key
            return

          }

        });
        console.log('Players Online', s)
        console.log('Player Game', found)
        console.log('Deleted Game', deleted)


      })
      .catch((er) => {
        console.log('Error on set order',)

      });

  }
  function getDateInt(date) {
    const adjustSting = function (string, size) {
      const len = string.length
      let myStr = ''
      for (let i = 0; i < size - len; i++) {
        myStr += '0'
      }
      return (myStr + string)

    }

    const year = adjustSting(date.getUTCFullYear().toString(), 2)
    const month = adjustSting(date.getUTCMonth().toString(), 2)
    const day = adjustSting(date.getUTCDate().toString(), 2)
    const hours = adjustSting(date.getUTCHours().toString(), 2)
    const minutes = adjustSting(date.getUTCMinutes().toString(), 2)
    const seconds = adjustSting(date.getUTCSeconds().toString(), 2)
    const mili = adjustSting(date.getUTCMilliseconds().toString(), 3)
    const code = year + month + day + hours + minutes + seconds + mili

    return code


  }
  useEffect(() => {
    printWithPlat('Started Successfully')
    SplashScreen.hide()
    KeepAwake.activate();
    // console.log(getDateInt(new Date()))
    Yes()
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

