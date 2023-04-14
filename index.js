// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   databaseURL: "https://playground-ab55e-default-rtdb.firebaseio.com",
//   projectId: "",
//   storageBucket: "playground-ab55e.appspot.com",
//   messagingSenderId: "432827727016",
//   appId: "",
// };

const shoppingList = document.getElementById("shopping-list");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//console.log(app);
const shoppingInDB = ref(database, "shoppingList");
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputFieldEl.value;
  push(shoppingInDB, inputValue);
  clearInputFieldEl();
});

onValue(shoppingInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingArray = Object.entries(snapshot.val());

    shoppingList.innerHTML = "";
    for (let item = 0; item < shoppingArray.length; item++) {
      let currentItem = shoppingArray[item];
      let currentItemID = currentItem[0];
      //console.log(currentItemID);
      let currentItemValue = currentItem[1];

      //console.log(currentItem);
      appendItemToShoppingList(currentItem);
    }
  }else{
    shoppingList.innerHTML='No item'
  }
});
//clear screen
function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function appendItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let listItem = document.createElement("li");
  listItem.innerText = itemValue;

  listItem.addEventListener("click", () => {
    const tasksRef = ref(database, `shoppingInDB/${itemID}`);
    remove(tasksRef).then(() => {
      console.log("location removed");
    });

    // console.log(itemID);
  });

  shoppingList.append(listItem);
}
