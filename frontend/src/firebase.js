import { initializeApp } from "firebase/app"
import { getAuth  } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

{/* Firebase Database Configuration */}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)

{/* .env file name formating
VITE_APP_FIREBASE_API_KEY = 
VITE_APP_FIREBASE_AUTH_DOMAIN = 
VITE_APP_FIREBASE_PROJECT_ID = 
VITE_APP_FIREBASE_STORAGE_BUCKET = 
VITE_APP_FIREBASE_MSG_SENDER_ID = 
VITE_APP_FIREBASE_APP_ID = 
VITE_APP_FIREBASE_MEASUREMENT_ID = 
*/}