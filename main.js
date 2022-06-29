"use strict";

const shirtBtn = document.querySelector(".wrap .header .header_menu button.shirtBtn");
const socksBtn = document.querySelector(".wrap .header .header_menu button.socksBtn");
const mittenBtn = document.querySelector(".wrap .header .header_menu button.mittenBtn");
const blueBtn = document.querySelector(".wrap .header .header_menu button.blueBtn");
const yellowBtn = document.querySelector(".wrap .header .header_menu button.yellowBtn");
const pinkBtn = document.querySelector(".wrap .header .header_menu button.pinkBtn");
const itemList = document.querySelector(".item_list ul");

shirtBtn.addEventListener("click", () => {
  console.log("shirt button clicked");
});

socksBtn.addEventListener("click", () => {
  console.log("socks button clicked");
});

mittenBtn.addEventListener("click", () => {
  console.log("mitten button clicked");
});

blueBtn.addEventListener("click", () => {
  console.log("blue button clicked");
  const selectedItems = clothItemList.filter((item) => item.colorString == "blue");
  updateItemList(selectedItems);
});

yellowBtn.addEventListener("click", () => {
  console.log("yellow button clicked");
  const selectedItems = clothItemList.filter((item) => item.colorString == "yellow");
  updateItemList(selectedItems);
});

pinkBtn.addEventListener("click", () => {
  console.log("pink button clicked");
});

class ClothItem {
  constructor(id, type, color) {
    this._id = id;
    this._type = type;
    this._color = color;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get typeString() {
    return clothType[this._type];
  }

  get colorString() {
    return this._color;
  }

  get typeIconString() {
    return clothTypeIcon[this._type];
  }

  getString() {
    return `${this.typeString}, ${this.colorString}`;
  }
}

const iconShirt = "fa-solid fa-shirt";
const iconsocks = "fa-solid fa-socks";
const iconMitten = "fa-solid fa-mitten";

const clothType = ["shirt", "socks", "mitten"];
const clothColor = ["blue", "yellow", "pink"];
const clothTypeIcon = [iconShirt, iconsocks, iconMitten];
const clothItemList = [];

let index = 0;
for (let typeIndex = 0; typeIndex < clothType.length; typeIndex++) {
  for (let itClothColor of clothColor) {
    //console.log(`[${index}] ${typeIndex}, ${itClothColor}`);
    clothItemList.push(new ClothItem(index++, typeIndex, itClothColor));
  }
}

updateItemList(clothItemList);

/* for (let i = 0; i < clothItemList.length; i++) {
  console.log(`[${clothItemList[i].id}] ${clothItemList[i].getString()}`);
} */

function restoreItemList() {
  //console.log(`itemList.childElementCount: ${itemList.childElementCount}`);
  const itemListCount = itemList.childElementCount;
  for (let i = 0; i < itemListCount; i++) {
    const item = itemList.querySelector("li");
    //console.log(item);
    item.remove();
    //itemList.removeChild(item);
  }
}

function updateItemList(selectedItems) {
  // 기존 아이템 리스트 비우기
  restoreItemList();

  // 출력할 아이템을 리스트에 추가
  for (let i = 0; i < selectedItems.length; i++) {
    const li = document.createElement("li");
    const clothIcon = document.createElement("i");
    const clothText = document.createElement("div");

    li.setAttribute("class", "item"); // ok
    li.setAttribute("id", selectedItems[i].id); // ok

    //console.log(`[${i}] ${selectedItems[i].typeIconString}`);

    clothIcon.setAttribute("class", selectedItems[i].typeIconString);
    li.appendChild(clothIcon);

    clothText.setAttribute("class", "text"); // ok
    clothText.textContent = selectedItems[i].getString(); // ok
    li.appendChild(clothText);

    itemList.appendChild(li);
  }
  //console.log(`itemList.childElementCount: ${itemList.childElementCount}`);
}
