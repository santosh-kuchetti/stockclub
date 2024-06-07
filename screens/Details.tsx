import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationTypes, TrendsType} from '../types/Types';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import styles from '../styles/Global';
import {removeOrdersData, setOrdersData} from '../store/app/app-slice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import Toast from 'react-native-toast-message';

const Details = ({navigation}: NavigationTypes) => {
  const dispatch = useAppDispatch();
  const {ordersData} = useAppSelector(state => state.app);
  const [isPresent, setIsPresent] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const found = ordersData.some(
        data => data.google_mid === item.google_mid,
      );
      setIsPresent(found);
    }, []),
  );

  const route = useRoute<RouteProp<{params: TrendsType}, 'params'>>();
  let item = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleAddOrder = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        if (isPresent) {
          dispatch(removeOrdersData(item.google_mid));
        } else {
          dispatch(setOrdersData(item));
        }
        navigation.push('Orders');
        setIsLoading(false);
      }, 500);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error in adding order',
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'space-between', padding: 20}}>
        <View style={{gap: 20, marginTop: '20%'}}>
          <View>
            <Image source={require('../assets/images/applelogo.png')} />
          </View>
          <View>
            <Text style={styles.stockName}>{item.symbol.split(':')[0]}</Text>
            <Text style={styles.stockFullName}>{item.name}</Text>
            <View style={[styles.stockprices, {flexDirection: 'column'}]}>
              <Text style={styles.stockprice}>${item.price}</Text>
              <Text
                style={item.change > 0 ? styles.greenArrow : styles.redArrow}>
                {item.change > 1.5 ? '▲' : '▼'} {Math.abs(item.change)}%
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.stockName}>Lorem ipsum dolor</Text>
            <Text style={{color: '#090909', fontWeight: '600', fontSize: 16}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <View>
            <Text style={styles.stockName}>Lorem ipsum dolor</Text>
            <Text style={{color: '#090909', fontWeight: '600', fontSize: 16}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleAddOrder()}
          style={{
            backgroundColor: '#ECD996',
            height: 48,
            width: '100%',
            alignSelf: 'center',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#ECD996',
            borderWidth: 1.0,
            marginBottom: 20,
          }}>
          {isLoading ? (
            <ActivityIndicator size={26} color="black" />
          ) : (
            <Text style={styles.signin}>
              {isPresent ? 'Remove from orders' : 'Add to orders'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;
