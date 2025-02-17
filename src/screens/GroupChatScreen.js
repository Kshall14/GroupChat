import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; // Add this import
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessagesRequest, sendMessageRequest } from '../redux/slices/DatabaseSlices.js';
import BackgroundImage from '../components/AppBackground.js';
import { app } from '../../firebaseConfig.js';

const GroupChatScreen = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.groupChat);
  const auth = getAuth(app); // Initialize auth

  useEffect(() => {
    dispatch(fetchMessagesRequest());
  }, [dispatch]);

  const sendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessageRequest({ message }));
      setMessage('');
    }
  };

  if (loading) {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </BackgroundImage>
    );
  }

  if (error) {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Text>Error: {error}</Text>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.displayName === auth.currentUser?.displayName && styles.currentUserMessage,
              ]}
            >
              <Text style={styles.displayName}>
                {item.displayName}{' '}
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="#FFFFFF"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '60%',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#e6e6e6',
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    placeholderTextColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6', // Light green background for current user
  },
});

export default GroupChatScreen;