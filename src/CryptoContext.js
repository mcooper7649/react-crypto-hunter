import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../src/config/api';
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹');
    else if (currency === 'USD') setSymbol('$');

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <Crypto.Provider
      value={{ currency, setCurrency, symbol, coins, loading, alert, setAlert }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
