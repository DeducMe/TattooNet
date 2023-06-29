import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useProfile() {
  const context = useContext(MainContext);
  const [loading, setLoading] = useState({
    users: false,
  });
  const [users, setUsers] = useState([]);

  async function getUsers({query, page, limit}) {
    setLoading({...loading, users: true});
    const response = await context.auth.apiRequestContainer({
      call: 'profile/search',
      method: 'POST',
      body: {query, page, limit},
    });

    if (response.success) setUsers(response.data.profile);
    setLoading({...loading, users: false});
  }

  return {
    getUsers,
    users,
    loading,
  };
}
