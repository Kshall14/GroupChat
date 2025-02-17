import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/AuthSlices';
import groupChatReducer from './slices/DatabaseSlices';
import authSaga from './sags/AuthSagas';
import groupChatSaga from './sags/DatabaseSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    groupChat: groupChatReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(groupChatSaga);
export default store;