import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {apiRequest} from 'common/config';
import {CurrencyT} from 'providers/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyT[]>();
  const [chosenId, setChosenId] = useState<string | null>(null);

  async function getCurrencyApi() {
    const getCurrency = await apiRequest(
      'currency/list',
      'POST',
      null,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTIwYTIxZmUwNzliNWQ3OWVhNmUyMCIsImxvZ2luIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODIwMDU2MTN9.jzTWTUmsyRF5lGcsJp363mGp4_rdlmcAAEX7KSZPNWI',
    );
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
