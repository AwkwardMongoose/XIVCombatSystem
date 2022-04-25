import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getDatabase, ref, set, child, get, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

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
const dbRef = ref(getDatabase());
const db1 = getDatabase();

function writeRowData(rowNum, name1, role1) {
  let arrayNum = rowNum;
  set(ref(db, 'rows/'+arrayNum), {
      number: rowNum,
      name: name1,
      role: role1,
  });
}

function changeRowData(type,rowNum,value) {
  switch (type) {
    case 'charname':
      update(ref(db, 'rows/'+rowNum), {
        name: value,
    });
    break
    case 'role':
      update(ref(db, 'rows/'+rowNum), {
        role: value,
    });
    break
  }
}

function removeRowData(rowNum) {
  let arrayNum = rowNum;
  set(ref(db, 'rows/'+arrayNum), null);
}

function rowMax() {
  let numArr = [];
  return get(child(dbRef, 'rows')).then((snapshot) => {
    if (snapshot.exists()) {
      let rowArr = snapshot.val();
      for (let a in rowArr) {
        numArr.push(parseInt(a));
      }
      return Math.max(...numArr) + 1
    } else {
      return 1
    }

  }).catch((error) => {
      console.error(error);
  });
}

function newRow(num,name,role) {
  let table = document.getElementById('data-table');
          
  let newRow = document.createElement("tr");
  newRow.id = 'row'+num;
  table.appendChild(newRow);

  let newNumCell = document.createElement('td');
  newRow.appendChild(newNumCell);
  newNumCell.classList.add('data-cell');

  let newNameCell = document.createElement('td');
  newRow.appendChild(newNameCell);
  newNameCell.classList.add('data-cell', 'align-left');
  let newNameInput = document.createElement('input');
  newNameInput.id = 'charname'+num;
  newNameInput.value = name;
  newRow.appendChild(newNameCell);

  let newRoleCell = document.createElement('td');
  newRow.appendChild(newRoleCell);
  newRoleCell.classList.add('data-cell','wide');
  let newRoleSelect = document.createElement('select');
  newRoleSelect.classList.add('wide');
  newRoleSelect.id = 'role'+num;
  
  newRow.appendChild(newRoleCell);

  let newTank = document.createElement('option');
  newTank.value = 'Tank';
  newTank.innerHTML = 'Tank';
  let newLTank = document.createElement('option');
  newLTank.value = 'Light Tank';
  newLTank.innerHTML = 'Light Tank';
  let newMStriker = document.createElement('option');
  newMStriker.value = 'Melee Striker';
  newMStriker.innerHTML = 'Melee Striker';
  let newRStriker = document.createElement('option');
  newRStriker.value = 'Ranged Striker';
  newRStriker.innerHTML = 'Ranged Striker';
  let newCaster = document.createElement('option');
  newCaster.value = 'Caster';
  newCaster.innerHTML = 'Caster';
  let newHealer = document.createElement('option');
  newHealer.value = 'Healer/Support';
  newHealer.innerHTML = 'Healer/Support';
  let newMTank = document.createElement('option');
  newMTank.value = 'Minion (Tank)';
  newMTank.innerHTML = 'Minion (Tank)';
  let newMDPS = document.createElement('option');
  newMDPS.value = 'Minion (DPS)';
  newMDPS.innerHTML = 'Minion (DPS)';
  let newMHeal = document.createElement('option');
  newMHeal.value = 'Minion (Heals)';
  newMHeal.innerHTML = 'Minion (Heals)';
  let newBoss = document.createElement('option');
  newBoss.value = 'Boss';
  newBoss.innerHTML = 'Boss';

  let newDelCell = document.createElement('td');
  newRow.appendChild(newDelCell);
  newDelCell.classList.add('data-cell');

  let newDelButton = document.createElement('button')
  newDelCell.appendChild(newDelButton);
  let newDelText = document.createTextNode('X');
  newDelButton.appendChild(newDelText);
  newDelButton.id = 'del'+num;

  let newNum = document.createTextNode(num);
  newNumCell.appendChild(newNum);
  
  newNameCell.appendChild(newNameInput);
  newRoleCell.appendChild(newRoleSelect);
  newRoleSelect.appendChild(newTank);
  newRoleSelect.appendChild(newLTank);
  newRoleSelect.appendChild(newMStriker);
  newRoleSelect.appendChild(newRStriker);
  newRoleSelect.appendChild(newCaster);
  newRoleSelect.appendChild(newHealer);
  newRoleSelect.appendChild(newMTank);
  newRoleSelect.appendChild(newMDPS);
  newRoleSelect.appendChild(newMHeal);
  newRoleSelect.appendChild(newBoss);
  newRoleSelect.value = role;
}

function removeRow(num) {
  let row = document.getElementById('row'+num);
  row.remove();
  removeRowData(num)
}
  
