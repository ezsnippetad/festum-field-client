// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCCHq0OzQlzTLtKJvFGU5KxICY_lZ8qoSE",
  authDomain: "festumfield-16980.firebaseapp.com",
  projectId: "festumfield-16980",
  storageBucket: "festumfield-16980.appspot.com",
  messagingSenderId: "115520106171",
  appId: "1:115520106171:web:b0b8bddba7e928f384839e",
  measurementId: "G-05L6X1WENZ",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
