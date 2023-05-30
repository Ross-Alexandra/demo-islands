import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import VueHighlightJS from 'vue3-highlightjs';

import 'highlight.js/styles/solarized-dark.css'

import App from './App.vue'
import router from './router'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_4rIBYjai0LW7ad_mtv_7qcY4VOrcE7E",
    authDomain: "fir-islands.firebaseapp.com",
    projectId: "fir-islands",
    storageBucket: "fir-islands.appspot.com",
    messagingSenderId: "873929147833",
    appId: "1:873929147833:web:8bfc03f769af8b75bd2268",
    measurementId: "G-E3DTTCER5K"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

const app = createApp(App)

app.use(router)
app.use(VueHighlightJS);

app.mount('#app')
