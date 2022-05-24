
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

window.onload = function() {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        console.log('Signed in!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      })
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const dmLogin = document.getElementById('dmlogin');
const playerLogin = document.getElementById('playerlogin');
const newSession = document.getElementById('newsession');

function createNewSession() {
    let y = makeid(10);
    set(ref(db, 'valid/'+y), {
        valid:true,
    });
    sessionStorage.setItem('xivSession', y)
    sessionStorage.setItem('xivCreator', 'true')
    window.location = "dmview.html";
}

newSession.addEventListener('click', function() {
    let password = get(child(dbRef, 'password')).then((snapshot) => {
        if (snapshot.exists()) {
            let password = snapshot.val();
            let entry = prompt("Please enter the DM password:", "Type Here...");
            if (entry == password) {
                console.log('Signed into DM!')
                createNewSession()
            } else {
                alert('INCORRECT PASSWORD')
            }
        }
    })
})

dmLogin.addEventListener('click', function() {
    var x = document.getElementById('session').value;
    let sessEx = get(child(dbRef, 'valid/'+x)).then((snapshot) => {
        if (snapshot.exists()) {
            sessionStorage.setItem('xivSession', x)
            console.log(sessionStorage.getItem('xivSession'))
            window.location = "dmview.html";
        } else {
            let notFound = document.getElementById('notfound')
            notFound.classList.remove('fadehide')
            setTimeout(function () {
                notFound.classList.add('fadehide');
            }, 500);
            console.log('NO SESSION FOUND')
        }
    })
})

playerLogin.addEventListener('click', function() {
    var x = document.getElementById('session').value;
    let sessEx = get(child(dbRef, 'valid/'+x)).then((snapshot) => {
        if (snapshot.exists()) {
            sessionStorage.setItem('xivSession', x)
            console.log(sessionStorage.getItem('xivSession'))
            window.location = "playerview.html";
        } else {
            let notFound = document.getElementById('notfound')
            notFound.classList.remove('fadehide')
            setTimeout(function () {
                notFound.classList.add('fadehide');
            }, 500);
            console.log('NO SESSION FOUND')
        }
    })
})