/* function getRowData() {
  get(child(dbRef, 'rows')).then((snapshot) => {
      if (snapshot.exists()) {
        let items = snapshot.val();
        items.forEach((a,b) => {
          
          let table = document.getElementById('data-table');
          
          let newRow  = document.createElement("tr");
          newRow.id = 'row'+items[b].number;
          table.appendChild(newRow);

          let newNumCell = document.createElement('td');
          newRow.appendChild(newNumCell);
          newNumCell.classList.add('data-cell');

          let newNameCell = document.createElement('td');
          newRow.appendChild(newNameCell);
          newNameCell.classList.add('data-cell', 'align-left');
          let newNameInput = document.createElement('input')
          newNameInput.value = items[b].name;
          newRow.appendChild(newNameCell);

          let newRoleCell = document.createElement('td');
          newRow.appendChild(newRoleCell);
          newRoleCell.classList.add('data-cell');
          
          let newDelCell = document.createElement('td');
          newRow.appendChild(newDelCell);
          newDelCell.classList.add('data-cell');
        
          let newDelButton = document.createElement('button')
          newDelCell.appendChild(newDelButton);
          let newDelText = document.createTextNode('X');
          newDelButton.appendChild(newDelText);
          newDelButton.id = 'del'+items[b].number;

          let newNum = document.createTextNode(items[b].number);
          newNumCell.appendChild(newNum);
          
          let newName = document.createTextNode(items[b].name);
          newNameCell.appendChild(newNameInput);
          
          let newRole = document.createTextNode(items[b].role);
          newRoleCell.appendChild(newRole);
        })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}*/

onValue(ref(db, 'rows/'), (snapshot) => {
  let data = snapshot.val();
  if (snapshot.exists()) {
    //Add/Remove Rows
    let rowArr = [];
    for (let x in data) {
      let a = data[x]
      let num = a.number;
      let name = a.name;
      let role = a.role;
        if (a != undefined) {
          rowArr.push(a.number);
          let num = a.number;
          let name = a.name;
          let role = a.role;          
          if (document.getElementById('row'+num) != null) {
          } else {
            newRow(num,name,role)
          }
          try {
            let tRows = document.querySelectorAll('tr');
            tRows.forEach(v => {
                let rowID = v.id;
                if (rowID.includes('row')) {
                  let rowCount = parseInt(rowID.slice(3));
                  if (rowArr.includes(rowCount)) {
                  } else {
                    v.remove()
                  }
                }
            })
          } catch {
          }
        } else {
        }
    }
    //Update Rows
    for (let x in data) {
      let a = data[x];
      let num = a.number;
      let name = a.name;
      console.log(a.name)
      let role = a.role;
      let charName = document.getElementById('charname'+num)
      let charRole = document.getElementById('role'+num)
      if (charName.value != name) {
        charName.value = name;
        console.log('Change Name')
      }
      if (charRole.value != role) {
        charRole.value = role;
        console.log('Change Role')
      }
    }
  } else {
    let tRows = document.querySelectorAll('tr');
    tRows.forEach(v => {
        let rowID = v.id;
        if (rowID.includes('row')) {
          v.remove()
        }
    })
    console.log('No snapshot')
  }
});

const button = document.getElementById('button');
button.addEventListener('click', async function() {
  let num = await rowMax();
  console.log(num)
  let name = document.getElementById('name').value;
  let role = document.getElementById('role').value;
  writeRowData(num,name,role)
  //newRow(num,name,role)
  console.log('Enter')
})

const testButton = document.getElementById('test-button');
testButton.addEventListener('click', async function() {
  console.log(await rowMax())
})

/*window.addEventListener('load', function() {
  getRowData()
})*/

$(document).on('click', 'button', function() {
  let x = this.id.slice(0,3);
  console.log(x)
  if (x == 'del') {
    removeRow(this.id.slice(3))
    console.log(x)
  } else {
    console.log('Failure')
  }
})

$(document).on('change', 'input', function() {
  let id = this.id;
  let rowNum = id.match(/\d+/g);
// num[0] will be 21

  let type = id.match(/[a-zA-Z]+/g);
  let value = this.value;
  if (rowNum[0] != null){
    changeRowData(type[0],rowNum[0],value)
  }
  
})

$(document).on('change', 'select', function() {
  let id = this.id;
  let rowNum = id.match(/\d+/g);
// num[0] will be 21
console.log(rowNum[0])
  let type = id.match(/[a-zA-Z]+/g);
  let value = this.value;
  if (rowNum[0] != null){
    changeRowData(type[0],rowNum[0],value)
  }
})

/*function writeUserData(userId, name, text) {
    set(ref(db, 'row' + userId), {
      username: name,
      text: text,
    });
    document.getElementById("input").value = "";
  }

  const dbRef = ref(getDatabase());
  
  function thingy() {
    get(child(dbRef, 'arrTest')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          snapshot.val().forEach(a => {
            console.log(snapshot.val().indexOf(a)+'-'+a)
          })
          return toString(snapshot.val())
        } else {
          console.log("No data available");
        }
        
      }).catch((error) => {
        console.error(error);
      });
      
  }
  console.log('Test 0.3')

const db1 = getDatabase();

const starCountRef = ref(db1, 'users1');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  let name = snapshot.val().username;
  let newtext = snapshot.val().text;
  const para = document.createElement("p");
  const node = document.createTextNode(name + ": " + newtext);
  para.appendChild(node);
  const element = document.getElementById("div1");
  element.appendChild(para);



  //let display = document.getElementById('test');
  //display.innerHTML = snapshot.val().username;
  //console.log(data.username);
});

var number = 0;
const button = document.getElementById('button');
button.addEventListener('click', function() {
  get(child(dbRef, 'arrTest')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      snapshot.val().forEach(a => {
        number = snapshot.val().indexOf(a);
        
      })
      number += 1;
    } else {
      console.log("No data available");
    }
    
  })
  let name = document.getElementById('name').value;
  let text = document.getElementById('input').value;
  writeUserData(number, name, text)
  console.log(number)
})

const testButton = document.getElementById('test-button');
testButton.addEventListener('click', function() {
  thingy()
  console.log('Test Button')
}) */

