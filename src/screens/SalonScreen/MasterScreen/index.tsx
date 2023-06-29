import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext, useEffect} from 'react';
import MasterProfileHeader from './components/MasterProfileHeader';
import FloatingInfo from './components/FloatingInfo';
import TattoosList from './components/TattoosList';
import {AppContext} from 'providers/AppProvider';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export default function MasterScreen({route}: {route: {params: {id: string}}}) {
  const context = useContext(AppContext);
  const {id} = route.params || {};
  const styles = makeStyles();

  useEffect(() => {
    context.master.getMaster({id});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <MasterSkeleton /> */}
      <MasterProfileHeader />
      <FloatingInfo master={false} />
      <TattoosList id={id} />
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.space.s,
  },
}));
