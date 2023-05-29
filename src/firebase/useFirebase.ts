import React, { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// firebase config variables
const {
  VITE_FIREBASE_API_KEY: apiKey,
  VITE_FIREBASE_DOMAIN: authDomain,
  VITE_FIREBASE_PROJECT_ID: projectId,
  VITE_FIREBASE_STORAGE_BUCKET: storageBucket,
  VITE_FIREBASE_SENDER_ID: messagingSenderId,
  VITE_FIREBASE_APP_ID: appId,
  VITE_FIREBASE_MEASUREMENT_ID: measurementId,
} = import.meta.env

// init firebase app
const app = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
})

// get firebase services
export const auth = getAuth(app)
export const firestore = getFirestore(app)

interface UserState {
  uid: string
}

const signedOutUserState = {
  uid: null,
}

export default function useFirebase() {
  const [userState, setUserState] = useState<UserState | null>(null)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed id.')
        console.log(user)
        setUserState(user)
      } else {
        console.log('User is signed out.')
        setUserState(signedOutUserState)
        console.log(signedOutUserState)
      }
    })
  }, [userState])

  return { userState } as {
    userState: UserState
  }
}
