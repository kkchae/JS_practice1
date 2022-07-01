"use strict";

//import main from "json-to-txt";

const shirtBtn = document.querySelector(".wrap .header .header_menu .select_cloth_type button.shirtBtn");
const socksBtn = document.querySelector(".wrap .header .header_menu .select_cloth_type button.socksBtn");
const mittenBtn = document.querySelector(".wrap .header .header_menu .select_cloth_type button.mittenBtn");
const blueBtn = document.querySelector(".wrap .header .header_menu .select_color button.blueBtn");
const yellowBtn = document.querySelector(".wrap .header .header_menu .select_color button.yellowBtn");
const pinkBtn = document.querySelector(".wrap .header .header_menu .select_color button.pinkBtn");
const maleBtn = document.querySelector(".wrap .header .header_menu .select_gender button.maleBtn");
const femaleBtn = document.querySelector(".wrap .header .header_menu .select_gender button.femaleBtn");
const itemList = document.querySelector(".item_list ul");

shirtBtn.addEventListener("click", () => {
  //console.log("shirt button clicked");
  const selectedItems = clothItemList.filter((item) => item.clothType == "shirt");
  updateItemList(selectedItems);
});

socksBtn.addEventListener("click", () => {
  //console.log("socks button clicked");
  const selectedItems = clothItemList.filter((item) => item.clothType == "socks");
  updateItemList(selectedItems);
});

mittenBtn.addEventListener("click", () => {
  //console.log("mitten button clicked");
  const selectedItems = clothItemList.filter((item) => item.clothType == "mitten");
  updateItemList(selectedItems);
});

blueBtn.addEventListener("click", () => {
  //console.log("blue button clicked");
  const selectedItems = clothItemList.filter((item) => item.clothColor == "blue");
  updateItemList(selectedItems);
});

yellowBtn.addEventListener("click", () => {
  //console.log("yellow button clicked");
  const selectedItems = clothItemList.filter((item) => item.clothColor == "yellow");
  updateItemList(selectedItems);
});

pinkBtn.addEventListener("click", () => {
  //console.log("pink button clicked");
  const selectedItems = clothItemList.filter((item) => item.clothColor == "pink");
  updateItemList(selectedItems);
});

maleBtn.addEventListener("click", () => {
  //console.log("pink button clicked");
  const selectedItems = clothItemList.filter((item) => item.genderType == "male");
  updateItemList(selectedItems);
});

femaleBtn.addEventListener("click", () => {
  //console.log("pink button clicked");
  const selectedItems = clothItemList.filter((item) => item.genderType == "female");
  updateItemList(selectedItems);
});

class ClothItem {
  constructor(id, clothType, clothColor, genderType) {
    this._id = id;
    this._clothType = clothType;
    this._clothColor = clothColor;
    this._genderType = genderType;
  }

  get id() {
    return this._id;
  }

  get clothType() {
    return this._clothType;
  }

  get clothColor() {
    return this._clothColor;
  }

  get clothTypeIcon() {
    switch (this._clothType) {
      case "shirt":
        return iconShirt;
      case "socks":
        return iconSocks;
      case "mitten":
        return iconMitten;
      default:
        return null;
    }
  }

  get genderType() {
    return this._genderType;
  }

  get genderTypeIcon() {
    switch (this._genderType) {
      case "male":
        return iconMale;
      case "female":
        return iconFemale;
      default:
        return null;
    }
  }
}

const clothType = ["shirt", "socks", "mitten"];
const clothColor = ["blue", "yellow", "pink"];
const genderType = ["male", "female"];

const iconShirt = "fa-solid fa-shirt";
const iconSocks = "fa-solid fa-socks";
const iconMitten = "fa-solid fa-mitten";
const iconMale = "fa-solid fa-person";
const iconFemale = "fa-solid fa-person-dress";
const clothTypeIcon = [iconShirt, iconSocks, iconMitten];
const genderTypeIcon = [iconMale, iconFemale];

const clothItemList = [];

let idIndex = 0;
for (const itClothType of clothType) {
  for (const itClothColor of clothColor) {
    for (const itGenderType of genderType) {
      //console.log(`[${idIndex}] ${itClothType}, ${itClothColor}, ${itGenderType}`);
      clothItemList.push(new ClothItem(idIndex++, itClothType, itClothColor, itGenderType));
    }
  }
}

const clothItemJson = JSON.stringify(clothItemList);
console.log(clothItemJson);

updateItemList(clothItemList);

function restoreItemList() {
  //console.log(`itemList.childElementCount: ${itemList.childElementCount}`);
  const itemListCount = itemList.childElementCount;
  for (let i = 0; i < itemListCount; i++) {
    const item = itemList.querySelector("li");
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
    const clothTypeIcon = document.createElement("i");
    const genderTypeIcon = document.createElement("i");
    const itemText = document.createElement("div");

    li.setAttribute("class", "item"); // ok
    li.setAttribute("id", selectedItems[i].id); // ok

    clothTypeIcon.setAttribute("class", selectedItems[i].clothTypeIcon);
    li.appendChild(clothTypeIcon);

    genderTypeIcon.setAttribute("class", selectedItems[i].genderTypeIcon);
    li.appendChild(genderTypeIcon);

    itemText.setAttribute("class", "text"); // ok
    itemText.textContent = `${selectedItems[i].clothType}, ${selectedItems[i].genderType}, ${selectedItems[i].clothColor}`;
    li.appendChild(itemText);

    itemList.appendChild(li);
  }
}
