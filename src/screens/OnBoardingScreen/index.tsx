import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = ({navigation}: {navigation?: any}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const Skip = ({...props}) => (
    <Text style={styles.button} {...props}>
      Skip
    </Text>
  );

  const Done = ({...props}) => (
    <Text style={styles.button} {...props}>
      Done
    </Text>
  );

  const Next = ({...props}) => (
    <Text style={styles.button} {...props}>
      Next
    </Text>
  );

  const onSkip = () => {
    navigation.navigate('TabStackNavigator');
  };

  const onDone = () => {
    navigation.navigate('TabStackNavigator');
  };

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image />,
          title: 'Welcome to TattooNet!',
          subtitle: 'Track your net worth with ease',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        // {
        //   backgroundColor: '#fff',
        //   image: <Image />,
        //   title: 'Set up your profile',
        //   subtitle: 'Enter your name and email address',
        //   titleStyles: styles.title,
        //   subTitleStyles: styles.subtitle,
        // },
        // {
        //   backgroundColor: '#fff',
        //   image: <Image />,
        //   title: 'Add your assets',
        //   subtitle: 'Bank accounts, investments, real estate, and more',
        //   titleStyles: styles.title,
        //   subTitleStyles: styles.subtitle,
        // },
        // {
        //   backgroundColor: '#fff',
        //   image: <Image />,
        //   title: 'Add your liabilities',
        //   subtitle: 'Loans, mortgages, and credit card debts',
        //   titleStyles: styles.title,
        //   subTitleStyles: styles.subtitle,
        // },
      ]}
      bottomBarColor={theme.colors.background}
      showSkip={true}
      showDone={true}
      onSkip={onSkip}
      onDone={onDone}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      NextButtonComponent={Next}
    />
  );
};

const makeStyles = makeStyleSheet(theme => ({
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: theme.space.m,
  },
  subtitle: {
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.space.l,
  },
  button: {
    fontSize: theme.fontSizes.large,
    color: '#555',
    marginRight: theme.space.s,
  },
}));

export default OnBoardingScreen;
