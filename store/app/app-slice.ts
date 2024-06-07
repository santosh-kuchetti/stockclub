import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TrendsType} from '../../types/Types';

interface AppState {
  login: boolean;
  trendsData: TrendsType[];
  ordersData: TrendsType[];
}

const initaialAppState: AppState = {
  login: false,
  trendsData: [],
  ordersData: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initaialAppState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
    setTrendsData: (state, action: PayloadAction<TrendsType[]>) => {
      state.trendsData = action.payload;
    },
    setOrdersData: (state, action: PayloadAction<TrendsType>) => {
      state.ordersData = [...state.ordersData, action.payload];
    },
    removeOrdersData: (state, action: PayloadAction<string>) => {
      let data = state.ordersData;
      let filteredData = data.filter(
        item => item.google_mid !== action.payload,
      );
      state.ordersData = filteredData;
    },
  },
});

export const {setLogin, setTrendsData, setOrdersData, removeOrdersData} =
  appSlice.actions;
export default appSlice.reducer;
