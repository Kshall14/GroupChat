import { createSlice } from '@reduxjs/toolkit';

const groupChatSlice = createSlice({
  name: 'groupChat',
  initialState: {
    messages: [], // Array to store messages
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    // Action to fetch messages
    fetchMessagesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload; // Update messages array
    },
    fetchMessagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message
    },

    // Action to send a message
    sendMessageRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess: (state) => {
      state.loading = false;
    },
    sendMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set error message
    },
  },
});

// Export actions
export const {
  fetchMessagesRequest,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
} = groupChatSlice.actions;

// Export reducer
export default groupChatSlice.reducer;