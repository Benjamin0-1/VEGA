import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTxFk__MWlObw1Uf9_WNkxOKwMZJ_fTn4",
  authDomain: "vega-d62fa.firebaseapp.com",
  projectId: "vega-d62fa",
  storageBucket: "vega-d62fa.appspot.com",
  messagingSenderId: "54181708295",
  appId: "1:54181708295:web:c51869794c73964d39e0a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);