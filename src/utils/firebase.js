import firebase from 'firebase/app';
import {
  API_FIREBASE,
  AUTH_DOMAIN_FIREBASE,
  PROJECT_ID_FIREBASE,
  STORAGE_BUCKET_FIREBASE,
  MESSAGE_SENDER_ID_FIREBASE,
  APP_ID_FIREBASE,
} from '@env';

const firebaseConfig = {
  apiKey: API_FIREBASE,
  authDomain: AUTH_DOMAIN_FIREBASE,
  projectId: PROJECT_ID_FIREBASE,
  storageBucket: STORAGE_BUCKET_FIREBASE,
  messagingSenderId: MESSAGE_SENDER_ID_FIREBASE,
  appId: APP_ID_FIREBASE,
};

export default firebase.initializeApp(firebaseConfig);
