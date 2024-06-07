import {
  Dimensions,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
} from 'react-native';

const {width} = Dimensions.get('window');

type StyleType = ViewStyle | TextStyle | ImageStyle;

interface Styles extends Record<string, StyleType> {
  loginScreen: ViewStyle;
  splashScreen: ViewStyle;
  logo: ImageStyle;
  textFieldWrapStyle: TextStyle;
  signin: TextStyle;
  signinButtonStyle: ViewStyle;
  loginLogoView: ViewStyle;
  userFields: ViewStyle;
  loginLogo: ImageStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  splashScreen: {
    backgroundColor: '#0A0A0A',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginScreen: {
    backgroundColor: '#0A0A0A',
  },
  userFields: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textFieldWrapStyle: {
    width: '80%',
    paddingTop: 8,
    borderColor: '#ECD996',
    borderWidth: 1,
    borderRadius: 5,
    color: '#ECD996',
    fontSize: 18,
    paddingLeft: 10,
  },
  signin: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signinButtonStyle: {
    backgroundColor: '#ECD996',
    height: 48,
    width: '80%',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ECD996',
    borderWidth: 1.0,
    ...(Platform.OS === 'web' && {cursor: 'pointer'}),
  },
  errors: {
    width: '80%',
    color: 'red',
    textAlign: 'left',
    marginTop: 2,
  },
  loginLogoView: {
    width: '100%',
    top: '10%',
    alignItems: 'center',
  },
  loginLogo: {
    width: 50,
    height: 80,
  },

  //homescreen
  stockprices: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bar: {
    height: 7,
    width: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',

    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  seachContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    position: 'absolute',
    top: -8,
    left: 16,
    right: 16,
    backgroundColor: '#EBEBEB',
    height: 58,
    borderRadius: 5,
  },
  animatedView: {
    zIndex: 1,
    height: 100,
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical:5
  },
  searchInput: {
    fontSize: 18,
  },

  listContainer: {
    paddingTop: 200,
  },
  stockItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 18.5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 0.8,
  },
  stockItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  stockInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 79,
  },
  stockName: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  stockNameLogo: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  stockprice: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 3,
  },
  stockFullName: {
    fontSize: 16,
    color: '#999999',
    fontWeight: 'medium',
  },
  stockTicker: {
    fontSize: 14,
    color: '#666',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  greenArrow: {
    color: '#34C759',
    fontWeight: 'bold',
  },
  redArrow: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  paginationContainer: {
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  pagination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;
