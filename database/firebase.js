import { initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9KYsVgG_5dqjZcod5Nk9RYJ-txh1YxxU",
  authDomain: "react-native-firebase-71701.firebaseapp.com",
  projectId: "react-native-firebase-71701",
  storageBucket: "react-native-firebase-71701.appspot.com",
  messagingSenderId: "980274512027",
  appId: "1:980274512027:web:ed8df50e93b4d358ea863e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
