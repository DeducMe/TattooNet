import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export const EmtyComponentBlock: React.FC<IEmtyComponentBlockProps> = ({
  grayed,
}) => {
  const theme = useTheme();
  const styles = makeStyles();
  return (
    <View style={[styles.container, grayed && styles.containerGrayed]}>
      <View style={styles.emptyRound}></View>
      <View style={styles.linesContainer}>
        <View style={styles.line}></View>
        <View style={[styles.line, {width: '70%'}]}></View>
        <View
          style={[
            styles.line,
            {
              width: '30%',
              backgroundColor: grayed ? theme.colors.primary : 'red',
            },
          ]}></View>
      </View>
    </View>
  );
};

const makeStyles = makeStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    marginBottom: theme.space.s,
    marginHorizontal: theme.space.s,
    ...theme.defaultShadow,
    backgroundColor: theme.colors.background,
    padding: theme.space.s,
    borderRadius: theme.space.s,
  },
  containerGrayed: {
    opacity: 0.5,
  },
  emptyRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'gray',
  },
  linesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: theme.space.s,
    paddingVertical: theme.space.xxs,
  },
  line: {
    backgroundColor: 'gray',

    borderRadius: theme.space.s,
    padding: theme.space.xxs,
    width: '100%',
  },
}));

export interface IEmtyComponentBlockProps {
  grayed?: boolean;
}
