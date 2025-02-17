import { call, put, takeLatest } from 'redux-saga/effects';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../../../firebaseConfig'; // Adjust the path to your Firebase config
import {
  fetchMessagesSuccess,
  fetchMessagesFailure,
  sendMessageSuccess,
  sendMessageFailure,
} from '../slices/DatabaseSlices'; // Adjust the path to your slice

// Saga to fetch messages
function* fetchMessagesSaga() {
    try {
      const db = getDatabase(app);
      const messagesRef = ref(db, 'messages');
  
      // Create a promise that resolves when the data is fetched
      const data = yield new Promise((resolve, reject) => {
        onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
  
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Dispatch success action with the fetched messages
        yield put(fetchMessagesSuccess(messageList));
      } else {
        // Dispatch success action with an empty array if no messages are found
        yield put(fetchMessagesSuccess([]));
      }
    } catch (error) {
      // Dispatch failure action if an error occurs
      yield put(fetchMessagesFailure(error.message));
    }
}

// Saga to send a message
function* sendMessageSaga(action) {
  try {
    const { message } = action.payload;
    const db = getDatabase(app);
    const messagesRef = ref(db, 'messages');
    const auth = getAuth(app);

    // Check if the user is authenticated
    if (auth.currentUser && auth.currentUser.displayName) {
      // Push the message to Firebase
      yield call(push, messagesRef, {
        text: message,
        timestamp: Date.now(),
        displayName: auth.currentUser.displayName,
      });

      // Dispatch success action
      yield put(sendMessageSuccess());
    } else {
      throw new Error('User is not authenticated or does not have a display name.');
    }
  } catch (error) {
    // Dispatch failure action if an error occurs
    yield put(sendMessageFailure(error.message));
  }
}

// Watcher Saga
function* groupChatSaga() {
  // Listen for fetchMessagesRequest actions and trigger fetchMessagesSaga
  yield takeLatest('groupChat/fetchMessagesRequest', fetchMessagesSaga);

  // Listen for sendMessageRequest actions and trigger sendMessageSaga
  yield takeLatest('groupChat/sendMessageRequest', sendMessageSaga);
}

export default groupChatSaga;