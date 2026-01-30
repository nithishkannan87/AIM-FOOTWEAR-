import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcT3QqPZ5EvQIdgSr9OChnM8k8PTTISuA",
    authDomain: "aim-footwear-2b697.firebaseapp.com",
    projectId: "aim-footwear-2b697",
    storageBucket: "aim-footwear-2b697.firebasestorage.app",
    messagingSenderId: "742439106442",
    appId: "1:742439106442:web:f284a09764d4bfd494ba73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
