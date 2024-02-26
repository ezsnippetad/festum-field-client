// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
//import { Warn } from "./redux/services/toastServices";
// import { getAnalytics } from "firebase/analytics";
// import { getToken } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCHq0OzQlzTLtKJvFGU5KxICY_lZ8qoSE",
  authDomain: "festumfield-16980.firebaseapp.com",
  projectId: "festumfield-16980",
  storageBucket: "festumfield-16980.appspot.com",
  messagingSenderId: "115520106171",
  appId: "1:115520106171:web:b0b8bddba7e928f384839e",
  measurementId: "G-05L6X1WENZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getNotificationToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BMflBOa_znz1Vq9sAijW7qwyIf_cqJgciX-eBAbPc0mUZnv3fgrnF7j4iIQNo4htLSEyDXv_FfBN7sOnTZ6V1ng",
  })
    .then((currentToken) => {
      if (currentToken) {
        //console.log("current token for client: ", currentToken);
        localStorage.setItem("fcm_token", currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one.",
        );

        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // Warn("Notification permission not granted!")
      //Warn(err.message);
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
