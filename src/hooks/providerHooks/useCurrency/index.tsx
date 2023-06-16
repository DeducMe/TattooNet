import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {apiRequest} from 'common/config';
import {AppContext, CurrencyT} from 'providers/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useCurrency() {
  const context = useContext(AppContext);
  const [currency, setCurrency] = useState<CurrencyT[]>();
  const [chosenId, setChosenId] = useState<string | null>(null);

  async function getCurrencyApi() {
    const getCurrency = await apiRequest('currency/list', 'POST', {});

    console.log(getCurrency, 'ALO');
    setCurrency(getCurrency.currency);
  }

  useEffect(() => {
    getCurrencyApi().catch(e => console.log(e));

    const start = async () => {
      const storageChosenId = await AsyncStorage.getItem('currencyChosenId');
      setChosenId(storageChosenId);
    };

    start();
  }, []);

  useEffect(() => {
    if (chosenId) {
      AsyncStorage.setItem('currencyChosenId', chosenId);
    }
  }, [chosenId]);

  return {currency, setChosenId, chosenId};
}
