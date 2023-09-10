document.querySelector("button").addEventListener("mousedown", prepareObjects);

const shoppingList = [];
const completedList = [];
const allItems = { product: "", number: 0, id: 0 };
let numb = 0;

function prepareObjects() {
  if (document.getElementById("items").value) {
    numb++;
    const inputItem = document.getElementById("items").value;
    const inputNumber = document.getElementById("number").value;
    const item = Object.create(allItems);
    item.product = inputItem;
    item.number = inputNumber;
    item.id = numb;
    shoppingList.push(item);

    displayList();
  }
}

function displayList() {
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  shoppingList.forEach(displayItems);
}
function displayCompleted() {
  document.querySelector("#done tbody").innerHTML = "";

  // build a new list
  completedList.forEach(displayRest);
}

function displayItems(item) {
  const clone = document.querySelector("template#item").content.cloneNode(true);

  clone.querySelector("[data-field=item]").textContent = item.product;
  clone.querySelector("[data-field=number]").textContent = item.number;
  clone.querySelector("[data-field=status]").setAttribute("id", `${item.id}`);
  clone.querySelector("[data-field=status]").classList.add("statusgreen");
  clone.querySelector("[data-field=delete]").setAttribute("id", `${item.id}`);

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
  checkCheckbox();
}

function displayRest(item) {
  const clone = document.querySelector("template#item").content.cloneNode(true);

  clone.querySelector("[data-field=item]").textContent = item.product;
  clone.querySelector("[data-field=number]").textContent = item.number;
  clone.querySelector("[data-field=status]").setAttribute("id", `${item.id}`);
  clone.querySelector("[data-field=status]").classList.add("statusred");
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
  const idDelete = event.target.getAttribute("id");
  if (shoppingList.some((e) => `${e.id}` === idDelete)) {
    const index =
      shoppingList
        .map((e) => {
          e.id;
        })
        .indexOf(`${idDelete}`) + 1;
    shoppingList.splice(index, 1);
  } else if (completedList.find((e) => `${e.id}` === idDelete)) {
    const index2 =
      completedList
        .map((e) => {
          e.id;
        })
        .indexOf(`${idDelete}`) + 1;
    completedList.splice(index2, 1);
  }

  displayList();
  displayCompleted();
}

function moveObject(event) {
  const identifier = event.target.getAttribute("id");
  if (event.target.classList.contains("statusgreen")) {
    const index =
      shoppingList
        .map((e) => {
          e.id;
        })
        .indexOf(`${identifier}`) + 1;
    const completed = shoppingList.splice(index, 1);
    completedList.push.apply(completedList, completed);
  } else if (event.target.classList.contains("statusred")) {
    const index2 =
      completedList
        .map((e) => {
          e.id;
        })
        .indexOf(`${identifier}`) + 1;
    const shop = completedList.splice(index2, 1);
    shoppingList.push.apply(shoppingList, shop);
  }
  displayList();
  displayCompleted();
}
