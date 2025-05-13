interface CryptoWalletItem {
  id: string;
  amount: number;
  unit: string;
  comment?: string;
}

interface CryptoItem {
  id: string;
  name: string;
  price: number;
  lastCheck: string;
  img: string;
}

export interface FavoritesState {
  value: string[];
}

export interface CarouselState {
  activeIndex: number;
  items: CryptoItem[];
}

export interface UserDataState {
  walletId: string;
  walletValue: number;
  wallet: {
    [cryptoId: string]: CryptoWalletItem;
  };
}
