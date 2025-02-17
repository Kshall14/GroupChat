import { call, put, takeLatest } from 'redux-saga/effects';
import { getAuth, createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebaseConfig'; // Adjust the path to your firebase config
import {
  CreateUserRequest,
  CreateUserSuccess,
  CreateUserFailure,
  UpdateUserRequest,
  UpdateUserSuccess,
  UpdateUserFailure,
  SignInRequest,
  SignInSuccess,
  SignInFailure
} from '../slices/AuthSlices';

// Saga to handle user creation
function* handleCreateUser(action) {
  try {
    const { email, password, navigation } = action.payload; // Removed displayName from here
    const auth = getAuth(app);

    // Step 1: Create the user with email and password
    const userCredential = yield call(createUserWithEmailAndPassword, auth, email, password);
    const user = userCredential.user;

    // Dispatch success action for user creation
    yield put(CreateUserSuccess(user));

    // Step 2: Dispatch action to update the user's profile with the display name
    yield put(UpdateUserRequest({ user, displayName: action.payload.displayName, navigation }));
  } catch (error) {
    // Dispatch failure action if user creation fails
    yield put(CreateUserFailure(error.message));
  }
}

// Saga to handle profile update
function* handleUpdateUser(action) {
  try {
    const { user, displayName, navigation } = action.payload;

    // Step 1: Update the user's profile with the display name
    yield call(updateProfile, user, { displayName });

    // Dispatch success action for profile update
    yield put(UpdateUserSuccess());

    // Step 2: Navigate to the SignIn screen after successful profile update
    //navigation.navigate('SignIn');
  } catch (error) {
    // Dispatch failure action if profile update fails
    yield put(UpdateUserFailure(error.message));
  }
}
function* handleSignIn(action) {
  try {
    console.log('SignIn Saga Triggered');
    const { email, password } = action.payload;
    const auth = getAuth(app);

    // Step 1: Sign in the user with email and password
    const userCredential = yield call(signInWithEmailAndPassword, auth, email, password);
    const user = userCredential.user;
    console.log('User Signed In:', user);
    // Dispatch success action for sign-in
    yield put(SignInSuccess(user));
  } catch (error) {
    console.error('SignIn Error:', error.message);
    // Dispatch failure action if sign-in fails
    yield put(SignInFailure(error.message));
  }
}

// Watcher Saga
function* authSaga() {
  // Listen for CreateUserRequest actions and trigger handleCreateUser saga
  yield takeLatest(CreateUserRequest.type, handleCreateUser);

  // Listen for UpdateUserRequest actions and trigger handleUpdateUser saga
  yield takeLatest(UpdateUserRequest.type, handleUpdateUser);
  yield takeLatest(SignInRequest.type, handleSignIn);
}

export default authSaga;