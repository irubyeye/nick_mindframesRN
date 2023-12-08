import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

const ChatScreen = () => {
  const navigation: NavigationProp<ReactNavigation.RootParamList> =
    useNavigation();

  const startConversation = () => {
    navigation.dispatch(CommonActions.navigate({name: 'PreSession'}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ready for a Chat? <Text style={styles.highlight}>Yuna Awaits.</Text>
      </Text>
      <Image
        source={require('../public/img/06025bc0fe98fa54481b2908df009e7e.jpeg')}
        style={styles.image}
      />
      <Text style={styles.policyText}>
        By clicking Start conversation you agree to our{' '}
        <Text style={styles.termsService}>Terms & Service</Text>
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={startConversation}>
        <Text style={styles.startButtonText}>Start Conversation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F0ED',
  },
  title: {
    marginBottom: 73,
    color: '#1E2220',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Fraunces',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 40,
    width: 317,
    flexShrink: 0,
  },

  highlight: {
    color: '#66BA24',
  },
  image: {
    borderRadius: 1000,
    width: 230,
    height: 230,
    flexShrink: 0,
    marginTop: 20,
  },
  policyText: {
    marginTop: 136,
    marginBottom: 24,
    color: '#1E2220',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    width: 222,
    height: 44,
    flexShrink: 0,
  },
  termsService: {
    color: '#5ABF0B',
  },
  startButton: {
    marginTop: 20,
    display: 'flex',
    paddingVertical: 22,
    paddingHorizontal: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 40,
    backgroundColor: '#115430',
  },
  startButtonText: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default ChatScreen;
