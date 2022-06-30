"use strict";

const shirtBtn = document.querySelector(".wrap .header .header_menu .select_cloth_type button.shirtBtn");
const socksBtn = document.querySelector(".wrap .header .header_menu .select_cloth_type button.socksBtn");
const mittenBtn = document.querySelector(".wrap .header .header_menu .select_cloth_type button.mittenBtn");
const blueBtn = document.querySelector(".wrap .header .header_menu .select_color button.blueBtn");
const yellowBtn = document.querySelector(".wrap .header .header_menu .select_color button.yellowBtn");
const pinkBtn = document.querySelector(".wrap .header .header_menu .select_color button.pinkBtn");
const maleBtn = document.querySelector(".wrap .header .header_menu .select_sex button.maleBtn");
const femaleBtn = document.querySelector(".wrap .header .header_menu .select_sex button.femaleBtn");
const itemList = document.querySelector(".item_list ul");

shirtBtn.addEventListener("click", () => {
  //console.log("shirt button clicked");
  const selectedItems = clothItemList.filter((item) => item.typeString == "shirt");
  updateItemList(selectedItems);
});

socksBtn.addEventListener("click", () => {
  //console.log("socks button clicked");
  const selectedItems = clothItemList.filter((item) => item.typeString == "socks");
  updateItemList(selectedItems);
});

mittenBtn.addEventListener("click", () => {
  //console.log("mitten button clicked");
  const selectedItems = clothItemList.filter((item) => item.typeString == "mitten");
  updateItemList(selectedItems);
});

blueBtn.addEventListener("click", () => {
  //console.log("blue button clicked");
  const selectedItems = clothItemList.filter((item) => item.colorString == "blue");
  updateItemList(selectedItems);
});

yellowBtn.addEventListener("click", () => {
  //console.log("yellow button clicked");
  const selectedItems = clothItemList.filter((item) => item.colorString == "yellow");
  updateItemList(selectedItems);
});

pinkBtn.addEventListener("click", () => {
  //console.log("pink button clicked");
  const selectedItems = clothItemList.filter((item) => item.colorString == "pink");
  updateItemList(selectedItems);
});

maleBtn.addEventListener("click", () => {
  //console.log("pink button clicked");
  const selectedItems = clothItemList.filter((item) => item.sexTypeString == "male");
  updateItemList(selectedItems);
});

femaleBtn.addEventListener("click", () => {
  //console.log("pink button clicked");
  const selectedItems = clothItemList.filter((item) => item.sexTypeString == "female");
  updateItemList(selectedItems);
});

class ClothItem {
  constructor(id, clothType, color, sexType) {
    this._id = id;
    this._clothType = clothType;
    this._color = color;
    this._sexType = sexType;
  }

  get id() {
    return this._id;
  }

  // get type() {
  //   return this._clothType;
  // }

  get typeString() {
    return clothType[this._clothType];
  }

  get colorString() {
    return this._color;
  }

  get typeIconString() {
    return clothTypeIcon[this._clothType];
  }

  get sexTypeString() {
    return sexType[this._sexType];
  }

  get sexTypeIconString() {
    return sexTypeIcon[this._sexType];
  }

  getString() {
    return `${this.typeString}, ${this.colorString}`;
  }
}

const iconShirt = "fa-solid fa-shirt";
const iconsocks = "fa-solid fa-socks";
const iconMitten = "fa-solid fa-mitten";

const iconMale = "fa-solid fa-person";
const iconFemale = "fa-solid fa-person-dress";

const clothType = ["shirt", "socks", "mitten"];
const clothColor = ["blue", "yellow", "pink"];
const clothTypeIcon = [iconShirt, iconsocks, iconMitten];
const sexType = ["male", "female"];
const sexTypeIcon = [iconMale, iconFemale];
const clothItemList = [];

let index = 0;
for (let typeIndex = 0; typeIndex < clothType.length; typeIndex++) {
  for (let sexTypeIndex = 0; sexTypeIndex < sexTypeIcon.length; sexTypeIndex++) {
    for (let itClothColor of clothColor) {
      //console.log(`[${index}] ${typeIndex}, ${itClothColor}`);
      clothItemList.push(new ClothItem(index++, typeIndex, itClothColor, sexTypeIndex));
    }
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
    const sexIcon = document.createElement("i");
    const clothText = document.createElement("div");

    li.setAttribute("class", "item"); // ok
    li.setAttribute("id", selectedItems[i].id); // ok

    //console.log(`[${i}] ${selectedItems[i].typeIconString}`);

    clothIcon.setAttribute("class", selectedItems[i].typeIconString);
    li.appendChild(clothIcon);

    sexIcon.setAttribute("class", selectedItems[i].sexTypeIconString);
    li.appendChild(sexIcon);

    clothText.setAttribute("class", "text"); // ok
    clothText.textContent = selectedItems[i].getString(); // ok
    li.appendChild(clothText);

    itemList.appendChild(li);
  }
  //console.log(`itemList.childElementCount: ${itemList.childElementCount}`);
}
