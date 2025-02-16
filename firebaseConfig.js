// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp  } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
const firebaseConfig = {
  apiKey: "AIzaSyAKD133Nng1DGvHGoKL9IASBNW6wwjx2S0",
  authDomain: "groupchat-e0363.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "groupchat-e0363",
  storageBucket: "groupchat-e0363.firebasestorage.app",
  messagingSenderId: "478076163260",
  appId: "1:478076163260:android:a9b86ef2861f289417ecb9",
  databaseURL:'https://groupchat-e0363-default-rtdb.firebaseio.com/',
  //measurementId: 'G-measurement-id',
};
let app;
if (getApps().length === 0) {
  // If no Firebase app is initialized, initialize one
  app = initializeApp(firebaseConfig);
} else {
  // If an app is already initialized, use that one
  app = getApp();
}

// Export the Firebase app instance
export { app };
// Initialize Firebase
//export const app = initializeApp(firebaseConfig);