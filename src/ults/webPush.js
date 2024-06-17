import 'firebase/messaging'
import { initializeApp } from 'firebase/app';
import localforage from 'localforage'
import { getMessaging, getToken } from "firebase/messaging";
const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },
    //initializing firebase app
  init: async function () {
    // if (!firebase.apps.length) {
        const app = initializeApp({
        apiKey: "AIzaSyBqmPLeoEksndQs6RXDhjKlnZrygJUF4d8",
        authDomain: "wiggle-mvp.firebaseapp.com",
        projectId: "wiggle-mvp",
        storageBucket: "wiggle-mvp.appspot.com",
        messagingSenderId: "68614829534",
        appId: "1:68614829534:web:04e1aaf172623a58a5d94f",
        measurementId: "G-CDWFQ6QM41"
      })
      try {
        const messaging = getMessaging(app)
        console.log("mess", messaging)
        if (!messaging) {
          console.error('Không thể khởi tạo đối tượng messaging.')
          return null;
        }
        const tokenInLocalForage = await this.tokenInlocalforage()
        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
            console.log("ada")
          return tokenInLocalForage
        }
        //requesting notification permission from browser
        console.log("dadadadada")
        const status = await Notification.requestPermission()
        console.log("status",status);
        if (status && status === 'granted') {
          //getting token from FCM
          console.log("cc");
          const fcm_token = await getToken(messaging, {
            vapidKey: 'BN1gCj8zDfJiPfNrdv2JK6iFVCx003v-NBKfcffpMlA4RoKqnuyujbA_V-f_boekaiomTasrdxnE_9PhNEwhXCs'
          })
          if (fcm_token) {
            localforage.setItem('fcm_token', fcm_token)
            console.log('fcm token', fcm_token)
            return fcm_token
          }
        }
      } catch (error) {
        console.error(error)
        return null
      }
    // }
  }
}
export default firebaseCloudMessaging 