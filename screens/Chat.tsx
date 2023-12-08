import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import io, {Socket} from 'socket.io-client';

interface Message {
  content: string;
  from: 'User' | 'AI';
}

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  // String for connection to the web socket on the Backend
  // Port 801 is preinstalled
  const connectionString: string = `ws://localhost:801`;

  useEffect(() => {
    const newSocket = io(connectionString, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (message: string) => {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];

        if (lastMessage?.from === 'AI') {
          return prevMessages.map((msg, index) =>
            index === prevMessages.length - 1
              ? {...msg, content: msg.content + message}
              : msg,
          );
        } else {
          return [
            ...prevMessages,
            {content: message, from: 'AI', isPrinting: true},
          ];
        }
      });
    });

    newSocket.on('connect_error', error => {
      console.error('Socket connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && socket) {
      socket.send(inputMessage);
      setMessages(prevMessages => [
        ...prevMessages,
        {content: inputMessage, from: 'User'},
      ]);
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.messageContainer,
              item.from === 'AI'
                ? styles.aiMessageContainer
                : styles.userMessageContainer,
            ]}>
            {item.from === 'AI' && (
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../public/img/avatar.png')}
                  style={styles.avatar}
                />
              </View>
            )}
            <Text
              style={
                item.from === 'AI'
                  ? styles.aiMessageText
                  : styles.userMessageText
              }>
              {item.content}
            </Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={text => setInputMessage(text)}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Image
              source={require('../public/img/Vector.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    padding: 12,
    marginVertical: 3,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    overflow: 'hidden',
  },
  aiMessageContainer: {
    backgroundColor: 'none',
    alignSelf: 'flex-start',
    borderColor: '#DDD',
    borderRadius: 16,
  },
  userMessageContainer: {
    width: 241,
    marginRight: 16,
    backgroundColor: '#4A00E7',
    alignSelf: 'flex-end',
  },
  aiMessageText: {
    color: '#1E2220',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: -0.0175,
    flex: 1,
  },
  userMessageText: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: -0.0175,
    flex: 1,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: 'lightgray',
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  input: {
    paddingLeft: 24,
    paddingEnd: 50,
    width: '100%',
    height: 65,
    flexShrink: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#FFF',
    color: '#1E2220',
    fontFamily: 'Stara',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  inputWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    position: 'absolute',
    left: '90%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 18,
    height: 16,
  },
});

export default Chat;
