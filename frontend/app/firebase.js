import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCm0V_DXISarvofy8tVswn1ga6k_KE6YYY",
    authDomain: "realtime-stock-38793.firebaseapp.com",
    projectId: "realtime-stock-38793",
    storageBucket: "realtime-stock-38793.firebasestorage.app",
    messagingSenderId: "855535457576",
    appId: "1:855535457576:web:a66f07a2e9cb6ead43ac1d",
    measurementId: "G-2BTQZV2JSV",
    databaseURL: "https://realtime-stock-38793-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();