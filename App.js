import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Platform, TouchableOpacity, StyleSheet } from 'react-native';
// import { MMKV } from 'react-native-mmkv';
import { myColors } from './ultils/myColors';
import { myHeight, printWithPlat } from './game/common';
import { AppNavigator } from './game/app_navigator';

import SplashScreen from 'react-native-splash-screen'
// import { enableLatestRenderer } from 'react-native-maps';

// enableLatestRenderer();
// const storage = new MMKV()



export default function App() {

  useEffect(() => {
    printWithPlat('Started Successfully')
    SplashScreen.hide()
    // const dispatch = useDispatch()
    // dispatch(setCart(getCartLocal()))
    // console.log(typeof getCartLocal())
    // printWithPlat("Is MMKV store successful? " + storage.contains('mberr'))
  }, [])
  const isAndroid = Platform.OS == 'android'
  // const OsVer = Platform.constants['Release']; Android Version like 9,10, 11
  const OsVer = Platform.Version; //API level like 27, 28, 22 

  return (
    <>
      {OsVer >= 23 &&
        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      }
      <AppNavigator />
    </>
  );
}

