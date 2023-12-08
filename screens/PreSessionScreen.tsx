import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

const PreSessionScreen: React.FC = () => {
  const navigation: NavigationProp<ReactNavigation.RootParamList> =
    useNavigation();

  const startConversation = (): void => {
    navigation.dispatch(CommonActions.navigate({name: 'Chat'}));
  };
  const close = (): void => {
    navigation.dispatch(CommonActions.navigate({name: 'Greetings'}));
  };
  return (
    <View style={styles.container}>
      {/* Надпись Yuna: Personal AI Growth Companion */}
      <Text style={styles.title}>Yuna: Personal AI Growth Companion</Text>
      <Image
        source={require('../public/img/06025bc0fe98fa54481b2908df009e7e.jpeg')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={(): void => {
              startConversation();
            }}>
            <Image
              source={require('../public/img/Frame_48095716.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Text Chat</Text>
        </View>

        <View style={{width: 40}} />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={(): void => {
              close();
            }}>
            <Image
              source={require('../public/img/Vector_(1).png')}
              style={styles.iconRight}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Close</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F0ED',
  },
  title: {
    color: 'rgba(30, 34, 32, 0.70)',
    marginBottom: 198.5,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16.8,
  },
  image: {
    marginBottom: 171,
    width: 240,
    height: 240,
    borderRadius: 1000,
    flexShrink: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 40,
    backgroundColor: '#FFF',
    width: 64,
    height: 64,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    marginTop: 8,
    fontFamily: 'Stara',
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(30, 34, 32, 0.70)',
  },
  icon: {
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  iconRight: {
    width: 16,
    height: 16,
    flexShrink: 0,
  },
});

export default PreSessionScreen;
