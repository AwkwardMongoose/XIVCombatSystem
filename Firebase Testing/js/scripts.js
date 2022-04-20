import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getDatabase, ref, set, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKRtcEDO2_JTe7DHKR63a4WKC6n8bjK-M",
    authDomain: "tgf-test-93afc.firebaseapp.com",
    projectId: "tgf-test-93afc",
    storageBucket: "tgf-test-93afc.appspot.com",
    messagingSenderId: "395586262174",
    appId: "1:395586262174:web:685023f7eaddcf8e24578f"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeUserData(userId, name, email, imageUrl) {
    set(ref(db, 'users' + userId), {
      username: name,
    });
    document.getElementById("input").value = "";
  }

  const dbRef = ref(getDatabase());
  
  function thingy() {
    get(child(dbRef, `users1`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().username);
          return toString(snapshot.val().username)
        } else {
          console.log("No data available");
        }
        
      }).catch((error) => {
        console.error(error);
      });
      
  }
  console.log('Test 0.6')

const db1 = getDatabase();
const starCountRef = ref(db1, 'users1');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  let display = document.getElementById('test');
  display.innerHTML = snapshot.val().username;
  console.log(data.username);
});


const button = document.getElementById('button');
button.addEventListener('click', function() {
  let input = document.getElementById('input').value;
  let name = input;
    console.log(toString(input))
    writeUserData('1', name)
})