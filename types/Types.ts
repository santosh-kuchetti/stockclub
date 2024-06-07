export type NavigationTypes = {
  navigation: any;
};

export type TrendsType = {
  symbol: string;
  type: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
  previous_close: number;
  pre_or_post_market: number;
  pre_or_post_market_change: number;
  pre_or_post_market_change_percent: number;
  last_update_utc: string;
  currency: string;
  exchange: string;
  exchange_open: string;
  exchange_close: string;
  timezone: string;
  utc_offset_sec: number;
  country_code: string;
  google_mid: string;
};
