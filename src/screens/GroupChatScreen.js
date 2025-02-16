import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Add this import
import { app } from '../../firebaseConfig.js';

const GroupChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const db = getDatabase(app);
  const messagesRef = ref(db, 'messages');
  const auth = getAuth(app); // Add this line

  // Fetch messages from Firebase
  useEffect(() => {
    console.log('Setting up Firebase listener...');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      console.log('Received data from Firebase:', snapshot.val());
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log('Messages fetched:', messageList);
        setMessages(messageList);
      } else {
        console.log('No messages found in Firebase.');
      }
    });

    return () => {
      console.log('Cleaning up Firebase listener...');
      unsubscribe();
    };
  }, []);

  // Send a new message
  const sendMessage = () => {
    console.log('Send button pressed. Current message:', message);
    console.log('Current user:', auth.currentUser); // Log the current user
  
    if (message.trim()) {
      // Check if the user is authenticated and has a display name
      if (auth.currentUser && auth.currentUser.displayName) {
        console.log('Pushing message to Firebase...');
        console.log('Database reference:', messagesRef.toString()); // Log the database reference
  
        // Push the message to Firebase with the display name
        push(messagesRef, {
          text: message,
          timestamp: Date.now(),
          displayName: auth.currentUser.displayName, // Add the display name
        })
          .then(() => {
            console.log('Message successfully sent to Firebase.');
            setMessage(''); // Clear input
          })
          .catch((error) => {
            console.error('Error sending message to Firebase:', error);
          });
      } else {
        console.error('User is not authenticated or does not have a display name.');
      }
    } else {
      console.log('Message is empty. Not sending.');
    }
  };
  /*
const flatListRef = useRef(null);
useEffect(() => {
  if (flatListRef.current && messages.length > 0) {
    flatListRef.current.scrollToEnd({ animated: true });
  }
}, [messages]);
*/
  return (
    <View style={styles.container}>
      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.displayName === auth.currentUser?.displayName && styles.currentUserMessage,
          ]}>
              <Text style={styles.displayName}>
              {item.displayName} <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
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
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
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