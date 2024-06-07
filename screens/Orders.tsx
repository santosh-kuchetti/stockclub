import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationTypes} from '../types/Types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import styles from '../styles/Global';
import {removeOrdersData} from '../store/app/app-slice';
import Toast from 'react-native-toast-message';
import SwipeButton from 'rn-swipe-button';

const Orders = ({navigation}: NavigationTypes) => {
  const dispatch = useAppDispatch();
  const {ordersData} = useAppSelector(state => state.app);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [swipeStatusMessage, setSwipeStatusMessage] =
    useState<string>('Swipe to Buy');

  const handleRemoveOrder = async (id: string) => {
    try {
      setLoadingItemId(id);
      setTimeout(() => {
        dispatch(removeOrdersData(id));
        setLoadingItemId(null);
      }, 500);
    } catch (error) {
      setLoadingItemId(null);
      Toast.show({
        type: 'error',
        text1: 'Error in removing order',
      });
    }
  };
  const updateSwipeStatusMessage = (message: string) =>
    setSwipeStatusMessage(message);
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <View style={styles.stockInfoContainer}>
          <Image source={require('../assets/images/applelogo.png')} />
        </View>
        <View>
          <Text style={styles.stockName}>{item.symbol.split(':')[0]}</Text>
          <Text style={styles.stockFullName}>{item.name}</Text>
          <View style={styles.stockprices}>
            <Text style={styles.stockprice}>${item.price}</Text>
            <Text style={item.change > 0 ? styles.greenArrow : styles.redArrow}>
              {item.change > 1.5 ? '▲' : '▼'} {Math.abs(item.change)}%
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveOrder(item.google_mid)}>
        {loadingItemId === item.google_mid ? (
          <ActivityIndicator size={26} color="black" />
        ) : (
          <Image source={require('../assets/images/delete.png')} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SwipeIconCompo = () => {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/images/swipe.png')} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{top: '10%', gap: 10, marginHorizontal: 20}}>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}>
            Open Orders
          </Text>
          {ordersData.length > 0 ? (
            <FlatList
              data={ordersData}
              renderItem={renderItem}
              keyExtractor={item => item.google_mid}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'medium',
                  marginHorizontal: 10,
                }}>
                No orders
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{marginBottom: 30, width: '70%', marginHorizontal: '15%'}}>
        <SwipeButton
          railBackgroundColor="#FFF5D1"
          railBorderColor="#FFF5D1"
          title={swipeStatusMessage}
          onSwipeFail={() => updateSwipeStatusMessage('Swipe to Buy')}
          onSwipeStart={() => updateSwipeStatusMessage('Release')}
          onSwipeSuccess={() => {
            Toast.show({
              type: 'success',
              text1: 'Your Purchase order for  is completed',
            });
            updateSwipeStatusMessage('Confirmed');
          }}
          thumbIconComponent={SwipeIconCompo}
          titleStyles={styles.stockName}
          railStyles={{
            backgroundColor:
              swipeStatusMessage === 'Confirmed'
                ? 'rgba(52, 199, 89,0.3)'
                : '#FFF5D1',
            borderColor: '#FFF5D1',
          }}
        />
      </View>
    </View>
  );
};

export default Orders;
