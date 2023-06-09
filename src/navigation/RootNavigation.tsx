import React, {useContext, useEffect, useState} from 'react';
import InitialNavigator from '../navigation/InititalNavigator';
import AuthorizationNavigator from '../navigation/AuthorizationNavigator';
import {AppContext} from '../providers/AppProvider';

export default function RootNavigation() {
  const context = useContext(AppContext);
  return !!context.auth.user ? (
    <InitialNavigator />
  ) : (
    <AuthorizationNavigator />
  );
}
