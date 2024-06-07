import React, {useCallback, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setTrendsData} from '../store/app/app-slice';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationTypes} from '../types/Types';
import styles from '../styles/Global';
import {Input} from 'react-native-elements';

const HomeScreen = ({navigation}: NavigationTypes) => {
  const dispatch = useAppDispatch();
  const {trendsData} = useAppSelector(state => state.app);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBarTranslateY] = useState(new Animated.Value(0));
  const animatedBackgroundColor = searchBarTranslateY.interpolate({
    inputRange: [10, 5000],
    outputRange: ['white', 'transparent'],
  });

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [visibleDescriptions, setVisibleDescriptions] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const totalPages = isSearching
    ? Math.ceil(searchResults.length / itemsPerPage)
    : Math.ceil(trendsData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let trends = isSearching
    ? searchResults.slice(startIndex, endIndex)
    : trendsData.slice(startIndex, endIndex);

  useFocusEffect(
    useCallback(() => {
      const getFinanceData = async () => {
        try {
          if (trends.length == 0) {
            const response = await axios.get(
              `https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=GAINERS&country=us&language=en`,
              {
                headers: {
                  'x-rapidapi-key':
                    '5afbe69320msh44948249dff83f2p13abcejsncc293f6c9d5e',
                  'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
                },
              },
            );
            dispatch(setTrendsData(response.data.data.trends));
          }
        } catch (err) {
          Toast.show({
            type: 'error',
            text1: 'Error while getting data',
          });
        }
      };

      getFinanceData();
    }, []),
  );

  const handleSearch = useCallback(async query => {
    try {
      const response = await axios.get(
        `https://real-time-finance-data.p.rapidapi.com/search?query=${query}&language=en`,
        {
          headers: {
            'x-rapidapi-key':
              '5afbe69320msh44948249dff83f2p13abcejsncc293f6c9d5e',
            'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
          },
        },
      );
      setSearchResults(response.data.data.stock);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: `${err}`,
      });
    }
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), [
    handleSearch,
  ]);

  const handleSearchChange = text => {
    setSearchQuery(text);
    setIsSearching(true);
    if (text.trim()) {
      debouncedHandleSearch(text);
    } else {
      setSearchResults([]);
    }
  };

  const handleLongPress = itemId => {
    setVisibleDescriptions(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
  const renderItem = ({item}) => {
    if (isSearching) {
      return (
        <TouchableOpacity
          onLongPress={() => handleLongPress(item.google_mid)}
          onPress={() => navigation.push('Details', item)}
          activeOpacity={0.8}
          style={[
            styles.stockItem,
            visibleDescriptions[item.google_mid]
              ? {backgroundColor: 'lightgray'}
              : null,
          ]}>
          <View style={styles.stockItemContainer}>
            <View style={styles.stockInfoContainer}>
              <Text style={styles.stockNameLogo}>
                {item.symbol.split(':')[0].slice(0, 3)}
              </Text>
              <Image source={require('../assets/images/stock.png')} />
            </View>
            <View>
              <Text style={styles.stockName}>{item.symbol.split(':')[0]}</Text>
              <Text style={styles.stockFullName}>{item.name}</Text>
              <View style={styles.stockprices}>
                <Text style={styles.stockprice}>${item.price}</Text>
                <Text
                  style={item.change > 0 ? styles.greenArrow : styles.redArrow}>
                  {item.change > 1.5 ? '▲' : '▼'} {Math.abs(item.change)}%
                </Text>
              </View>
            </View>
          </View>
          {visibleDescriptions[item.google_mid] && (
            <View>
              <Text style={styles.stockName}>Lorem ipsum dolor</Text>
              <Text style={{color: '#090909', fontWeight: '600', fontSize: 16}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onLongPress={() => handleLongPress(item.google_mid)}
          onPress={() => navigation.push('Details', item)}
          activeOpacity={0.8}
          style={[
            styles.stockItem,
            visibleDescriptions[item.google_mid]
              ? {backgroundColor: 'lightgray'}
              : null,
          ]}>
          <View style={styles.stockItemContainer}>
            <View style={styles.stockInfoContainer}>
              <Text style={styles.stockNameLogo}>
                {item.symbol.split(':')[0].slice(0, 3)}
              </Text>
              <Image source={require('../assets/images/stock.png')} />
            </View>
            <View>
              <Text style={styles.stockName}>{item.symbol.split(':')[0]}</Text>
              <Text style={styles.stockFullName}>{item.name}</Text>
              <View style={styles.stockprices}>
                <Text style={styles.stockprice}>${item.price}</Text>
                <Text
                  style={item.change > 0 ? styles.greenArrow : styles.redArrow}>
                  {item.change > 1.5 ? '▲' : '▼'} {Math.abs(item.change)}%
                </Text>
              </View>
            </View>
          </View>
          {visibleDescriptions[item.google_mid] && (
            <View>
              <Text style={styles.stockName}>Lorem ipsum dolor</Text>
              <Text style={{color: '#090909', fontWeight: '600', fontSize: 16}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }
  };

  const handleScroll = event => {
    if (!isSearching) {
      const scrollY = event.nativeEvent.contentOffset.y;
      const translateY = scrollY > 150 ? 0 : -50;
      Animated.timing(searchBarTranslateY, {
        toValue: translateY,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const loadNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const loadPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleOutsidePress = () => {
    setIsSearching(false);
    Keyboard.dismiss();
  };

  return (
    <View style={isSearching ? styles.seachContainer : styles.container}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              transform: [
                {
                  translateY: isSearching ? 0 : searchBarTranslateY,
                },
              ],
              backgroundColor: animatedBackgroundColor,
            },
          ]}>
          <View style={styles.searchBar}>
            <Input
              style={styles.searchInput}
              placeholder="Search for stocks"
              value={searchQuery}
              onChangeText={handleSearchChange}
              leftIcon={
                <Image source={require('../assets/images/search.png')} />
              }
              inputContainerStyle={{borderBottomWidth: 0, paddingVertical: 5}}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <FlatList
        data={[{}]}
        renderItem={() => null}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            {!isSearching ? (
              <View style={styles.flatContainer}>
                <View
                  style={{width: '100%', alignItems: 'center', marginTop: 14}}>
                  <View style={styles.bar} />
                </View>
                <FlatList
                  data={trends}
                  renderItem={renderItem}
                  keyExtractor={item => item.google_mid}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                />
              </View>
            ) : (
              <FlatList
                data={trends}
                renderItem={renderItem}
                keyExtractor={item => item.google_mid}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              />
            )}
          </>
        }
      />
      <View style={styles.paginationContainer}>
        <Text onPress={loadPreviousPage} style={styles.paginationText}>
          Prev
        </Text>
        <Text style={styles.pagination}>{`${page} / ${totalPages}`}</Text>
        <Text onPress={loadNextPage} style={styles.paginationText}>
          Next
        </Text>
      </View>
      <View></View>
    </View>
  );
};

export default HomeScreen;
