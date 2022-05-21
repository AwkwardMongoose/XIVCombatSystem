
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
        console.log('signed in')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
    }



const limitChecks = document.getElementsByClassName('limit-check');
const del1 = document.getElementById('delbutton1');

const dmLogin = document.getElementById('dmlogin');
console.log(dmLogin)
const playerLogin = document.getElementById('playerlogin');
dragula([document.getElementById('entroot')]);

Array.from(limitChecks).forEach(x => {
    x.addEventListener('change', function() {
        let row = this.id.slice(7);
        let limit1 = document.getElementById('limit1-'+row);
        let limit2 = document.getElementById('limit2-'+row);
        let limit3 = document.getElementById('limit3-'+row);
        let limitNum = this.id.slice(5,6);
        let bar1 = document.getElementById('bar1-'+row);
        let bar2 = document.getElementById('bar2-'+row);
        let bar3 = document.getElementById('bar3-'+row);
        let checked = this.checked;
        switch (limitNum) {
            case '1':
                if (checked == false) {
                    limit2.checked = false;
                    limit3.checked = false;
                    bar1.classList.remove('limit-fill')
                } else {
                    bar1.classList.add('limit-fill')
                }
                bar2.classList.remove('limit-fill')
                bar3.classList.remove('limit-fill')
                break
            case '2':
                if (checked == false) {
                    limit3.checked = false;
                    bar2.classList.remove('limit-fill')
                } else {
                    limit1.checked = true;
                    bar1.classList.add('limit-fill')
                    bar2.classList.add('limit-fill')
                }
                bar3.classList.remove('limit-fill')
                break
            case '3':
                if (checked == false) {
                    bar3.classList.remove('limit-fill')
                } else {
                    limit1.checked = true;
                    limit2.checked = true;
                    bar1.classList.add('limit-fill')
                    bar2.classList.add('limit-fill')
                    bar3.classList.add('limit-fill')
                }
                break
        }
    })
})

del1.addEventListener('click', function() {
    console.log('Test')
    set(ref(db, 'rows/1'), {
        number: 'Test 1',
        name: 'Test Name',
        role: 'Test Role',
    });
})

