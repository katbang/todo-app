document.querySelector("button").addEventListener("mousedown", prepareObjects);
window.addEventListener("load", () => {
  let storedList = JSON.parse(localStorage.getItem("list"));
  let storedCompleted = JSON.parse(localStorage.getItem("completed"));

  if (storedList) {
    shoppingList.push.apply(shoppingList, storedList);
    shoppingList.forEach(displayItems);
    completedList.push.apply(completedList, storedCompleted);
    completedList.forEach(displayCompleted);
  }
});
const shoppingList = [];
const completedList = [];
const allItems = { product: "", number: 0, done: false, id: 0 };
let numb = 0;

function prepareObjects() {
  if (document.getElementById("items").value) {
    numb++;
    const inputItem = document.getElementById("items").value;
    const inputNumber = document.getElementById("number").value;
    const item = Object.create(allItems);
    item.product = inputItem;
    item.number = inputNumber;
    item.done = false;
    item.id = numb;

    shoppingList.push(item);
    console.log(shoppingList);

    displayList();
  }
  document.getElementById("items").value = "";
}

function displayList() {
  document.querySelector("#list tbody").innerHTML = "";
  localStorage.setItem("list", JSON.stringify(shoppingList));
  const storageToDo = JSON.parse(localStorage.getItem("list"));
  storageToDo.forEach(displayItems);
}
function displayCompleted() {
  document.querySelector("#done tbody").innerHTML = "";
  localStorage.setItem("completed", JSON.stringify(completedList));
  const storageCompleted = JSON.parse(localStorage.getItem("completed"));
  storageCompleted.forEach(displayRest);
}

function displayItems(item) {
  const clone = document.querySelector("template#item").content.cloneNode(true);

  clone.querySelector("[data-field=item]").textContent = item.product;
  clone.querySelector("[data-field=number]").textContent = item.number;
  clone.querySelector("[data-field=status]").setAttribute("id", `${item.id}`);
  clone.querySelector("[data-field=status]").classList.add(`${item.done}`);
  clone.querySelector("[data-field=delete]").setAttribute("id", `${item.id}`);

  document.querySelector("#list tbody").appendChild(clone);

  checkCheckbox();
}
function displayRest(item) {
  const clone = document.querySelector("template#item").content.cloneNode(true);

  clone.querySelector("[data-field=item]").textContent = item.product;
  clone.querySelector("[data-field=number]").textContent = item.number;
  clone.querySelector("[data-field=status]").setAttribute("id", `${item.id}`);
  clone.querySelector("[data-field=status]").classList.add(`${item.done}`);
  clone.querySelector("[data-field=delete]").setAttribute("id", `${item.id}`);

  document.querySelector("#done tbody").appendChild(clone);

  checkCheckbox();
}

function checkCheckbox() {
  if (shoppingList.length + completedList.length > 1) {
    const checkbox = document.querySelectorAll("[data-field=status]");
    checkbox.forEach((box) => {
      box.addEventListener("mousedown", moveObject);
    });
    const trashcan = document.querySelectorAll("[data-field=delete]");
    trashcan.forEach((trash) => {
      trash.addEventListener("mousedown", deleteObject);
    });
  } else {
    document
      .querySelector("[data-field=status]")
      .addEventListener("mousedown", moveObject);
    document
      .querySelector("[data-field=delete]")
      .addEventListener("mousedown", deleteObject);
  }
}

function deleteObject(event) {
  const idDelete = parseInt(event.target.getAttribute("id"));

  if (shoppingList.some((e) => e.id === idDelete)) {
    const index = shoppingList.map((e) => e.id).indexOf(idDelete);
    shoppingList.splice(index, 1);
  } else if (completedList.some((e) => e.id === idDelete)) {
    const index2 = completedList.map((e) => e.id).indexOf(idDelete);
    completedList.splice(index2, 1);
  }
  displayList();
  displayCompleted();
}

function moveObject(event) {
  const identifier = parseInt(event.target.getAttribute("id"));

  if (event.target.classList.contains("false")) {
    const index = shoppingList.map((e) => e.id).indexOf(identifier);
    const completed = shoppingList.splice(index, 1);
    completed[0].done = true;
    completedList.push.apply(completedList, completed);
  } else if (event.target.classList.contains("true")) {
    const index2 = completedList.map((e) => e.id).indexOf(identifier);
    const shop = completedList.splice(index2, 1);
    shop[0].done = false;
    shoppingList.push.apply(shoppingList, shop);
  }
  displayList();
  displayCompleted();
}
