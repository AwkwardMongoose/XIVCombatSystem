
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getDatabase, ref, set, child, get, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnR8xwXkXgZpX8cO2XoOaQpDl82_lQz5w",
  authDomain: "xiv-combat-tracker.firebaseapp.com",
  databaseURL: "https://xiv-combat-tracker-default-rtdb.firebaseio.com",
  projectId: "xiv-combat-tracker",
  storageBucket: "xiv-combat-tracker.appspot.com",
  messagingSenderId: "826191914384",
  appId: "1:826191914384:web:830f8699e773fd1b083f15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const db1 = getDatabase();

const dmLogin = document.getElementById('dmlogin');
const playerLogin = document.getElementById('playerlogin');

dmLogin.addEventListener('click', function() {
    let password = prompt("Please enter the DM password:", "Type Here...");
    let email = 'tgf.xiv@gmail.com';
    if (password == 'atwood') {
        window.location = "dmview.html";
    } else {
        alert('INCORRECT PASSWORD')
    }
})

playerLogin.addEventListener('click', function() {
    window.location = "playerview.html";
})