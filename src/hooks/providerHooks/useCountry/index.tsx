import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {apiRequest} from 'common/config';
import {AppContext, CityT, CountryT} from 'providers/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useCountry() {
  const [country, setCountry] = useState<CountryT[]>([]);
  const [city, setCity] = useState<CityT[]>([]);

  const [countryChosenId, setCountryChosenId] = useState<string | null>(null);
  const [cityChosenId, setCityChosenId] = useState<string | null>(null);

  async function getCountryApi() {
    console.log('ALO');
    const {data} = await apiRequest('country', 'GET');
    console.log(data, 'COUNTRY');
    setCountry(data.country);
  }

  async function getCityApi() {
    const {data} = await apiRequest('city', 'GET');

    setCity(data.city);
  }

  useEffect(() => {
    getCountryApi().catch(e => console.log(e));
    getCityApi().catch(e => console.log(e));

    const start = async () => {
      const countryChosenId = await AsyncStorage.getItem('countryChosenId');
      const cityChosenId = await AsyncStorage.getItem('cityChosenId');

      setCountryChosenId(countryChosenId);
      setCityChosenId(cityChosenId);
    };

    start();
  }, []);

  useEffect(() => {
    if (countryChosenId) {
      AsyncStorage.setItem('countryChosenId', countryChosenId);
    }
  }, [countryChosenId]);

  useEffect(() => {
    if (cityChosenId) {
      AsyncStorage.setItem('countryChosenId', cityChosenId);
    }
  }, [cityChosenId]);

  return {
    country,
    city,
    setCountryChosenId,
    setCityChosenId,
    countryChosenId,
    cityChosenId,
  };
}
