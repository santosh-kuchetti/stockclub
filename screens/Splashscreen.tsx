import React, {useEffect} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import styles from '../styles/Global';
import {NavigationTypes} from '../types/Types';
import {useAppSelector} from '../store/hooks';

const Splashscreen = ({navigation}: NavigationTypes) => {
    const { login } = useAppSelector(state => state.app);
  useEffect(() => {
    async function initializeApp() {
      setTimeout(() => {
        if (login) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    }

    initializeApp();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.splashScreen}>
        <Image source={require('../assets/images/logo.png')} />
      </View>
    </SafeAreaView>
  );
};

export default Splashscreen;
